// Authenticated API utility for Django backend
export const makeAuthenticatedRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  // Get auth token from localStorage
  const token = localStorage.getItem('token');
  
  // Prepare headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  // Add authentication header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Make the request with auth headers
  return fetch(url, {
    ...options,
    headers,
  });
};

// Helper for GET requests
export const authenticatedGet = async (url: string) => {
  return makeAuthenticatedRequest(url, { method: 'GET' });
};

// Helper for POST requests
export const authenticatedPost = async (url: string, data: any) => {
  return makeAuthenticatedRequest(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Helper for PUT requests
export const authenticatedPut = async (url: string, data: any) => {
  return makeAuthenticatedRequest(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// Helper for DELETE requests
export const authenticatedDelete = async (url: string) => {
  return makeAuthenticatedRequest(url, { method: 'DELETE' });
};
