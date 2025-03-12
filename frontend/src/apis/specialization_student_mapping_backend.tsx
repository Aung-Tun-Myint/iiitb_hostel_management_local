import BASE_URL from '../config';

export interface Student {
  id: string;
  name: string;
  email: string;
  roll_number: string;
  specialization?: string;
  batch_id: string;
  batch_name?: string;
  status: string;
  isInSpecialization?: boolean; // Added for UI convenience
}

export interface Batch {
  id: string;
  batch_name: string;
  status: string;
}

/**
 * Fetches all students from a specific batch
 * @param batchId The ID of the batch to fetch students from
 * @returns Array of student objects
 */
export const getStudentsByBatch = async (batchId: string): Promise<Student[]> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      `${BASE_URL}/api/user?queryId=GET_STUDENTS_BY_BATCH&session_id=${ssid}&args=batch_id:${batchId}`,
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
    console.error("Error fetching students by batch:", error);
    throw error;
  }
};

/**
 * Fetches all batches from the API
 * @returns Array of batch objects
 */
export const getBatches = async (): Promise<Batch[]> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      `${BASE_URL}/api/batch?queryId=GET_ALL&session_id=${ssid}`,
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
    console.error("Error fetching batches:", error);
    throw error;
  }
};

/**
 * Updates a student's specialization
 * @param student The complete student object to update
 * @param specializationId The new specialization ID
 * @returns API response object
 */
export const updateStudentSpecialization = async (student: Student, specializationId: string): Promise<any> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }

    // Update the student's specialization
    const updatedStudent = {
      ...student,
      specialization: specializationId
    };

    const jsonString = JSON.stringify(updatedStudent);
    const base64Encoded = btoa(jsonString);

    const updateResponse = await fetch(
      `${BASE_URL}/api/user?session_id=${ssid}&resource=${base64Encoded}&action=MODIFY`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );                                                                                                                                                                                                        

    if (!updateResponse.ok) {
      throw new Error(`HTTP error! status: ${updateResponse.status}`);
    }

    const result = await updateResponse.json();
    console.log("Updated Student Specialization Response:", result);
    return result;
  } catch (error) {
    console.error("Error updating student specialization:", error);
    throw error;
  }
};

/**
 * Updates multiple students' specializations in bulk
 * @param students Array of student objects to update
 * @param specializationId The new specialization ID
 * @returns API response object with success and failure counts
 */
export const bulkUpdateStudentSpecializations = async (
  students: Student[], 
  specializationId: string
): Promise<{success: number, failures: number}> => {
  let successCount = 0;
  let failureCount = 0;
  
  // Process students one by one (could be optimized with a bulk API endpoint)
  for (const student of students) {
    try {
      await updateStudentSpecialization(student, specializationId);
      successCount++;
    } catch (error) {
      console.error(`Failed to update student ${student.id}:`, error);
      failureCount++;
    }
  }
  
  return {
    success: successCount,
    failures: failureCount
  };
};

/**
 * Gets the list of students assigned to a specific specialization
 * @param specializationId The ID of the specialization
 * @param batchId Optional batch ID to filter students by batch
 * @returns Array of student objects
 */
export const getStudentsBySpecialization = async (
  specializationId: string, 
  batchId?: string
): Promise<Student[]> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }
    
    let queryParam = `queryId=GET_BY_SPECIALIZATION&params=${specializationId}`;
    if (batchId) {
      queryParam += `&batch=${batchId}`;
    }

    const response = await fetch(
      `${BASE_URL}/api/user?${queryParam}&session_id=${ssid}`,
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
    console.error("Error fetching students by specialization:", error);
    throw error;
  }
};