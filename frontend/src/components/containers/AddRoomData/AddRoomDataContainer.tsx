import React from 'react';
import AddRoomDataPresentation from '../../presentation/AddRoomData/AddRoomDataPresentation';
import { useAddRoomData } from '../../../hooks/AddRoomData/useAddRoomData';

const AddRoomDataContainer: React.FC = () => {
  // Use the custom hook to handle all the logic
  const {
    formData,
    roomsData,
    searchTerm,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
    handleSearch,
    setSearchTerm
  } = useAddRoomData();

  return (
    <AddRoomDataPresentation
      formData={formData}
      roomsData={roomsData}
      searchTerm={searchTerm}
      isLoading={isLoading}
      error={error}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      onSearch={handleSearch}
      setSearchTerm={setSearchTerm}
    />
  );
};

export default AddRoomDataContainer;
