import React from 'react';

interface RoomAllotmentFormProps {
  checkInDate: string;
  setCheckInDate: (value: string) => void;
  checkOutDate: string;
  setCheckOutDate: (value: string) => void;
  remarks: string;
  setRemarks: (value: string) => void;
  onCheckIn: () => void;
}

const RoomAllotmentForm: React.FC<RoomAllotmentFormProps> = ({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  remarks,
  setRemarks,
  onCheckIn
}) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="mb-3 md:mb-4 relative">
        <input
          type="text"
          placeholder="Check In Date & Time*"
          className="w-full border border-gray-300 rounded px-3 py-2 md:px-4 md:py-3 pr-10"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9H21M9 15H15M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.07989 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#8A8A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      <div className="mb-3 md:mb-4 relative">
        <input
          type="text"
          placeholder="Check Out Date & Time"
          className="w-full border border-gray-300 rounded px-3 py-2 md:px-4 md:py-3 pr-10"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9H21M9 15H15M7 3V5M17 3V5M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.07989 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="#8A8A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      <div className="mb-3 md:mb-4">
        <textarea
          placeholder="Remarks"
          className="w-full border border-gray-300 rounded px-3 py-2 md:px-4 md:py-3 h-20 md:h-24 resize-none"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        ></textarea>
      </div>
      <div className="flex justify-end">
        <button 
          onClick={onCheckIn} 
          className="bg-[#509CDB] text-white px-6 md:px-8 py-2 md:py-3 rounded font-medium"
        >
          Room Allot
        </button>
      </div>
    </div>
  );
};

export default RoomAllotmentForm;