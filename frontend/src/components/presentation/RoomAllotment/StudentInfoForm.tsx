import React from 'react';
import { StudentInfo } from '../../../types/types';


const StudentInfoForm: React.FC<StudentInfo> = ({
  studentName,
  degree,
  email,
  mobile
}) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="mb-3 md:mb-4">
        <input
          type="text"
          value={studentName}
          disabled
          placeholder="Student Name"
          className="w-full border border-gray-300 rounded px-3 py-2 md:px-4 md:py-3 bg-gray-100"
        />
      </div>
      <div className="mb-3 md:mb-4">
        <input
          type="text"
          value={degree}
          disabled
          placeholder="Degree"
          className="w-full border border-gray-300 rounded px-3 py-2 md:px-4 md:py-3 bg-gray-100"
        />
      </div>
      <div className="mb-3 md:mb-4">
        <input
          type="text"
          value={email}
          disabled
          placeholder="Email"
          className="w-full border border-gray-300 rounded px-3 py-2 md:px-4 md:py-3 bg-gray-100"
        />
      </div>
      <div className="mb-3 md:mb-4">
        <input
          type="text"
          value={mobile}
          disabled
          placeholder="Mobile"
          className="w-full border border-gray-300 rounded px-3 py-2 md:px-4 md:py-3 bg-gray-100"
        />
      </div>
    </div>
  );
};

export default StudentInfoForm;