import { useState, useEffect, useCallback } from 'react';
import { getAllBlocks, Block, getFloorsByBlockId, Floor, getAllRoomTypes, RoomType } from '../../apis/add_room_data_backend';

interface UseRoomFormProps {
  initialBlockId?: string;
}

export const useRoomForm = ({ initialBlockId }: UseRoomFormProps = {}) => {
  // State for dropdown data
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  
  // State for loading indicators
  const [loadingBlocks, setLoadingBlocks] = useState<boolean>(false);
  const [loadingFloors, setLoadingFloors] = useState<boolean>(false);
  const [loadingRoomTypes, setLoadingRoomTypes] = useState<boolean>(false);
  
  // Error states
  const [blocksError, setBlocksError] = useState<string | null>(null);
  const [floorsError, setFloorsError] = useState<string | null>(null);
  const [roomTypesError, setRoomTypesError] = useState<string | null>(null);

  // Load blocks and room types on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchBlocks();
      await fetchRoomTypes();
    };
    
    fetchInitialData();
  }, []);

  // Fetch floors when block selection changes
  useEffect(() => {
    if (initialBlockId) {
      fetchFloorsByBlockId(initialBlockId);
    }
  }, [initialBlockId]);

  // Function to fetch blocks
  const fetchBlocks = async () => {
    setLoadingBlocks(true);
    setBlocksError(null);
    try {
      const fetchedBlocks = await getAllBlocks();
      setBlocks(fetchedBlocks);
    } catch (error) {
      console.error("Error fetching blocks:", error);
      setBlocksError("Failed to load blocks. Please try again.");
    } finally {
      setLoadingBlocks(false);
    }
  };

  // Function to fetch floors by block ID - wrapped in useCallback
  const fetchFloorsByBlockId = useCallback(async (blockId: string) => {
    if (!blockId) return;
    
    setLoadingFloors(true);
    setFloorsError(null);
    try {
      const fetchedFloors = await getFloorsByBlockId(blockId);
      setFloors(fetchedFloors);
    } catch (error) {
      console.error("Error fetching floors:", error);
      setFloorsError("Failed to load floors for this block.");
    } finally {
      setLoadingFloors(false);
    }
  }, []); // Empty dependency array ensures this function reference is stable

  // Function to fetch room types
  const fetchRoomTypes = async () => {
    setLoadingRoomTypes(true);
    setRoomTypesError(null);
    try {
      const fetchedRoomTypes = await getAllRoomTypes();
      setRoomTypes(fetchedRoomTypes);
    } catch (error) {
      console.error("Error fetching room types:", error);
      setRoomTypesError("Failed to load room types.");
    } finally {
      setLoadingRoomTypes(false);
    }
  };

  return {
    // Data
    blocks,
    floors,
    roomTypes,
    
    // Loading states
    loadingBlocks,
    loadingFloors,
    loadingRoomTypes,
    
    // Error states
    blocksError,
    floorsError,
    roomTypesError,
    
    // Functions
    fetchFloorsByBlockId,
    fetchBlocks,
    fetchRoomTypes
  };
};
