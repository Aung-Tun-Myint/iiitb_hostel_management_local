import { useState, useEffect } from 'react';
import { getStudentByRollNumber, extractDegreeFromRollNumber } from '../../apis/student_backend';

// Type definition for table data
interface AllotmentTableData {
  sNo: number;
  rollNo: string;
  studentName: string;
  email: string;
  mobile: string;
  roomBooking: string;
  checkInDateTime: string;
  checkOutDateTime: string;
  status: string;
}

// Sample table data
const mockTableData: AllotmentTableData[] = [
  {
    sNo: 1,
    rollNo: 'IMF_2024_001',
    studentName: 'IMF_2024_001',
    email: 'IMF_2024_001@iiitb.ac.in',
    mobile: '8111333999',
    roomBooking: 'H1-101',
    checkInDateTime: '01/03/2025 10:00 AM',
    checkOutDateTime: '15/06/2025 12:00 PM',
    status: 'Allotted'
  },
];

export const useRoomAllotment = () => {
  // Form state
  const [rollNumber, setRollNumber] = useState<string>('');
  const [studentName, setStudentName] = useState<string>('');
  const [degree, setDegree] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [remarks, setRemarks] = useState<string>('');
  
  // Table state
  const [tableData, setTableData] = useState<AllotmentTableData[]>(mockTableData);
  const [filteredTableData, setFilteredTableData] = useState<AllotmentTableData[]>([]);
  
  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Search for student by roll number
  const searchStudentByRollNumber = async (rollNo: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const student = await getStudentByRollNumber(rollNo);
      
      if (student) {
        // Extract degree from roll number
        const extractedDegree = extractDegreeFromRollNumber(student.roll_number);
        
        // Update form with student details
        setStudentName(student.name);
        setDegree(extractedDegree);
        setEmail(student.email_id);
        setMobile(student.mobile_number);
      } else {
        // Handle case when student is not found
        setStudentName('');
        setDegree('');
        setEmail('');
        setMobile('');
        setError('Student not found');
      }
    } catch (error) {
      console.error('Error searching for student:', error);
      setError('Error searching for student. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter table data based on search text
  const filterTableData = (searchText: string) => {
    if (!searchText) {
      setFilteredTableData(tableData);
      return;
    }

    const filtered = tableData.filter(item => 
      item.rollNo.toLowerCase().includes(searchText.toLowerCase()) ||
      item.studentName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase()) ||
      item.mobile.includes(searchText)
    );
    
    setFilteredTableData(filtered);
  };

  // Initial load of filtered data
  useEffect(() => {
    setFilteredTableData(tableData);
  }, [tableData]);

  // Function to allot a room
  const allotRoom = () => {
    if (!rollNumber || !studentName || !checkInDate) {
      setError('Please fill all the required fields');
      return;
    }

    // Create a new room allotment entry
    const newEntry = {
      sNo: tableData.length + 1,
      rollNo: rollNumber,
      studentName: studentName,
      email: email,  // Note: We're keeping this as 'email' in the tableData structure
      mobile: mobile,
      roomBooking: 'To be assigned', // This would be selected from room selection
      checkInDateTime: checkInDate,
      checkOutDateTime: checkOutDate || 'Not specified',
      status: 'Pending'
    };

    // Update the table data
    setTableData([...tableData, newEntry]);
    setFilteredTableData([...tableData, newEntry]);
    
    // Clear the form
    setRollNumber('');
    setStudentName('');
    setDegree('');
    setEmail('');
    setMobile('');
    setCheckInDate('');
    setCheckOutDate('');
    setRemarks('');

    // Show success message
    alert('Room allotment request has been submitted');
  };

  // Function to handle room selection
  const selectRoom = () => {
    // This would open a dialog or modal for room selection
    alert('Room selection dialog would appear here');
  };

  return {
    // Form state
    rollNumber,
    setRollNumber,
    studentName,
    setStudentName,
    degree,
    setDegree,
    email,
    setEmail,
    mobile, 
    setMobile,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    remarks,
    setRemarks,
    
    // Loading state
    isLoading,
    error,
    
    // Functions
    searchStudentByRollNumber,
    allotRoom,
    selectRoom,
    
    // Table data
    tableData: filteredTableData,
    filterTableData
  };
};