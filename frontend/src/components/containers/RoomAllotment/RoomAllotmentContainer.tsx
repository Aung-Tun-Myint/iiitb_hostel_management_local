import React from 'react';
import RoomAllotmentPresentation from '../../presentation/RoomAllotment/RoomAllotmentPresentation';
import { useRoomAllotment } from '../../../hooks/RoomAllotment/useRoomAllotment';

const RoomAllotmentContainer: React.FC = () => {
  const {
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
    searchStudentByRollNumber,
    allotRoom,
    selectRoom,
    tableData,
    filterTableData
  } = useRoomAllotment();

  return (
    <RoomAllotmentPresentation
      rollNumber={rollNumber}
      setRollNumber={setRollNumber}
      studentName={studentName}
      degree={degree}
      email={email}
      mobile={mobile}
      checkInDate={checkInDate}
      setCheckInDate={setCheckInDate}
      checkOutDate={checkOutDate}
      setCheckOutDate={setCheckOutDate}
      remarks={remarks}
      setRemarks={setRemarks}
      onSearch={searchStudentByRollNumber}
      onSelectRoom={selectRoom}
      onCheckIn={allotRoom}
      onSearchTable={filterTableData}
      tableData={tableData}
      setStudentName={setStudentName}
      setDegree={setDegree}
      setEmail={setEmail}
      setMobile={setMobile}
    />
  );
};

export default RoomAllotmentContainer;