import { GradeUpdateData, GradeScale } from "../types/gradeTypes";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import BASE_URL from '../config';

export const updateStudentGrade = async (data: GradeUpdateData) => {
  try {
    const sessionId = sessionStorage.getItem("key");

    console.log("data", data);
    if (!sessionId) {
      throw new Error("No session ID found");
    }

   const resource = {
      term_course_student_id: data.id,
      grade_scale_id: data.grade_scale_id,
      grade: data.grade,
      remark: data.remark || ""
    };

    const formData = new URLSearchParams();
    formData.append('resource', JSON.stringify(resource));
    // Debug logging
    const isDevelopment = true; // Or set based on your environment
    if (isDevelopment) {
      console.log("Sending resource:", resource);
      console.log("Request details:", {
        student_id: data.student_id,
        term_course_id: data.term_course_id,
        grade: data.grade,
        //gradeId: gradeId,
        student_name: data.student_name,
        student_roll_no: data.student_roll_no,
        batch_id: data.batch_id,
        batch_name: data.batch_name,
        term_course_student_id: data.id,
        remark: data.remark
      });
    }

    const response = await fetch(
      `${BASE_URL}/api/grade?action=UPDATE_GRADE&session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        mode: "cors",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Grade creation error:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // console.log("Got gradeId from updateStudentGrade", gradeId);
    // Prepare resource for updating term_course_student

    const json = await response.json();
    console.log("Response from updateStudentGrade ", json);

    return response;
  } catch (error) {
    console.error("Error updating grade:", error);
    throw error;
  }
};

export const getTermCourseStudentsByCourseId = async (id: string) => {
  try {
    const seshId = sessionStorage.getItem("key");
    if (!seshId) {
      throw new Error("No session ID found");
    }
    const response = await fetch(
      `${BASE_URL}/api/term_course_student?queryId=GET_TERM_COURSE_STUDENTS_BY_COURSE_ID&session_id=` +
      seshId +
      "&args=course_id:" +
      id,
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
    const json_users = await response.json();
    const sche = json_users.resource;
    return sche;
  } catch (error) {
    console.error("Error fetching term course students:", error);
    toast.error("Failed to load students");
  }
};

export const getGrades = async () => {
  try {
    const seshId = sessionStorage.getItem("key");
    if (!seshId) {
      throw new Error("No session ID found");
    }

    const response = await fetch(
      `${BASE_URL}/api/grade?queryId=GET_ALL&session_id=${seshId}`,
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
    const grades = jsonData.resource;
    return grades;

  } catch (error) {
    console.error("Error fetching grades:", error);
    toast.error("Failed to load grades");
    return [];
  }
};

export const getGradeScales = async () => {
  try {
    const seshId = sessionStorage.getItem("key");
    if (!seshId) {
      throw new Error("No session ID found");
    }

    const response = await fetch(
      `${BASE_URL}/api/grade_scale?queryId=GET_ALL_ACTIVE&session_id=${seshId}`,
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

    console.log("Resource" , jsonData.resource)
   // console.log("Resource" , jsonData.resource[0].grade_scale_name)

    return jsonData.resource;
  } catch (error) {
    console.error("Error fetching grade scales:", error);
    toast.error("Failed to load grade scales");
    return [];
  }
};


export const uploadGradesFromExcel = async (
    file: File, 
    selectedScale: GradeScale, 
    courseId: string
  ): Promise<any>  => {
    console.log('Starting uploadGradesFromExcel with:', {
      fileName: file.name,
      scaleId: selectedScale.id,
      courseId: courseId
    });
  
    try {
      const ssid = sessionStorage.getItem("key");
      if (!ssid) throw new Error("Session expired");
      console.log('Session ID verified:', ssid);
  
      // First fetch student data to get term_course_student_ids
      const studentData = await getTermCourseStudentsByCourseId(courseId);
      console.log('Student data from backend:', studentData);
  
      // Create a map of student roll numbers to their term_course_student_ids
      const studentMap = new Map(
        studentData.map((student: any) => [student.student_roll_no, student.id])
      );
      console.log('Student map created:', studentMap);
  
      // Read Excel file
      console.log('Reading Excel file...');
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      console.log('Workbook sheets:', workbook.SheetNames);
      
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      console.log('Worksheet range:', worksheet['!ref']);
      
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log('Raw Excel data:', JSON.stringify(jsonData, null, 2));
  
      // Parse grade scale mapping
      console.log('Parsing grade scale mapping...');
      console.log('Grade scale mapping string:', selectedScale.grade_scale_mapping);
      const gradeMapping = JSON.parse(selectedScale.grade_scale_mapping);
      const validGrades = Object.keys(gradeMapping);
      console.log('Valid grades:', validGrades);
      
      const gradeColumnName = `Grades: ${validGrades.join(', ')}`;
      console.log('Grade column name:', gradeColumnName);
  
      // Transform data
      console.log('Transforming data...');
      // const formattedGrades = jsonData.map((row: any) => 
      //   `${row['Student Roll No']}|${row[gradeColumnName]}|${studentMap.get(row['Student Roll No'])}|${row['Remark'] || ''}`
      // ).join('#');
      const formattedGrades = jsonData.map((row: any) => ({
        student_roll_no: row['Student Roll No'],
        grade: row[gradeColumnName],
        term_course_student_id: studentMap.get(row['Student Roll No']),
        remark: row['Remark'] || ''
      }));
  
      console.log('All formatted grades:', formattedGrades);
  
      // Prepare request
      const resource = {
        grade_scale_id: selectedScale.id,
        grade: JSON.stringify(formattedGrades)  // Now sending array of objects as JSON string
      };
      console.log('Final resource object:', JSON.stringify(resource, null, 2));
  
      // Create form data
      const formData = new URLSearchParams();
      formData.append('resource', JSON.stringify(resource));
      console.log('Form data created:', formData.toString());
  
      // Make API call
      const API_ENDPOINT = `${BASE_URL}/api/grade`;
      console.log('Making API call to:', `${API_ENDPOINT}?action=BULK_UPDATE_GRADES&session_id=${ssid}`);
      
      const response = await fetch(
        `${API_ENDPOINT}?action=BULK_UPDATE_GRADES&session_id=${ssid}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString(),
          mode: 'cors'
        }
      );
  
      // Handle response
      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('API response:', result);
      
      if (result.errCode !== 0) {
        throw new Error(result.errMsg || 'Failed to update grades');
      }
  
      console.log('Grade upload completed successfully');
      return result;
    } catch (error) {
      console.error('Error in uploadGradesFromExcel:', error);
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      throw error;
    }
  };
  
  export const getGradeHistory = async (termCourseStudentId: string) => {
    try {
      const ssid = sessionStorage.getItem("key");
      if (!ssid) throw new Error("No session ID found");
  
      console.log("Term Course Student Id", termCourseStudentId);
      const response = await fetch(
        `${BASE_URL}/api/term_course_student?queryId=GET_GRADE_HISTORY&session_id=${ssid}&args=term_course_student_id:${termCourseStudentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          mode: "cors",
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      console.log("Grade history data:", data.resource);
      return data.resource;
    } catch (error) {
      console.error("Error fetching grade history:", error);
      throw error;
    }
  };