import React from 'react';
import { FaEdit } from 'react-icons/fa';

interface RoomTableData {
  sNo: number;
  floor: string;
  roomNumber: string;
  block: string;
  roomType: string;
}

interface RoomTableProps {
  roomsData: RoomTableData[];
}

const RoomTable: React.FC<RoomTableProps> = ({ roomsData }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#EFF3FA] h-[57px] rounded">
            <th className="text-left pl-4 font-semibold text-[16px] md:text-[18px] text-[#282828]">S.No.</th>
            <th className="text-left font-normal text-[16px] md:text-[18px] text-[#282828]">Floor</th>
            <th className="text-left font-normal text-[16px] md:text-[18px] text-[#282828]">Room Number</th>
            <th className="text-left font-normal text-[16px] md:text-[18px] text-[#282828]">Block</th>
            <th className="text-left font-normal text-[16px] md:text-[18px] text-[#282828]">Room Type</th>
          </tr>
        </thead>
        <tbody>
          {roomsData.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">No room data found</td>
            </tr>
          ) : (
            roomsData.map((room) => (
              <tr key={room.sNo} className="border-b border-[#C4C4C4]">
                <td className="pl-4 py-3 md:py-4 text-[14px] md:text-[15px] text-[#8A8A8A] font-medium">{room.sNo}</td>
                <td className="py-3 md:py-4 text-[14px] md:text-[15px] text-[#8A8A8A] font-medium">{room.floor}</td>
                <td className="py-3 md:py-4 text-[14px] md:text-[15px] text-[#8A8A8A] font-medium">{room.roomNumber}</td>
                <td className="py-3 md:py-4 text-[14px] md:text-[15px] text-[#8A8A8A] font-medium">{room.block}</td>
                <td className="py-3 md:py-4 text-[14px] md:text-[15px] text-[#8A8A8A] font-medium">{room.roomType}</td>
                <td className="py-3 md:py-4 text-center">
                  <button className="text-[#509CDB] hover:text-[#4089c5]">
                    <FaEdit size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="border-t border-[#C4C4C4] my-4"></div>
    </div>
  );
};

export default RoomTable;