import { DateRange } from "rsuite/esm/DateRangePicker";
import { User } from "../context/loginContext";
import BASE_URL from '../config';
import { examModeUpdateType, RoleResourceMapper, scheduleType, termType, updateGradeType, userMappedType } from "../types/myTypes";
import { courseType, gradeScale } from "../types/myTypes";
import { batchType } from "../types/myTypes";
import { roomMatchedType } from "../types/myTypes";
import { RoomType } from "../types/myTypes";
import { userType } from "../types/myTypes";
import { ExamTypeType } from "../types/myTypes";
import { ExamModeType } from "../types/myTypes";
import { enrollmentType } from "../types/myTypes";
import { addProgCordType } from "../types/myTypes";
import { attendance,termCourseType} from "../types/myTypes";
import { deletestuff } from "../types/myTypes";
import { useState } from "react";


export const login = async (user: User) => {

  try {
    // Encode the user object as Base64
    const encodedUser = btoa(JSON.stringify(user));

    // Use URLSearchParams to create the x-www-form-urlencoded body
    const paramsData = new URLSearchParams({
      resource: encodedUser
    });

    // Perform the fetch request to the login API
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // Correct header for form data
      },
      body: paramsData.toString() // Send the URL-encoded body
    });
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Parse the response JSON (remove no-cors mode to access this)
    const jsonData = await response.json();

    // Assuming the resource[0].session_id is present in the response
    const ssid = jsonData.resource[0].session_id;
    return ssid;

  } catch (error) {
    // Log any error that occurs
    console.error("Error posting data:", error);
  }
};


export const addOneTerm = async (term: termType) => {
  try {
    // const params = new URLSearchParams();

    const jsonObj = term;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);

    // const body = "resource=" + base64Encoded;


    // params.append("resource", base64Encoded);
    // params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
    const ssid = sessionStorage?.getItem("key");
    if (ssid == null) {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      `${BASE_URL}/api/term?session_id=` +
      ssid +
      "&resource=" +
      base64Encoded,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    const jsonData = await response.json();

    return response;
  } catch (error) {
    console.log(" error message: ", error);
  }
};
export const addOneCourse = async (course: courseType) => {

  try {
    // const params = new URLSearchParams();

    const jsonObj = course;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);


    // Encode string to Base64
    const base64Encoded = btoa(jsonString);

    // params.append("resource", base64Encoded);
    // params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
    const ssid = sessionStorage?.getItem("key");
    if (ssid == null) {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      `${BASE_URL}/api/course?session_id=` +
      ssid +
      "&resource=" +
      base64Encoded,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );


    return response;
  } catch (error) {
    console.error("Error while adding course", error);
  }
};

export const addTermCourseStudent = async (resource: string) => {

  try {
    // Encode string to Base64
    const base64Encoded = btoa(resource);

    const ssid = sessionStorage?.getItem("key");
    if (ssid == null) {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      `${BASE_URL}/api/term_course?action=TERM_COURSE_STUDENT_MAPPING&session_id=` +
      ssid +
      "&resource=" +
      base64Encoded,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );
    

    return response;
  } catch (error) {
    console.error("Error while adding course", error);
  }
};



export const updateOrDeleteTermCourse = async (
  termCourseId: string,
  newData: termCourseType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

    if (ssid == null) {
      throw new Error("Session ID is expired");
    }


    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: termCourseId }))
        : btoa(JSON.stringify(newData));
    params.append("resource", base64EncodedData);

    const response = await fetch(
      `${BASE_URL}/api/term_course?action=TERM_COURSE_STUDENT_MAPPING&session_id=` +
      ssid +
      "&resource=" +
      base64EncodedData +
      "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

  } catch (error) {
    console.error("error while updating examMode ", error);
  }
};


export const addOneSchedule = async (schedule: scheduleType) => {

  try {
    // const params = new URLSearchParams();

    const jsonObj = schedule;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);

    // const body = "resource=" + base64Encoded;



    // params.append("resource", base64Encoded);
    // params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
    const ssid = sessionStorage?.getItem("key");
    if (ssid == null) {
      throw new Error("Session ID is expired");
    } 

    const response = await fetch(
      `${BASE_URL}/api/exam_schedule?session_id=` +
      ssid +
      "&resource=" +
      base64Encoded,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    return response;
  } catch (error) {
    console.error(" error message: ", error);
  }
};

export const addProgCord = async (pro: addProgCordType) => {

  try {
    const jsonObj = pro;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);


    // Encode string to Base64
    const base64Encoded = btoa(jsonString);

    // const body = "resource=" + base64Encoded;



    // params.append("resource", base64Encoded);
    // params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
    const ssid = sessionStorage?.getItem("key");
    if (ssid == null) {
      throw new Error("Session ID is expired");
    } 

    const response = await fetch(
      `${BASE_URL}/api/exam_schedule?session_id=` +
      ssid +
      "&resource=" +
      base64Encoded,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    return response;
  } catch (error) {
    console.error(" error message: ", error);
  }
};

export const addAttendance = async (att: attendance[]) => {
  try {
    const jsonObj = att;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);


    // Encode string to Base64
    const base64Encoded = btoa(jsonString);

    // const body = "resource=" + base64Encoded;



    // params.append("resource", base64Encoded);
    // params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
    const ssid = sessionStorage?.getItem("key");
    if (ssid == null) {
      throw new Error("Session ID is expired");
    } 

    const response = await fetch(
      `${BASE_URL}/api/attendance?session_id=` +
      ssid +
      "&resource=" +
      base64Encoded,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

  } catch (error) {
    console.error(" error message: ", error);
  }
};

export const addUserDetail = async (jsonData: any[]) => {

  // Move the Snackbar state declarations here
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning"
  >("success");

  try {
    const jsonobj = JSON.stringify(jsonData);
    const seshID = sessionStorage.getItem("key");
    const encode = btoa(jsonobj);
    //API call code is commented out for testing
    const response = await fetch(
      `${BASE_URL}/api/user?session_id=` +
      seshID +
      "&resource=" +
      encode +
      "&action=addBulk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    const responseJson = await response.json();

    if (responseJson.errCode === 0) {
      setSnackbarMessage("Users added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } else {
      throw new Error("Failed to add users");
    }
  } catch (error) {
    setSnackbarMessage("Failed to add users.");
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  }
};



export const deleteUserDetail = async (e: React.MouseEvent<HTMLElement>, rowData: userMappedType) => {
  e.stopPropagation();
  const seshID = sessionStorage.getItem("key");
  const temp: deletestuff = { id: rowData.id };
  const targ = JSON.stringify(temp);
  const enc = btoa(targ);
  const resource = await fetch(
    `${BASE_URL}/api/user?session_id=` +
    seshID +
    "&resource=" +
    enc +
    "&action=DELETE",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      mode: "cors",
    }
  );
  window.location.reload();
};

export const addOneBatch = async (
  e: React.FormEvent<HTMLButtonElement>,
  batchName: string,
  actStatus: string,
  setSnackbar: (message: string, severity: "success" | "error" | "warning") => void
) => {
  e.preventDefault();

  if (!batchName || !actStatus) {
    setSnackbar("Please fill all the required fields.", "warning");
    return;
  }

  try {
    const newobj: batchType = {
      batch_name: batchName,
      status: actStatus,
    };
    const jsonobj = JSON.stringify(newobj);
    const encode = btoa(jsonobj);
    const seshID = sessionStorage.getItem("key");

    const response = await fetch(
      `${BASE_URL}/api/batch?session_id=${seshID}&resource=${encode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    const jsonData = await response.json();

    if (jsonData.errCode === 0) {
      setSnackbar("Batch added successfully!", "success");
    } else {
      throw new Error("Failed to add Batch");
    }
  } catch (error) {
    setSnackbar("Failed to add Batch.", "error");
  }
};

export async function addSingRoom(
  e: React.FormEvent<HTMLButtonElement>,
  roomNumber: string,
  selectedBlock: string,
  roomCapacity: number | undefined,
  actStatus: string,
  setSnackbar: (message: string, severity: "success" | "error" | "warning") => void
) {
  e.preventDefault();

  if (!roomNumber || !selectedBlock || !roomCapacity || !actStatus) {
    setSnackbar("Please fill all the required fields.", "warning");
    return;
  }

  try {
    const newRoom: RoomType = {
      room_number: roomNumber,
      block: selectedBlock,
      capacity: roomCapacity,
      status: actStatus,
    };

    const jsonobj = JSON.stringify(newRoom);
    const encode = btoa(jsonobj);
    const seshID = sessionStorage.getItem("key");

    const response = await fetch(
      `${BASE_URL}/api/room?session_id=${seshID}&resource=${encode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    const jsonData = await response?.json();
    if (jsonData.errCode === 0) {
      setSnackbar("Room added successfully!", "success");
    } else {
      throw new Error("Failed to add Room");
    }
  } catch (error) {
    setSnackbar("Failed to add Room.", "error");
  }
}

export const addSingTerm = async (
  e: React.FormEvent<HTMLFormElement>,
  termName: string,
  dateRange: [Date | null, Date | null],
  status: string,
  termData: termType,
  setSnackbar: (message: string, severity: "success" | "error" | "warning") => void
) => {
  e.preventDefault();

  if (!termName || !dateRange[0] || !dateRange[1] || !status) {
    setSnackbar("Please fill all the required fields.", "warning");
    return;
  }

  try {
    const newTerm: termType = {
      term_name: termName,
      start_date: dateRange[0].toDateString(),
      end_date: dateRange[1].toDateString(),
      status: status
    };

    const jsonobj = JSON.stringify(newTerm);
    const encode = btoa(jsonobj);
    const seshID = sessionStorage.getItem("key");

    const response = await fetch(
      `${BASE_URL}/api/term?session_id=${seshID}&resource=${encode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    const jsonData = await response?.json();
    if (jsonData.errCode === 0) {
      setSnackbar("Term added successfully!", "success");
    } else {
      throw new Error("Failed to add Term");
    }
  } catch (error) {
    setSnackbar("Failed to add Term.", "error");
  }
};

export const deleteOneExamType = async (e: React.MouseEvent<HTMLElement>, rowData: ExamTypeType) => {
  e.stopPropagation();
  const seshID = sessionStorage.getItem("key");
  const temp: deletestuff = { id: rowData.id };
  const targ = JSON.stringify(temp);
  const enc = btoa(targ);
  const resource = await fetch(
    `${BASE_URL}/api/exam_type?session_id=` +
    seshID +
    "&resource=" +
    enc +
    "&action=DELETE",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      mode: "cors",
    }
  );
  window.location.reload();
};

export const addOneExamMode = async (
  e: React.FormEvent<HTMLButtonElement>,
  examMode: string,
  remarks: string,
  actStatus: string,
  onSuccess: () => void,
  onError: (message: string) => void
) => {
  e.preventDefault();
  if (!examMode || !remarks || !actStatus) {
    onError("Please fill all the required fields.");
    return;
  }
  try {
    const newExamMode: ExamModeType = {
      exam_mode_name: examMode,
      remark: remarks,
      status: actStatus,
    };

    const jsonobj = JSON.stringify(newExamMode);
    const encode = btoa(jsonobj);
    const seshID = sessionStorage.getItem("key");

    const response = await fetch(
      `${BASE_URL}/api/exam_mode?session_id=${seshID}&resource=${encode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    const jsonData = await response.json();

    if (jsonData.errCode === 0) {
      onSuccess();
    } else {
      throw new Error("Failed to add Exam Mode");
    }
  } catch (error) {
    onError("Failed to add Exam Mode.");
  }
};


export const getAllTermCourse = async () => {
  try {
    const ssid = sessionStorage.getItem("key");
    const queryId = "GET_ALL";

    const response = await fetch(
      `${BASE_URL}/api/term_course?queryId=` +
      queryId +
      "&session_id=" +
      ssid,
      {
        // const response = await fetch("https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=a3d61ec0cfc3391809bf88a069c9" , {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const jsonData = await response.json();
    const terms = jsonData.resource;
    return terms;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
  }
};


export const getAllTerms = async () => {
  try {
    const ssid = sessionStorage.getItem("key");
    const queryId = "GET_ALL";

    const response = await fetch(
      `${BASE_URL}/api/term?queryId=` +
      queryId +
      "&session_id=" +
      ssid,
      {
        // const response = await fetch("https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=a3d61ec0cfc3391809bf88a069c9" , {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const jsonData = await response.json();
    const terms = jsonData.resource;
    return terms;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
  }
};

export const getAllCourses = async () => {
  try {
    const ssid = sessionStorage.getItem("key");
    const queryId = "GET_ALL";

    const response = await fetch(
      `${BASE_URL}/api/course?queryId=` +
      queryId +
      "&session_id=" +
      ssid,
      {
        // const response = await fetch("https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=a3d61ec0cfc3391809bf88a069c9" , {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const jsonData = await response.json();
    const terms = jsonData.resource;
    return terms;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
  }
};

export const getAllCoursesbyTerm = async (termId: string) => {
  try {
    const seshID = sessionStorage.getItem("key");
    if (!seshID) {
      throw new Error("No session ID found");
    }

    const response = await fetch(
      `${BASE_URL}/api/term_course?queryId=GET_COURSES_BY_TERM&session_id=${seshID}&args=term_id:${termId}`,
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
    console.error("Error fetching courses by term:", error);
    throw error;
  }
};


export const getAllSchedules = async () => {
  try {
    const ssid = sessionStorage.getItem("key");
    const queryId = "GET_ALL";

    const response = await fetch(
      `${BASE_URL}/api/exam_schedule?queryId=` +
      queryId +
      "&session_id=" +
      ssid,
      {
        // const response = await fetch("https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=a3d61ec0cfc3391809bf88a069c9" , {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const jsonData = await response.json();

    const terms = jsonData.resource;
    return terms;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
  }
};

export const getProgCord = async () => {
  try {
    const ssid = sessionStorage.getItem("key");

    const queryId = "GET_ALL";

    const response = await fetch(
      `${BASE_URL}/api/exam_schedule?queryId=` +
      queryId +
      "&session_id=" +
      ssid,
      {
        // const response = await fetch("https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=a3d61ec0cfc3391809bf88a069c9" , {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const jsonData = await response.json();

    const terms = jsonData.resource;
    return terms;
  } catch (error) {
    console.error("Error fetching data from backend:", error);
  }
};

export const getAllUsers = async () => {
  const seshId = sessionStorage.getItem("key");

  const response = await fetch(
    `${BASE_URL}/api/user?queryId=GET_ALL&session_id=` + seshId,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );


  const json_users = await response.json();
  const users = json_users.resource;

  return users;
};

export const getAllBatches = async () => {
  const seshId = sessionStorage.getItem("key");


  const response = await fetch(
    `${BASE_URL}/api/batch?queryId=GET_ALL&session_id=` + seshId,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const json_users = await response.json();
  const batches = json_users.resource;
  return batches;
};

export const getAllRooms = async () => {
  const seshId = sessionStorage.getItem("key");
  const response = await fetch(
    `${BASE_URL}/api/room?queryId=GET_ALL&session_id=` + seshId,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const json_users = await response.json();
  const rooms = json_users.resource;
  return rooms;
};

// Exam mode
export const addExam_mode = async (exam: examModeUpdateType) => {
  try {
    // const params = new URLSearchParams();

    const jsonObj = exam;
    // Convert JSON object to string
    const jsonString = JSON.stringify(jsonObj);

    // Encode string to Base64
    const base64Encoded = btoa(jsonString);



    // params.append("resource", base64Encoded);
    // params.append("session_id", "c64e3bda-7205-4a63-ac37-2d14ab7474bd-15");
    const ssid = sessionStorage?.getItem("key");
    if (ssid == null) {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      `${BASE_URL}/api/course?session_id=` +
      ssid +
      "&resource=" +
      base64Encoded,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    const json_users = await response.json();
    const exammode = json_users.resource;
    return exammode;
  } catch (error) {
    console.error("error", error);
  }
};

export const getAllModes = async () => {
  const seshId = sessionStorage.getItem("key");
  const response = await fetch(
    `${BASE_URL}/api/exam_mode?queryId=GET_ALL&session_id=` + seshId,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const json_users = await response.json();
  const modes = json_users.resource;
  return modes;
};

export const getScheduleById = async (id: string) => {
  try {
    const seshId = sessionStorage.getItem("key");
    const response = await fetch(
      `${BASE_URL}/api/exam_schedule?queryId=GET_EXAM_SCHEDULE_BY_ID&session_id=` +
      seshId +
      "&args=id:" +
      id,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const json_users = await response.json();
    const sche = json_users.resource;
    return sche;
  } catch (error) {
    console.error("error while getting schedule.");
  }
};


export const getTermCourseStudentByCourseId = async (id: string) => {
  try {
    const seshId = sessionStorage.getItem("key");
    const response = await fetch(
      `${BASE_URL}/api/term_course_student?queryId=GET_TERM_COURSE_STUDENT_BY_COURSE_ID&session_id=` +
      seshId +
      "&args=id:" +
      id,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const json_users = await response.json();
    const sche = json_users.resource;
    return sche;
  } catch (error) {
    console.error("error while getting schedule.");
  }
};


export const getTermCourseStudent = async (id: string) => {
  try {
    const seshId = sessionStorage.getItem("key");
    const response = await fetch(
      `${BASE_URL}/api/term_course_student?queryId=GET_ALL&session_id=` +
      seshId +
      "&filter=term_course_id:" +
      id,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const json_users = await response.json();
    const sche = json_users.resource;
    return sche;
  } catch (error) {
    console.error("error while getting schedule.");
  }
};



export const getAllTypes = async () => {
  const seshId = sessionStorage.getItem("key");
  const response = await fetch(
    `${BASE_URL}/api/exam_type?queryId=GET_ALL&session_id=` + seshId,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const json_users = await response.json();
  const modes = json_users.resource;
  return modes;
};

export const updateOrDeleteTerm = async (
  termId: string,
  newData: termType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

    if (ssid == null) {
      throw new Error("Session ID is expired");
    }


    // If action is DELETE, encode the student ID to base64 and set it as resource
    // If action is MODIFY, encode the new data to base64 and set it as resource

    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: termId }))
        : btoa(JSON.stringify(newData));
    params.append("resource", base64EncodedData);

    const response = await fetch(
      `${BASE_URL}/api/term?session_id=` +
      ssid +
      "&resource=" +
      base64EncodedData +
      "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );


  } catch (error) {
    console.error("error while updation: ", error);
  }
};

export const updateOrDeleteCourse = async (
  courseId: string,
  newData: courseType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

    if (ssid == null) {
      throw new Error("Session ID is expired");
    }


    // If action is DELETE, encode the student ID to base64 and set it as resource
    // If action is MODIFY, encode the new data to base64 and set it as resource


    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: courseId }))
        : btoa(JSON.stringify(newData));
    params.append("resource", base64EncodedData);

    const response = await fetch(
      `${BASE_URL}/api/course?session_id=` +
      ssid +
      "&resource=" +
      base64EncodedData +
      "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

  } catch (error) {
    console.error("error while updating course ", error);
  }
};

export const updateOrDeleteBatch = async (
  batchId: string,
  newData: batchType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

    if (ssid == null) {
      throw new Error("Session ID is expired");
    }



    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: batchId }))
        : btoa(JSON.stringify(newData));
    params.append("resource", base64EncodedData);

    const response = await fetch(
      `${BASE_URL}/api/batch?session_id=` +
      ssid +
      "&resource=" +
      base64EncodedData +
      "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

  } catch (error) {
    console.error("error while updating batch ", error);
  }
};

export const updateOrDeleteRoom = async (
  roomId: string,
  newData: roomMatchedType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

    if (ssid !== null) {
      params.append("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }

    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: roomId }))
        : btoa(JSON.stringify(newData));
    params.append("resource", base64EncodedData);

    const response = await fetch(
      `${BASE_URL}/api/room?session_id=` +
      ssid +
      "&resource=" +
      base64EncodedData +
      "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

  } catch (error) {
    console.error("error while updating room ", error);
  }
};

export const updateOrDeleteUser = async (
  userId: string,
  newData: userType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

    if (ssid == null) {
      throw new Error("Session ID is expired");
    }

    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: userId }))
        : btoa(JSON.stringify(newData));
    params.append("resource", base64EncodedData);

    const response = await fetch(
      `${BASE_URL}/api/user_type?session_id=` +
      ssid +
      "&resource=" +
      base64EncodedData +
      "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

  } catch (error) {
    console.error("error while updating user ", error);
  }
};

export const updateOrDeleteExamType = async (
  examtypeId: string,
  newData: ExamTypeType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

    if (ssid !== null) {
      params.append("session_id", ssid);
    } else {
      throw new Error("Session ID is expired");
    }




    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: examtypeId }))
        : btoa(JSON.stringify(newData));
    params.append("resource", base64EncodedData);

    const response = await fetch(
      `${BASE_URL}/api/exam_type?session_id=` +
      ssid +
      "&resource=" +
      base64EncodedData +
      "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (error) {
    console.error("error while updating examtype ", error);
  }
};

export const updateOrDeleteExamMode = async (
  examModeId: string,
  newData: ExamModeType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

    if (ssid == null) {
      throw new Error("Session ID is expired");
    }



    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: examModeId }))
        : btoa(JSON.stringify(newData));
    params.append("resource", base64EncodedData);

    const response = await fetch(
      `${BASE_URL}/api/exam_mode?session_id=` +
      ssid +
      "&resource=" +
      base64EncodedData +
      "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

  } catch (error) {
    console.error("error while updating examMode ", error);
  }
};

export const updateOrDeleteSchedule = async (
  scheduleId: string,
  newData: scheduleType,
  action: string
) => {
  try {
    const params = new URLSearchParams();
    const ssid = sessionStorage.getItem("key");

    if (ssid == null) {
      throw new Error("Session ID is expired");
    }




    const base64EncodedData =
      action === "DELETE"
        ? btoa(JSON.stringify({ id: scheduleId }))
        : btoa(JSON.stringify(newData));
    params.append("resource", base64EncodedData);

    const response = await fetch(
      `${BASE_URL}/api/exam_schedule?session_id=` +
      ssid +
      "&resource=" +
      base64EncodedData +
      "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

  } catch (error) {
    console.error("error while updation: ", error);
  }
};

export const AddEnrolment = async (enroll: enrollmentType[]) => {
  try {
    const jsonObj = enroll;
    const jsonString = JSON.stringify(jsonObj);
    const base64Encoded = btoa(jsonString);


    const ssid = sessionStorage?.getItem("key");
    if (ssid == null) {
      throw new Error("Session ID is expired");
    }

    

    const response = await fetch(
      `${BASE_URL}/api/enrollment?session_id=` +
      ssid +
      "&resource=" +
      base64Encoded +
      "&action=addBulk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

  } catch (error) {
    console.error("Error in the entrolment", error);
  }
};

export const getUsersByRole = async (role: string) => {
  const seshId = sessionStorage.getItem("key");
  const response = await fetch(
    `${BASE_URL}/api/user?queryId=GET_USERS_BY_ROLE&session_id=` +
    seshId +
    "&args=role:" +
    role,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const json_users = await response.json();
  const usersbyrole = json_users.resource;
  return usersbyrole;
};


export const getStudentsByCourseId = async (id: string) => {
  try {
    const seshId = sessionStorage.getItem("key");
    
    const response = await fetch(
      `${BASE_URL}/api/enrollment?queryId=GET_ENROLLMENTS_BY_COURSE&session_id=` +
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

    const json_users = await response.json();
    const studentsbyid = json_users.resource;
    return studentsbyid;
  } catch (error) {
    console.error("Error while fetching students of particular course");
  }
};

export const getUserById = async (id: string) => {
  try {
    const seshId = sessionStorage.getItem("key");
    const response = await fetch(
      `${BASE_URL}/api/user_type?queryId=GET_USER_BY_ID&session_id=` +
      seshId +
      "&args=id:" +
      id,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const json_users = await response.json();
    const studentsbyid = json_users.resource;
    return studentsbyid;
  } catch (error) {
    console.error("Error while get user by Id");
  }
};




export const getEnrollbyCours = async (courseID: string | null) => {
  const seshId = sessionStorage.getItem("key");

  const response = await fetch(
    `${BASE_URL}/api/enrollment?queryId=GET_ENROLLMENTS_BY_COURSE&session_id=` +
    seshId +
    "&args=course_id:" +
    courseID,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const json_users = await response.json();
  const result = json_users.resource;

  const studentDetailsPromises = result.map(async (enrollment: any) => {
    const userTypeEnrollmentId = enrollment.user_type_enrollment_id;

    const studentResponse = await fetch(
      `${BASE_URL}/api/user_type?queryId=GET_USER_BY_ID&session_id=` +
      seshId +
      "&args=id:" +
      userTypeEnrollmentId,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const studentJson = await studentResponse.json();
    return {
      id: enrollment.id,
      student_id: studentJson.resource[0].roll_number,
      stud_name: studentJson.resource[0].name,
      grade: enrollment.grade ? enrollment.grade : "satisfactory",
      remarks: enrollment.remarks ? enrollment.remarks : "satisfactory"
    };
  });

  const studentDetails = await Promise.all(studentDetailsPromises);

  return studentDetails;
};

export const updtGrades = async (enroll: updateGradeType) => {

  try {
    const jsonObj = enroll;
    const jsonString = JSON.stringify(jsonObj);

    const base64Encoded = btoa(jsonString);

    const ssid = sessionStorage?.getItem("key");
    if (ssid == null) {
      throw new Error("Session ID is expired");
    }

    

    const response = await fetch(
      `${BASE_URL}/api/enrollment?session_id=` +
      ssid +
      "&resource=" +
      base64Encoded +
      "&action=MODIFY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

  } catch (error) {
    console.error("Error in the entrolment", error);
  }
};


export const getSchedulesByCourse = async (courseName: any) => {
  try {
    const ssid: any = sessionStorage.getItem("key"); // Retrieve session ID
    const queryId: any = 'GET_SCHEDULES_BY_Course'

    const params = new URLSearchParams();
    params.append('queryId', queryId)
    params.append('session_id', ssid)
    params.append('args', `course_name:${courseName}`)


    const response = await fetch(
      `${BASE_URL}/api/exam_schedule?` + params.toString(),
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );



    const jsonData = await response.json();

    const schedules = jsonData.resource;
    return schedules; 
  }
  catch (error) {
    console.error("Error fetching filtered schedules:", error);
  }
};

export const getStudentByCourse = async () => {
  try {

    const ssid: any = sessionStorage.getItem("key"); // Retrieve session ID

    const queryId = "GET_ALL"; // Set the query for fetching schedule by course


    const params = new URLSearchParams();
    params.append('queryId', queryId)
    params.append('session_id', ssid)

    const response = await fetch(
      `${BASE_URL}/api/attendance?` + params.toString(),
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );



    const jsonData = await response.json();

    const students = jsonData.resource; // Adjust based on the actual API response structure
    return students; // Return the filtered schedules
  } catch (error) {
    console.error("Error fetching filtered schedules:", error);
  }

}
export const updateStudentAttendance = async (rollNumber: any, examId: any) => {
  try {
    const ssid: any = sessionStorage.getItem("key"); // Retrieve session ID

    const queryId = "update_attendance_by_roll_number";


    const params = new URLSearchParams();
    params.append('queryId', queryId)
    params.append('session_id', ssid)
    params.append('args', `examination_id:${examId}`)
    params.append('args', `roll_number:${rollNumber}`)


    const response = await fetch(`${BASE_URL}/api/user?` + params.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/form-data",
      }
    });

    if (!response.ok) {
      throw new Error("Failed to update attendance");
    }

    const updatedData = await response.json();

    return updatedData;
  } catch (error) {
    console.error("Error updating attendance:", error);
    return null;

  }
};

export const updateAttendanceStatus = async (attendanceId: any, attendanceValue: any) => {
  try {
    const ssid: any = sessionStorage.getItem("key"); // Retrieve session ID


    const resource = JSON.stringify({
      id: attendanceId,
      attendance: attendanceValue
    });

    const formData = new FormData();
    formData.append("resource", resource);
    formData.append("session_id", ssid);
    formData.append("action", "MODIFY");

    const response = await fetch(`${BASE_URL}/api/attendance`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update attendance");
    }

    const updatedData = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Error updating attendance:", error);
    return null;
  }
};

export const addRoleName = async (roleName: string) => {
  try {
    const jsonObj = {roleName: roleName};
    const jsonString = JSON.stringify(jsonObj);
    const base64Encoded = btoa(jsonString);


    const ssid = sessionStorage?.getItem("key");
    if (ssid == null) {
      throw new Error("Session ID is expired");
    }

    
    
    const response = await fetch(
      `${BASE_URL}/api/v1/role?session_id=` +
        ssid +
        "&resource=" +
        base64Encoded,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    return true;
  } catch (error) {
    console.error("Error in the add role", error);
    return false;
  }
}

export const addRoleResourceMapping = async (roleResource: RoleResourceMapper) => {
  try {
    const jsonObj = roleResource;
    const jsonString = JSON.stringify(jsonObj);

    const base64Encoded = btoa(jsonString);

    const ssid = sessionStorage?.getItem("key");
    if (ssid == null) {
      throw new Error("Session ID is expired");
    }

   
    const response = await fetch(
      `${BASE_URL}/api/v1/role_resource?session_id=` +
        ssid +
        "&resource=" +
        base64Encoded,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    return true;
  } catch (error) {
    console.error("Error in adding role-resource", error);
    return false;
  }
}

export const getAllRoleNames = async () => {
  try {
    const ssid = sessionStorage?.getItem("key");
    if (ssid == null) {
      throw new Error("Session ID is expired");
    }

    
    
    const response = await fetch(
      `${BASE_URL}/api/v1/role?session_id=` +
        ssid,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    const roleNamesList: string[] = (await response.json()).payload;
    return roleNamesList;
  } catch (error) {
    return [] as string[];
  }
}

export const getAllRoleResourceMappings = async () => {
  try {
    const ssid = sessionStorage?.getItem("key");
    if (ssid == null) {
      throw new Error("Session ID is expired");
    }
    
    const response = await fetch(
      `${BASE_URL}/api/v1/role_resource?session_id=` +
        ssid,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    const roleResourceMappings: RoleResourceMapper[] = (await response.json()).payload;
    return roleResourceMappings;
  } catch (error) {
    return [] as RoleResourceMapper[];
  }
}





// Fetch All Grade Scales
export const getGradeScales = async () => {
  try {
    const ssid = sessionStorage?.getItem("key");
    if (!ssid) throw new Error("Session ID is expired");

    const response = await fetch(`${BASE_URL}/api/grade_scale?queryId=GET_ALL&session_id=${ssid}`);
    const data = await response.json();
    return data.resource || [];
  } catch (error) {
    console.error("Error fetching grade scales:", error);
    return [];
  }
};

// Add New Grade Scale
export const addGradeScale = async (gradeScaleName: string, gradeMapping: string, disabled: boolean) => {
  const resourceData = {
    grade_scale_name: gradeScaleName,
    grade_scale_mapping: gradeMapping, 
    disabled: disabled, // Soft delete flag (true = disabled, false = active)
  };

  const encodedData = btoa(JSON.stringify(resourceData));

  try {
    const ssid = sessionStorage?.getItem("key");
    if (!ssid) throw new Error("Session ID is expired");

    const response = await fetch(
      `${BASE_URL}/api/grade_scale?session_id=${ssid}&resource=${encodedData}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Error adding grade scale:", error);
    return { errCode: 1, message: "Request failed" };
  }
};

// Update Grade Scale Details
export const updateGradeScale = async (id: string, gradeScaleName: string, gradeMapping: string, disabled: boolean) => {
  const resourceData = {
    id, // Ensure correct ID is sent
    grade_scale_name: gradeScaleName,
    grade_scale_mapping: gradeMapping,
    disabled: disabled, // Soft delete flag
  };

  const encodedData = btoa(JSON.stringify(resourceData));

  try {
    const ssid = sessionStorage?.getItem("key");
    if (!ssid) throw new Error("Session ID is expired");

    const response = await fetch(
      `${BASE_URL}/api/grade_scale?session_id=${ssid}&resource=${encodedData}&action=MODIFY`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Error updating grade scale:", error);
    return { errCode: 1, message: "Request failed" };
  }
};


export const updateGradeScaleStatus = async (id: string, newStatus: boolean) => {
  try {
    const session_id = sessionStorage.getItem("key");
    if (!session_id) throw new Error("Session expired!");


    const existingGradeScales = await getGradeScales();
    const gradeScaleToUpdate = existingGradeScales.find((scale: gradeScale) => scale.id === id);

    if (!gradeScaleToUpdate) {
      console.error("Grade scale not found!");
      return;
    }


    const updatedGradeScale = {
      ...gradeScaleToUpdate,
      disabled: newStatus, // Toggle status
    };

    const encodedData = btoa(JSON.stringify(updatedGradeScale)); // Encode full object

    const response = await fetch(
      `${BASE_URL}/api/grade_scale?session_id=${session_id}&resource=${encodedData}&action=MODIFY`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    const result = await response.json();
    console.log("Updated Grade Scale Response:", result);
    return result;
  } catch (error) {
    console.error("Error updating grade scale status:", error);
  }
};


