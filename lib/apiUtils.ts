// Robust API utilities for handling Django backend responses
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Robust response parser that handles both JSON and HTML
export async function parseResponse(response: Response) {
  const contentType = response.headers.get('content-type');
  
  try {
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      
      if (!response.ok) {
        // Handle Django validation errors
        if (data.email && Array.isArray(data.email)) {
          throw new APIError(`Email: ${data.email[0]}`, response.status, data);
        }
        if (data.student_id && Array.isArray(data.student_id)) {
          throw new APIError(`Student ID: ${data.student_id[0]}`, response.status, data);
        }
        if (data.detail) {
          throw new APIError(data.detail, response.status, data);
        }
        
        // Generic validation error
        const firstError = Object.values(data)[0];
        if (Array.isArray(firstError)) {
          throw new APIError(firstError[0] as string, response.status, data);
        }
        
        throw new APIError('Request failed', response.status, data);
      }
      
      return data;
    } else {
      // Handle HTML error responses (500 errors, etc.)
      const text = await response.text();
      
      if (!response.ok) {
        if (response.status === 500) {
          throw new APIError('Server error occurred. Please try again.', response.status);
        }
        if (response.status === 404) {
          throw new APIError('Resource not found', response.status);
        }
        if (response.status === 403) {
          throw new APIError('Access denied', response.status);
        }
        if (response.status === 429) {
          throw new APIError('Too many requests. Please wait a moment.', response.status);
        }
        
        throw new APIError(`Request failed (${response.status})`, response.status);
      }
      
      return text;
    }
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Network or parsing errors
    throw new APIError('Network error. Please check your connection.', 0);
  }
}

// Conservative rate limiting with smart retry
class RateLimiter {
  private lastRequest = 0;
  private minInterval = 1000; // 1 second minimum between requests

  async throttle(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;
    
    if (timeSinceLastRequest < this.minInterval) {
      const waitTime = this.minInterval - timeSinceLastRequest;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequest = Date.now();
  }
}

const rateLimiter = new RateLimiter();

// Enhanced fetch with rate limiting and error handling
export async function apiRequest(
  url: string, 
  options: RequestInit = {}
): Promise<any> {
  // Apply conservative rate limiting
  await rateLimiter.throttle();
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    return await parseResponse(response);
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// Smart error recovery for missing data
export async function fetchWithRecovery<T>(
  fetchFn: () => Promise<T>,
  fallbackData?: T,
  maxRetries = 2
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await fetchFn();
      
      // Check if result is empty/invalid and we have fallback
      if ((!result || (Array.isArray(result) && result.length === 0)) && fallbackData) {
        console.warn(`Attempt ${attempt}: Empty result, using fallback data`);
        return fallbackData;
      }
      
      return result;
    } catch (error) {
      console.warn(`Attempt ${attempt} failed:`, error);
      
      if (attempt === maxRetries) {
        if (fallbackData) {
          console.warn('All attempts failed, using fallback data');
          return fallbackData;
        }
        throw error;
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, attempt * 1000));
    }
  }
  
  throw new Error('Unexpected error in fetchWithRecovery');
}
