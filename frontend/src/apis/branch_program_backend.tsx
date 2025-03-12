import BASE_URL from '../config';

export interface Branch {
  id: string;
  full_name: string;
  short_name: string;
  description?: string;
  disabled?: boolean;
}

export interface Program {
  id: string;
  full_name: string;
  short_name: string;
  duration?: string;
  description?: string;
  disabled?: boolean;
}

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
    // Filter out disabled branches
    const activeBranches = jsonData.resource?.filter((branch: Branch) => !branch.disabled) || [];
    return activeBranches;
  } catch (error) {
    console.error("Error fetching branches:", error);
    throw error;
  }
};

/**
 * Fetches all programs from the API
 * @returns Array of program objects
 */
export const getPrograms = async (): Promise<Program[]> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      `${BASE_URL}/api/program?queryId=GET_ALL&session_id=${ssid}`,
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
    // Filter out disabled programs
    const activePrograms = jsonData.resource?.filter((program: Program) => !program.disabled) || [];
    return activePrograms;
  } catch (error) {
    console.error("Error fetching programs:", error);
    throw error;
  }
};