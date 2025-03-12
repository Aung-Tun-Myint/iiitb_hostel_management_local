import React, { useEffect } from 'react';
import { FiUpload } from 'react-icons/fi'; // Importing upload icon from react-icons
import { useRoomForm } from '../../../hooks/AddRoomData/useRoomForm';
import { getFloorDisplayName } from '../../../apis/add_room_data_backend';
interface RoomFormProps {
  formData: {
    floor: string;
    block: string;
    roomNumber: string;
    roomType: string;
  };
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ formData, isLoading, onInputChange, onSubmit }) => {
  const {
    blocks,
    floors,
    roomTypes,
    loadingBlocks,
    loadingFloors,
    loadingRoomTypes,
    blocksError,
    floorsError,
    roomTypesError,
    fetchFloorsByBlockId
  } = useRoomForm();

  // Fetch floors when block selection changes
  useEffect(() => {
    if (formData.block) {
      fetchFloorsByBlockId(formData.block);
    }
  }, [formData.block, fetchFloorsByBlockId]);

  return (
    <form onSubmit={onSubmit} className="mt-6 md:mt-10 relative">
      {/* Bulk Upload Button with Figma styling */}
      <div className="flex justify-end mb-4">
        <button
          type="button"
          className="w-[200px] h-[48px] bg-[#025492] text-white font-['Montserrat'] font-medium text-[20px] rounded-[6px] shadow-md flex items-center justify-center gap-3"
          style={{ boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.25)' }}
        >
          <FiUpload className="text-[20px]" />
          <span className="tracking-[0.02em]">Bulk Upload</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div>
          <div className="mb-4 md:mb-8">
            {blocksError && <p className="text-red-500 text-sm mb-1">{blocksError}</p>}
            <select
              name="block"
              value={formData.block}
              onChange={onInputChange}
              required
              disabled={loadingBlocks || isLoading}
              className="w-full h-[54px] border border-[#C4C4C4] rounded text-[#8A8A8A] font-medium text-lg md:text-[20px] px-4 shadow-md focus:outline-none focus:border-[#509CDB] focus:ring-1 focus:ring-[#509CDB] appearance-none bg-white"
            >
              <option value="">Select Block*</option>
              {blocks.map((block) => (
                <option key={block.id} value={block.id}>
                  {block.name}
                </option>
              ))}
            </select>
            {loadingBlocks && <p className="text-sm text-gray-500 mt-1">Loading blocks...</p>}
          </div>
          
          <div>
            {floorsError && <p className="text-red-500 text-sm mb-1">{floorsError}</p>}
            <select
              name="floor"
              value={formData.floor}
              onChange={onInputChange}
              required
              disabled={loadingFloors || isLoading || !formData.block}
              className="w-full h-[54px] border border-[#C4C4C4] rounded text-[#8A8A8A] font-medium text-lg md:text-[20px] px-4 shadow-md focus:outline-none focus:border-[#509CDB] focus:ring-1 focus:ring-[#509CDB] appearance-none bg-white"
            >
              <option value="">Select Floor*</option>
              {floors.map((floor) => (
                <option key={floor.id} value={floor.id}>
                  {getFloorDisplayName(floor.number)}
                </option>
              ))}
            </select>
            {loadingFloors && <p className="text-sm text-gray-500 mt-1">Loading floors...</p>}
            {!formData.block && <p className="text-sm text-gray-500 mt-1">Please select a block first</p>}
          </div>
        </div>
        
        <div>
          <div className="mb-4 md:mb-8">
            {roomTypesError && <p className="text-red-500 text-sm mb-1">{roomTypesError}</p>}
            <select
              name="roomType"
              value={formData.roomType}
              onChange={onInputChange}
              required
              disabled={loadingRoomTypes || isLoading}
              className="w-full h-[54px] border border-[#C4C4C4] rounded text-[#8A8A8A] font-medium text-lg md:text-[20px] px-4 shadow-md focus:outline-none focus:border-[#509CDB] focus:ring-1 focus:ring-[#509CDB] appearance-none bg-white"
            >
              <option value="">Select Room Type*</option>
              {roomTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} (Capacity: {type.capacity})
                </option>
              ))}
            </select>
            {loadingRoomTypes && <p className="text-sm text-gray-500 mt-1">Loading room types...</p>}
          </div>
          
          <div>
            <input
              type="text"
              name="roomNumber"
              placeholder="Room Number*"
              value={formData.roomNumber}
              onChange={onInputChange}
              required
              disabled={isLoading}
              className="w-full h-[54px] border border-[#C4C4C4] rounded text-[#8A8A8A] font-medium text-lg md:text-[20px] px-4 shadow-md focus:outline-none focus:border-[#509CDB] focus:ring-1 focus:ring-[#509CDB]"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end mt-8 md:mt-16">
        <button
          type="submit"
          disabled={isLoading || !formData.block || !formData.floor || !formData.roomType || !formData.roomNumber}
          className={`w-[143px] h-[53px] rounded text-white font-medium text-xl md:text-2xl shadow-md transition-colors ${
            isLoading || !formData.block || !formData.floor || !formData.roomType || !formData.roomNumber
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#509CDB] hover:bg-[#4089c5]'
          }`}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default RoomForm;