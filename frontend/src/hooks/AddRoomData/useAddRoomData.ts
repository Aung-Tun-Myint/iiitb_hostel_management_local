import { useState, useEffect } from 'react';
import { createRoom, checkRoomNumberExists, getRooms, getEnrichedRoomData } from '../../apis/add_room_data_backend';
import { toast } from 'react-toastify';

interface RoomFormData {
  floor: string;
  block: string;
  roomNumber: string;
  roomType: string;
}

interface RoomTableData {
  sNo: number;
  floor: string;
  roomNumber: string;
  block: string;
  roomType: string;
}

export const useAddRoomData = () => {
  // Form state
  const [formData, setFormData] = useState<RoomFormData>({
    floor: '',
    block: '',
    roomNumber: '',
    roomType: '',
  });

  // Room data for the table
  const [roomsData, setRoomsData] = useState<any[]>([]);
  const [transformedRoomsData, setTransformedRoomsData] = useState<RoomTableData[]>([]);
  
  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load rooms data on component mount
  useEffect(() => {
    loadRoomsData();
  }, []);

  // Transform rooms data for the table whenever it changes
  useEffect(() => {
    transformRoomsData();
  }, [roomsData]);

  // Load rooms data from the API
  const loadRoomsData = async () => {
    try {
      const rooms = await getRooms();
      console.log("Room Data:", rooms);
      const enrichedRooms = await getEnrichedRoomData(rooms);
      console.log("Enriched Room Data:", enrichedRooms);
      setRoomsData(enrichedRooms);
    } catch (error) {
      console.error('Error loading rooms:', error);
      toast.error('Failed to load rooms data');
    }
  };

  // Transform the rooms data for the table component
  const transformRoomsData = () => {
    const transformed = roomsData.map((room, index) => ({
      sNo: index + 1,
      floor: room.floor_name,
      roomNumber: room.room_number,
      block: room.block_name,
      roomType: room.room_type_name,
    }));
    setTransformedRoomsData(transformed);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate room number uniqueness
      const roomExists = await checkRoomNumberExists(formData.roomNumber);
      if (roomExists) {
        setError(`Room number ${formData.roomNumber} already exists.`);
        setIsLoading(false);
        return;
      }

      // Create the room
      const roomData = {
        room_number: formData.roomNumber,
        block_id: formData.block,
        floor_id: formData.floor,
        room_type_id: formData.roomType,
      };

      await createRoom(roomData);
      toast.success('Room added successfully!');
      
      // Reset form
      setFormData({
        floor: '',
        block: '',
        roomNumber: '',
        roomType: '',
      });
      
      // Refresh rooms data
      await loadRoomsData();
      
    } catch (error) {
      console.error('Error creating room:', error);
      setError('Failed to create room. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term) {
      transformRoomsData();
      return;
    }

    const filtered = roomsData
      .filter(room => 
        room.room_number.toLowerCase().includes(term.toLowerCase()) ||
        room.block_name.toLowerCase().includes(term.toLowerCase()) ||
        room.floor_name.toLowerCase().includes(term.toLowerCase()) ||
        room.room_type_name.toLowerCase().includes(term.toLowerCase())
      )
      .map((room, index) => ({
        sNo: index + 1,
        floor: room.floor_name,
        roomNumber: room.room_number,
        block: room.block_name,
        roomType: room.room_type_name,
      }));

    setTransformedRoomsData(filtered);
  };

  return {
    formData,
    roomsData: transformedRoomsData,
    searchTerm,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
    handleSearch,
    setSearchTerm,
    loadRoomsData  // Export this function in case we need to manually refresh data
  };
};