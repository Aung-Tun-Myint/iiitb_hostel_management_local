// Add more types as needed

export interface StudentInfo {
  studentName: string;
  degree: string;
  email: string;
  mobile: string;
}

export interface RoomAllotmentInfo {
  checkInDate: string;
  checkOutDate: string;
  remarks: string;
}

export interface AllotmentTableItem {
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