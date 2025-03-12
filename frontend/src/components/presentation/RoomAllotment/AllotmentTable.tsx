import React from 'react';

interface AllotmentTableProps {
  tableData: {
    sNo: number;
    rollNo: string;
    studentName: string;
    email: string;
    mobile: string;
    roomBooking: string;
    checkInDateTime: string;
    checkOutDateTime: string;
    status: string;
  }[];
  searchText: string;
  setSearchText: (text: string) => void;
  onSearchTable: (text: string) => void;
}

const AllotmentTable: React.FC<AllotmentTableProps> = ({
  tableData,
  searchText,
  setSearchText,
  onSearchTable
}) => {
  return (
    <div className="mt-8 md:mt-16">
      <div className="flex justify-end mb-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-l-md pl-3 pr-10 py-2 w-full md:w-[280px]"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              onSearchTable(e.target.value);
            }}
          />
          <button 
            className="absolute right-0 top-0 h-full px-3 bg-[#509CDB] rounded-r-md"
            aria-label="Search table"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button 
            className="bg-[#509CDB] rounded px-3 py-2 ml-2 flex items-center justify-center"
            aria-label="Export data"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#EFF3FA]">
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-xs md:text-sm">S.No.</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-normal text-xs md:text-sm">Roll No.</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-normal text-xs md:text-sm">Student Name</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-normal text-xs md:text-sm">Email</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-normal text-xs md:text-sm">Mobile</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-normal text-xs md:text-sm">Room Booking</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-normal text-xs md:text-sm">Check In Date & Time</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-normal text-xs md:text-sm">Check Out Date & Time</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-normal text-xs md:text-sm">Status</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-normal text-xs md:text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-4 text-gray-500">No records found</td>
              </tr>
            ) : (
              tableData.map((item) => (
                <tr key={item.sNo} className="border-b border-gray-300">
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm">{item.sNo}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm">{item.rollNo}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm">{item.studentName}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm">{item.email}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm">{item.mobile}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm">{item.roomBooking}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm">{item.checkInDateTime}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm">{item.checkOutDateTime}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3">
                    <span className="bg-[#EFF3FA] text-[#0764E6] px-2 py-1 rounded text-xs whitespace-nowrap">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3">
                    <button 
                      className="text-[#509CDB] hover:text-[#4089c5] focus:outline-none"
                      aria-label="Edit record"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" stroke="#509CDB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllotmentTable;