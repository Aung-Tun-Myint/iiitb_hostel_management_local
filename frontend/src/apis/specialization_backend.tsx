import BASE_URL from '../config';

export interface Branch {
  id: string;
  full_name: string;
  short_name: string;
  description?: string;
  disabled: boolean;
}

export interface Specialization {
  id: string;
  full_name: string;
  short_name: string;
  branch_id: string;
  branch_name?: string;
  disabled: boolean;
}

/**
 * Fetches all specializations from the API
 * @returns Array of specialization objects
 */
export const getSpecializations = async (): Promise<Specialization[]> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      `${BASE_URL}/api/specialization?queryId=GET_ALL&session_id=${ssid}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData.resource || [];
  } catch (error) {
    console.error("Error fetching specializations:", error);
    throw error;
  }
};

/**
 * Fetches all branches from the API
 * @returns Array of branch objects
 */
export const getBranches = async (): Promise<Branch[]> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      `${BASE_URL}/api/branch?queryId=GET_ALL&session_id=${ssid}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData.resource || [];
  } catch (error) {
    console.error("Error fetching branches:", error);
    throw error;
  }
};

/**
 * Adds a new specialization
 * @param specializationData The specialization data to add
 * @returns API response object
 */
export const addSpecialization = async (specializationData: {
  full_name: string;
  short_name: string;
  branch_id: string;
}) => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }



    const jsonString = JSON.stringify(specializationData);
    const base64Encoded = btoa(jsonString);

    const response = await fetch(
      `${BASE_URL}/api/specialization?session_id=${ssid}&resource=${base64Encoded}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error adding specialization:", error);
    throw error;
  }
};

/**
 * Updates an existing specialization
 * @param id The ID of the specialization to update
 * @param specializationData The updated specialization data
 * @returns API response object
 */
export const updateSpecialization = async (
  id: string, 
  specializationData: {
    full_name: string;
    short_name: string;
    branch_id: string;
    disabled: boolean;
  }
) => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }

    const data = {
      id,
      ...specializationData
    };

    const jsonString = JSON.stringify(data);
    const base64Encoded = btoa(jsonString);

    const response = await fetch(
      `${BASE_URL}/api/specialization?session_id=${ssid}&resource=${base64Encoded}&action=MODIFY`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating specialization:", error);
    throw error;
  }
};

/**
 * Toggles the disabled status of a specialization
 * @param specialization The specialization object with updated disabled status
 * @returns API response object
 */
export const toggleSpecializationStatus = async (specialization: Specialization) => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }
    
    // We already have all the data we need - no need to fetch again
    const jsonString = JSON.stringify(specialization);
    const base64Encoded = btoa(jsonString);

    const response = await fetch(
      `${BASE_URL}/api/specialization?session_id=${ssid}&resource=${base64Encoded}&action=MODIFY`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response from API:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('API response:', result);
    return result;
  } catch (error) {
    console.error("Error toggling specialization status:", error);
    throw error;
  }
};
