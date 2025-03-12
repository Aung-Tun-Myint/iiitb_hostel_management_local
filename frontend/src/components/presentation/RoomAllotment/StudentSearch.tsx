import React, { useState, useEffect, useRef } from 'react';
import { Student, getAllStudents, filterStudentsByQuery } from '../../../apis/student_backend';

interface StudentSearchProps {
  rollNumber: string;
  setRollNumber: (value: string) => void;
  onSearch: (rollNumber: string) => void;
  onSelectRoom: () => void;
  onStudentSelect?: (student: Student) => void;
}

const StudentSearch: React.FC<StudentSearchProps> = ({
  rollNumber,
  setRollNumber,
  onSearch,
  onSelectRoom,
  onStudentSelect
}) => {
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [suggestions, setSuggestions] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Fetch all students once when component mounts
  useEffect(() => {
    const fetchAllStudents = async () => {
      setInitialLoading(true);
      try {
        const students = await getAllStudents();
        setAllStudents(students);
      } catch (error) {
        console.error("Error fetching all students:", error);
      } finally {
        setInitialLoading(false);
      }
    };
    
    fetchAllStudents();
  }, []);

  // Filter students based on input value
  useEffect(() => {
    if (initialLoading) return;
    
    setIsLoading(true);
    const filtered = filterStudentsByQuery(allStudents, rollNumber);
    setSuggestions(filtered);
    setIsLoading(false);
    
    if (rollNumber.length >= 2) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [rollNumber, allStudents, initialLoading]);

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (student: Student) => {
    setRollNumber(student.roll_number);
    setShowSuggestions(false);
    
    // If onStudentSelect is provided, call it with the selected student
    if (onStudentSelect) {
      onStudentSelect(student);
    } else {
      // Otherwise, use the existing search function
      onSearch(student.roll_number);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
      <div className="relative flex-grow max-w-full md:max-w-xl">
        <input
          type="text"
          placeholder="Roll Number"
          className="w-full border border-gray-300 rounded px-3 py-2 md:px-4 md:py-3 focus:outline-none focus:border-blue-500"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          onFocus={() => rollNumber.length >= 2 && setShowSuggestions(true)}
        />
        
        {/* Loading indicator */}
        {(isLoading || initialLoading) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        
        {/* Suggestions dropdown */}
        {!initialLoading && showSuggestions && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {suggestions.map((student) => (
              <div
                key={student.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                onClick={() => handleSuggestionClick(student)}
              >
                <span className="font-medium">{student.roll_number}</span>
                <span className="text-gray-600">{student.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex gap-2 md:gap-4">
        <button 
          onClick={() => onSearch(rollNumber)} 
          className="bg-[#509CDB] text-white px-3 md:px-4 py-2 rounded flex items-center justify-center"
          aria-label="Search"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          onClick={onSelectRoom} 
          className="bg-[#509CDB] text-white px-4 md:px-6 py-2 rounded font-medium text-base md:text-lg whitespace-nowrap"
        >
          Select Room
        </button>
      </div>
    </div>
  );
};

export default StudentSearch;