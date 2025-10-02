// Enhanced error handling for forms and API calls

export interface FormError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  message: string;
  fieldErrors: FormError[];
  statusCode?: number;
}

/**
 * Parse Django/API error responses into a standardized format
 */
export function parseApiError(error: any): ErrorResponse {
  console.log('Parsing API error:', error);
  
  // Default error response
  const defaultResponse: ErrorResponse = {
    message: 'An unexpected error occurred. Please try again.',
    fieldErrors: [],
  };

  try {
    // Handle SyntaxError (usually HTML error pages)
    if (error instanceof SyntaxError && error.message.includes('Unexpected token')) {
      return {
        message: 'Server error occurred. Please check the server logs and try again.',
        fieldErrors: [],
        statusCode: 500,
      };
    }

    // If it's already a parsed object
    if (typeof error === 'object' && error !== null) {
      const fieldErrors: FormError[] = [];
      let mainMessage = '';

      // Handle Django field validation errors
      Object.keys(error).forEach(field => {
        const fieldError = error[field];
        
        if (Array.isArray(fieldError)) {
          // Django typically returns arrays of error messages
          fieldErrors.push({
            field,
            message: fieldError[0] || 'Invalid value'
          });
        } else if (typeof fieldError === 'string') {
          fieldErrors.push({
            field,
            message: fieldError
          });
        }
      });

      // Handle special Django error fields
      if (error.detail) {
        mainMessage = error.detail;
      } else if (error.message) {
        mainMessage = error.message;
      } else if (error.non_field_errors) {
        mainMessage = Array.isArray(error.non_field_errors) 
          ? error.non_field_errors[0] 
          : error.non_field_errors;
      } else if (fieldErrors.length > 0) {
        mainMessage = `Please fix the following errors: ${fieldErrors.map(e => e.message).join(', ')}`;
      }

      return {
        message: mainMessage || defaultResponse.message,
        fieldErrors,
        statusCode: error.status || error.statusCode,
      };
    }

    // If it's a string (JSON), try to parse it
    if (typeof error === 'string') {
      try {
        const parsed = JSON.parse(error);
        return parseApiError(parsed);
      } catch {
        return {
          message: error,
          fieldErrors: [],
        };
      }
    }

    return defaultResponse;
  } catch (parseError) {
    console.error('Error parsing API error:', parseError);
    return defaultResponse;
  }
}

/**
 * Convert field names to user-friendly labels
 */
export function getFieldLabel(fieldName: string): string {
  const fieldLabels: Record<string, string> = {
    'first_name': 'First Name',
    'last_name': 'Last Name',
    'email': 'Email',
    'phone_number': 'Phone Number',
    'student_id': 'Student ID',
    'gender': 'Gender',
    'address_line_1': 'Address',
    'city': 'City',
    'county': 'County',
    'postal_code': 'Postal Code',
    'current_class': 'Current Class',
    'academic_year': 'Academic Year',
    'emergency_contact_name': 'Emergency Contact Name',
    'emergency_contact_phone': 'Emergency Contact Phone',
    'emergency_contact_relationship': 'Emergency Contact Relationship',
    'date_of_birth': 'Date of Birth',
    'admission_date': 'Admission Date',
    'parent_name': 'Parent/Guardian Name',
    'parent_phone': 'Parent/Guardian Phone',
    'parent_email': 'Parent/Guardian Email',
    'medical_info': 'Medical Information',
  };

  return fieldLabels[fieldName] || fieldName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Generate user-friendly error messages
 */
export function generateErrorMessage(field: string, message: string): string {
  const fieldLabel = getFieldLabel(field);
  
  // Handle common Django error patterns
  if (message.includes('not a valid choice')) {
    return `${fieldLabel}: Please select a valid option`;
  }
  
  if (message.includes('required')) {
    return `${fieldLabel} is required`;
  }
  
  if (message.includes('unique')) {
    return `${fieldLabel} already exists. Please use a different value`;
  }
  
  if (message.includes('invalid')) {
    return `${fieldLabel}: Please enter a valid value`;
  }
  
  // Return the original message with field label
  return `${fieldLabel}: ${message}`;
}
