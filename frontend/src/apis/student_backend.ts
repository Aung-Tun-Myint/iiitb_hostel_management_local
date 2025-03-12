import BASE_URL from '../config';
import { toast } from 'react-toastify';

export interface Student {
  id: string;
  name: string;
  email_id: string; // Using email_id to match DB schema
  roll_number: string;
  mobile_number: string;
  batch_id: string;
  batch_name?: string;
  status: string;
  program_id?: string;
  branch_id?: string;
  specialization?: string;
  joining_date?: string;
  expiry_date?: string;
}

/**
 * Extract degree from roll number
 * Roll numbers follow patterns like IMF_YYYY_NNN where
 * IMF indicates the degree program
 */
export const extractDegreeFromRollNumber = (rollNumber: string): string => {
  if (!rollNumber) return '';
  
  // Extract the first part of the roll number (before first underscore)
  const prefix = rollNumber.split('_')[0];
  
  // Map common prefixes to degrees
  switch(prefix) {
    case 'IMT':
      return 'M.Tech';
    case 'BIT':
      return 'B.Tech';
    case 'PHD':
      return 'Ph.D';
    case 'IMF': 
      return 'M.Sc.';
    case 'BIF':
      return 'B.Sc.';
    default:
      return prefix; // Return the prefix if no mapping exists
  }
};

/**
 * Fetch all students from the API
 * @returns Promise with array of all students
 */
export const getAllStudents = async (): Promise<Student[]> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }
    
    const response = await fetch(
      `${BASE_URL}/api/user?queryId=GET_ALL&session_id=${ssid}`,
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
    console.error("Error fetching all students:", error);
    toast.error("Failed to load student data");
    return [];
  }
};

/**
 * Filter students by query string from pre-fetched data
 * @param students Array of students to filter
 * @param query Query string to filter by
 * @returns Filtered array of students matching the query
 */
export const filterStudentsByQuery = (students: Student[], query: string): Student[] => {
  if (!query || query.length < 2) return [];
  
  const queryLower = query.toLowerCase();
  return students.filter(student => 
    (student.roll_number && student.roll_number.toLowerCase().includes(queryLower)) || 
    (student.name && student.name.toLowerCase().includes(queryLower))
  );
};

/**
 * Get student details by roll number (exact match) from pre-fetched data
 * @param students Array of all students
 * @param rollNumber The roll number to search for
 * @returns Student object or null if not found
 */
export const findStudentByRollNumber = (students: Student[], rollNumber: string): Student | null => {
  if (!rollNumber) return null;
  return students.find(student => student.roll_number === rollNumber) || null;
};

// Keep these methods for backward compatibility
export const searchStudentsByQuery = async (query: string): Promise<Student[]> => {
  try {
    const allStudents = await getAllStudents();
    return filterStudentsByQuery(allStudents, query);
  } catch (error) {
    console.error("Error in searchStudentsByQuery:", error);
    return [];
  }
};

export const getStudentByRollNumber = async (rollNumber: string): Promise<Student | null> => {
  try {
    const allStudents = await getAllStudents();
    return findStudentByRollNumber(allStudents, rollNumber);
  } catch (error) {
    console.error("Error in getStudentByRollNumber:", error);
    return null;
  }
};
