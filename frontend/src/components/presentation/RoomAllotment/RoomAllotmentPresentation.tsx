import React, { useState } from 'react';
import ResponsiveNavigationBar from '../NavigationBar/navigationbar';
import StudentSearch from './StudentSearch';
import StudentInfoForm from './StudentInfoForm';
import RoomAllotmentForm from './RoomAllotmentForm';
import AllotmentTable from './AllotmentTable';
import { Student, extractDegreeFromRollNumber } from '../../../apis/student_backend';

type RoomAllotmentPresentationProps = {
  onSearch: (rollNumber: string) => void;
  onSelectRoom: () => void;
  onCheckIn: () => void;
  onSearchTable: (searchText: string) => void;
  rollNumber: string;
  setRollNumber: (value: string) => void;
  studentName: string;
  degree: string;
  email: string; // Note: We keep this as 'email' in the component interface
  mobile: string;
  checkInDate: string;
  setCheckInDate: (value: string) => void;
  checkOutDate: string;
  setCheckOutDate: (value: string) => void;
  remarks: string;
  setRemarks: (value: string) => void;
  tableData: {
    sNo: number;
    rollNo: string;
    studentName: string;
    email: string; // Note: The table still shows 'email'
    mobile: string;
    roomBooking: string;
    checkInDateTime: string;
    checkOutDateTime: string;
    status: string;
  }[];
  setStudentName?: (name: string) => void;
  setDegree?: (degree: string) => void;
  setEmail?: (email: string) => void;
  setMobile?: (mobile: string) => void;
};

const RoomAllotmentPresentation: React.FC<RoomAllotmentPresentationProps> = ({
  onSearch,
  onSelectRoom,
  onCheckIn,
  onSearchTable,
  rollNumber,
  setRollNumber,
  studentName,
  degree,
  email,
  mobile,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  remarks,
  setRemarks,
  tableData,
  setStudentName = () => {},
  setDegree = () => {},
  setEmail = () => {},
  setMobile = () => {},
}) => {
  const [searchText, setSearchText] = useState('');
  
  // Handle student selection from dropdown
  const handleStudentSelect = (student: Student) => {
    // Extract degree from roll number
    const extractedDegree = extractDegreeFromRollNumber(student.roll_number);

    // Update student info using email_id from the Student interface
    setStudentName(student.name);
    setDegree(extractedDegree);
    setEmail(student.email_id); // Using email_id from the Student interface
    setMobile(student.mobile_number);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - Using responsive NavigationBar component */}
      <ResponsiveNavigationBar openSection="rooms" />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 ml-16 transition-all duration-300">
        <div className="p-4 md:p-6 pr-4 md:pr-6 max-w-[1487px]">
          {/* Header */}
          <div className="mb-4 md:mb-6 mt-6 lg:mt-0">
            <h1 className="text-xl md:text-2xl font-medium text-[#282828]">Room Allotment</h1>
            <div className="border-b border-gray-300 mt-2 md:mt-4 mb-4 md:mb-8"></div>
          </div>

          {/* Student Search Section */}
          <StudentSearch 
            rollNumber={rollNumber} 
            setRollNumber={setRollNumber} 
            onSearch={onSearch} 
            onSelectRoom={onSelectRoom}
            onStudentSelect={handleStudentSelect}
          />

          {/* Two Column Layout */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-6 md:mb-8">
            {/* Student Info Form */}
            <StudentInfoForm 
              studentName={studentName}
              degree={degree}
              email={email}
              mobile={mobile}
            />

            {/* Room Allotment Form */}
            <RoomAllotmentForm 
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              remarks={remarks}
              setRemarks={setRemarks}
              onCheckIn={onCheckIn}
            />
          </div>

          {/* Allotment Table */}
          <AllotmentTable 
            tableData={tableData}
            searchText={searchText}
            setSearchText={setSearchText}
            onSearchTable={onSearchTable}
          />
        </div>
      </div>
    </div>
  );
};

export default RoomAllotmentPresentation;