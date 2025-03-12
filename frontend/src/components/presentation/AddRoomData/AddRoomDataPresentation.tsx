import React from 'react';
import ResponsiveNavigationBar from '../NavigationBar/navigationbar';
import RoomForm from './RoomForm';
import SearchBar from './SearchBar';
import RoomTable from './RoomTable';

interface AddRoomDataPresentationProps {
  formData: {
    floor: string;
    block: string;
    roomNumber: string;
    roomType: string;
  };
  roomsData: {
    sNo: number;
    floor: string;
    roomNumber: string;
    block: string;
    roomType: string;
  }[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSearch: (term: string) => void;
  setSearchTerm: (term: string) => void;
}

const AddRoomDataPresentation: React.FC<AddRoomDataPresentationProps> = ({
  formData,
  roomsData,
  searchTerm,
  isLoading,
  error,
  onInputChange,
  onSubmit,
  onSearch,
  setSearchTerm
}) => {


  return (
    <div className="flex h-screen bg-white">
      {/* Navigation Bar */}
      <ResponsiveNavigationBar openSection="viewResidentRoom" />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64 ml-16 transition-all duration-300">
        <div className="p-4 md:p-8 pr-4 md:pr-12 max-w-[1487px]">
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-[24px] font-medium text-[#282828] font-['Montserrat'] mt-6 lg:mt-0">Add Room Data</h1>
            <hr className="mt-4 border-t border-[rgba(196,196,196,0.5)] shadow" />
          </div>
        
          
          {/* Form */}
          <RoomForm 
            formData={formData} 
            isLoading={isLoading} 
            onInputChange={onInputChange} 
            onSubmit={onSubmit} 
          />
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {/* Search and Table Section */}
          <div className="mt-16">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              onSearch={onSearch} 
            />
            
            <RoomTable roomsData={roomsData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoomDataPresentation;