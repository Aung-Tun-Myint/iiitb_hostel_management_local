import BASE_URL from '../config';
import { toast } from 'react-toastify';

// Define interface for login credentials
export interface LoginCredentials {
  email_id: string;
  password: string;
}

// Define interface for login response
export interface LoginResponse {
  success: boolean;
  message: string;
  sessionId?: string;
  userData?: {
    id: string;
    name?: string;
    email: string;
    type: string;
  };
}

/**
 * Attempts to log in a user with the given credentials
 * @param credentials User's login credentials (email and password)
 * @returns Promise with login response containing success status, message, and user data if successful
 */
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    console.log("Attempting login with:", credentials.email_id);
    
    // Create the request payload with field names matching the backend expectations
    // const loginData = {
    //   email_id: credentials.email, // Changed from email to email_id to match backend
    //   password: credentials.password
    // };

    console.log("Login payload:", credentials);

    // Encode the login data as Base64
    const encodedData = btoa(JSON.stringify(credentials));

    // Use URLSearchParams to create the x-www-form-urlencoded body
    const formData = new URLSearchParams();
    formData.append('resource', encodedData);
    
    console.log(`Sending request to ${BASE_URL}/api/login`);
    
    // Make the API call to login endpoint with more options to handle CORS
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: formData.toString(),
      mode: 'cors',
     // credentials: 'include',
    });

    // Log raw response for debugging
    const rawResponse = await response.text();
    console.log("Raw response:", rawResponse);
    
    // Try to parse as JSON
    let jsonData;
    try {
      jsonData = JSON.parse(rawResponse);
    } catch (e) {
      console.error("Failed to parse response as JSON:", e);
      return { 
        success: false, 
        message: "Invalid response format from server" 
      };
    }
    
    console.log("Parsed response:", jsonData);
    
    // Handle API-level errors
    if (jsonData.errCode !== 0) {
      return { 
        success: false, 
        message: jsonData.errMsg || "Authentication failed" 
      };
    }

    // Extract session ID and user data from response
    const sessionId = jsonData.resource?.[0]?.session_id;
    const userData = jsonData.resource?.[0]?.user_data || {};

    if (!sessionId) {
      return { 
        success: false, 
        message: "Invalid response from server" 
      };
    }

    // Store session ID in session storage
    sessionStorage.setItem("key", sessionId);
    
    // If there's user data in the response, store it too
    if (userData) {
      sessionStorage.setItem("userData", JSON.stringify(userData));
    }

    // Return successful login response
    return {
      success: true,
      message: "Login successful",
      sessionId: sessionId,
      userData: userData
    };
  } catch (error) {
    console.error("Error during login:", error);
    
    // More detailed error logging for debugging
    if (error instanceof TypeError && error.message.includes("NetworkError")) {
      console.error("This is likely a CORS error. Check server CORS configuration.");
      return {
        success: false,
        message: "Connection error: CORS issue detected. The server may not be configured to accept requests from this origin."
      };
    }
    
    return {
      success: false,
      message: "An unexpected error occurred. Please try again."
    };
  }
};

/**
 * Logs out the current user by clearing session data
 */
export const logout = (): void => {
  try {
    // Clear session storage
    sessionStorage.removeItem("key");
    sessionStorage.removeItem("userData");
    
    // Optional: make a logout API call if your backend requires it
    // This would be similar to the login call but to a logout endpoint
    
  } catch (error) {
    console.error("Error during logout:", error);
    toast.error("Error during logout. Some session data may not be cleared.");
  }
};

/**
 * Checks if the user is currently logged in
 * @returns boolean indicating if user is logged in
 */
export const isUserLoggedIn = (): boolean => {
  return !!sessionStorage.getItem("key");
};

/**
 * Gets the current user's data from session storage
 * @returns User data object or null if not logged in
 */
export const getCurrentUser = () => {
  const userDataString = sessionStorage.getItem("userData");
  return userDataString ? JSON.parse(userDataString) : null;
};
