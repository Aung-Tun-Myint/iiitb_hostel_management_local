import BASE_URL from '../config';
import { toast } from 'react-toastify';

// Define interfaces for room-related data structures
export interface Block {
  id: string;
  name: string;
  floor_count: number;
  description: string;
}

export interface Floor {
  id: string;
  block_id: string;
  number: number;  // Changed from 'name' to 'number' to match MongoDB document
  room_count: number;
}

export interface RoomType {
  id: string;
  name: string;
  capacity: number;
  description: string;
}

export interface Room {
  id?: string;
  room_number: string;
  block_id: string;
  floor_id: string;
  room_type_id: string;
  status?: string;
  occupancy?: number;
  capacity?: number;
}

//const ACTIVE = "active";
const INACTIVE = "Inactive";



// Function to convert floor number to display name
export const getFloorDisplayName = (floorNumber: number): string => {
  if (floorNumber === 0) return 'Ground Floor';
  if (floorNumber === 1) return 'First Floor';
  if (floorNumber === 2) return 'Second Floor';
  if (floorNumber === 3) return 'Third Floor';
  if (floorNumber === 4) return 'Fourth Floor';
  if (floorNumber === 5) return 'Fifth Floor';
  if (floorNumber === 6) return 'Sixth Floor';
  if (floorNumber === 7) return 'Seventh Floor';
  if (floorNumber === 8) return 'Eighth Floor';
  if (floorNumber === 9) return 'Ninth Floor';
  
  // For any other numbers (10 and above)
  return `${floorNumber}${getOrdinalSuffix(floorNumber)} Floor`;
};

// Helper function to get ordinal suffix (th, st, nd, rd)
const getOrdinalSuffix = (num: number): string => {
  if (num > 9 && num < 20) return 'th'; // 11th, 12th, etc.
  const lastDigit = num % 10;
  if (lastDigit === 1) return 'st';
  if (lastDigit === 2) return 'nd';
  if (lastDigit === 3) return 'rd';
  return 'th';
};

/**
 * Fetches all blocks from the database
 * @returns Promise with array of blocks
 */
export const getAllBlocks = async (): Promise<Block[]> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      `${BASE_URL}/api/block?queryId=GET_ALL&session_id=${ssid}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData.resource || [];
  } catch (error) {
    console.error("Error fetching blocks:", error);
    toast.error("Failed to load blocks");
    return [];
  }
};

/**
 * Fetches all floors from the database
 * @returns Promise with array of floors
 */
export const getAllFloors = async (): Promise<Floor[]> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      `${BASE_URL}/api/floor?queryId=GET_ALL&session_id=${ssid}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData.resource || [];
  } catch (error) {
    console.error("Error fetching floors:", error);
    toast.error("Failed to load floors");
    return [];
  }
};

/**
 * Fetches floors for a specific block
 * @param blockId The ID of the block
 * @returns Promise with array of floors for the specified block
 */
export const getFloorsByBlockId = async (blockId: string): Promise<Floor[]> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      `${BASE_URL}/api/floor?queryId=GET_FlOORS_BY_BLOCK_ID&session_id=${ssid}&args=block_id:${blockId}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData.resource || [];
  } catch (error) {
    console.error(`Error fetching floors for block ${blockId}:`, error);
    toast.error("Failed to load floors for this block");
    
    // Fallback: filter from all floors
    try {
      const allFloors = await getAllFloors();
      return allFloors.filter(floor => floor.block_id === blockId);
    } catch {
      return [];
    }
  }
};

/**
 * Fetches all room types from the database
 * @returns Promise with array of room types
 */
export const getAllRoomTypes = async (): Promise<RoomType[]> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      `${BASE_URL}/api/room_type?queryId=GET_ALL&session_id=${ssid}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData.resource || [];
  } catch (error) {
    console.error("Error fetching room types:", error);
    toast.error("Failed to load room types");
    return [];
  }
};


/**
 * Create a new room
 * @param roomData Room data to create
 * @returns Promise with the created room or error
 */
export const createRoom = async (roomData: Room): Promise<any> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }

    // Prepare room data with default values if not provided
    const preparedRoomData = {
      ...roomData,
      status: roomData.status || INACTIVE, // Default status
      occupancy: roomData.occupancy || 0, // Default occupancy (empty)
    };

    // Convert to JSON and encode
    const jsonString = JSON.stringify(preparedRoomData);
    const base64Encoded = btoa(jsonString);

    const response = await fetch(
      `${BASE_URL}/api/room?session_id=${ssid}&resource=${base64Encoded}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        mode: "cors",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error creating room:", errorText);
      throw new Error(`Failed to create room: ${response.status}`);
    }

    const result = await response.json();
    if (result.errCode !== 0) {
      throw new Error(result.errMsg || "Failed to create room");
    }

    return result;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

/**
 * Helper function to convert filter object to RASP Platform filter string format
 * @param filters Object containing filter criteria as key-value pairs
 * @returns Filter string in the format "field1:value1,field2:value2"
 */
export const buildFilterString = (filters: Record<string, string>): string => {
  return Object.entries(filters)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}:${value}`)
    .join(',');
};

/**
 * Helper function to build query args string
 * @param args Object containing arg key-value pairs
 * @returns String with formatted args for API request
 */
export const buildArgsString = (args: Record<string, string>): string[] => {
  return Object.entries(args)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}:${value}`);
};

/**
 * Fetch all rooms or rooms by filter criteria
 * @param filters Optional filter criteria
 * @returns Promise with array of rooms
 */
export const getRooms = async (filters?: { 
  blockId?: string, 
  floorId?: string, 
  roomTypeId?: string,
  status?: string
}): Promise<any[]> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }

    // Build the query parameters based on filters
    let url = `${BASE_URL}/api/room?queryId=GET_ALL&session_id=${ssid}`;
    
    if (filters) {
      // Convert object filters to args parameters
      const args: Record<string, string> = {};
      if (filters.blockId) args.block_id = filters.blockId;
      if (filters.floorId) args.floor_id = filters.floorId;
      if (filters.roomTypeId) args.room_type_id = filters.roomTypeId;
      if (filters.status) args.status = filters.status;
      
      const argsArray = buildArgsString(args);
      
      // Append each arg to the URL
      argsArray.forEach(arg => {
        url += `&args=${arg}`;
      });
    }

    console.log("Using args query:", url);

    const response = await fetch(
      url,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    return jsonData.resource || [];
  } catch (error) {
    console.error("Error fetching rooms:", error);
    toast.error("Failed to load rooms");
    return [];
  }
};

/**
 * Function to search rooms with more complex filter criteria
 * @param searchCriteria Complex search criteria
 * @returns Promise with array of rooms matching the criteria
 */
export const searchRoomsAdvanced = async (
  searchCriteria: {
    blocks?: string[],
    floors?: string[],
    roomTypes?: string[],
    statuses?: string[],
    occupancyRange?: { min?: number, max?: number },
    capacityRange?: { min?: number, max?: number },
    roomNumberPattern?: string
  }
): Promise<any[]> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }

    // First get all rooms (or use basic filters if applicable)
    let baseFilters: any = {};
    if (searchCriteria.blocks?.length === 1) baseFilters.blockId = searchCriteria.blocks[0];
    if (searchCriteria.floors?.length === 1) baseFilters.floorId = searchCriteria.floors[0];
    if (searchCriteria.roomTypes?.length === 1) baseFilters.roomTypeId = searchCriteria.roomTypes[0];
    if (searchCriteria.statuses?.length === 1) baseFilters.status = searchCriteria.statuses[0];

    let rooms = await getRooms(baseFilters);

    // Apply client-side filtering for more complex criteria
    return rooms.filter(room => {
      // Filter by blocks if multiple selected
      if (searchCriteria.blocks && searchCriteria.blocks.length > 0 && 
          !searchCriteria.blocks.includes(room.block_id)) {
        return false;
      }

      // Filter by floors if multiple selected
      if (searchCriteria.floors && searchCriteria.floors.length > 0 && 
          !searchCriteria.floors.includes(room.floor_id)) {
        return false;
      }

      // Filter by room types if multiple selected
      if (searchCriteria.roomTypes && searchCriteria.roomTypes.length > 0 && 
          !searchCriteria.roomTypes.includes(room.room_type_id)) {
        return false;
      }

      // Filter by statuses if multiple selected
      if (searchCriteria.statuses && searchCriteria.statuses.length > 0 && 
          !searchCriteria.statuses.includes(room.status)) {
        return false;
      }

      // Filter by occupancy range
      if (searchCriteria.occupancyRange) {
        const { min, max } = searchCriteria.occupancyRange;
        if (min !== undefined && room.occupancy < min) return false;
        if (max !== undefined && room.occupancy > max) return false;
      }

      // Filter by capacity range
      if (searchCriteria.capacityRange) {
        const { min, max } = searchCriteria.capacityRange;
        if (min !== undefined && room.capacity < min) return false;
        if (max !== undefined && room.capacity > max) return false;
      }

      // Filter by room number pattern
      if (searchCriteria.roomNumberPattern) {
        const pattern = new RegExp(searchCriteria.roomNumberPattern, 'i');
        if (!pattern.test(room.room_number)) return false;
      }

      return true;
    });
  } catch (error) {
    console.error("Error in advanced room search:", error);
    toast.error("Failed to search rooms with advanced criteria");
    return [];
  }
};

/**
 * Get room details by room number
 * @param roomNumber Room number to search for
 * @returns Promise with room details or null if not found
 */
export const getRoomByNumber = async (roomNumber: string): Promise<any | null> => {
  try {
    const ssid = sessionStorage.getItem("key");
    if (!ssid) {
      throw new Error("Session ID is expired");
    }

    const response = await fetch(
      `${BASE_URL}/api/room?queryId=GET_ROOM_BY_ROOM_NUMBER&session_id=${ssid}&args=room_number:${roomNumber}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    const rooms = jsonData.resource || [];
    return rooms.length > 0 ? rooms[0] : null;
  } catch (error) {
    console.error(`Error fetching room by number ${roomNumber}:`, error);
    return null;
  }
};

/**
 * Check if a room number already exists
 * @param roomNumber Room number to check
 * @returns Promise resolving to boolean indicating if room exists
 */
export const checkRoomNumberExists = async (roomNumber: string): Promise<boolean> => {
  try {
    const room = await getRoomByNumber(roomNumber);
    return room !== null;
  } catch (error) {
    console.error("Error checking room number:", error);
    return false;
  }
};

/**
 * Get room details with related entity names (block name, floor name, room type name)
 * @param rooms Array of room objects
 * @returns Promise with enriched room data
 */
export const getEnrichedRoomData = async (rooms: any[]): Promise<any[]> => {
  try {
    // Fetch related data
    const blocks = await getAllBlocks();
    const floors = await getAllFloors();
    const roomTypes = await getAllRoomTypes();

    // Create lookup maps for faster access
    const blockMap = new Map(blocks.map(block => [block.id, block]));
    const floorMap = new Map(floors.map(floor => [floor.id, floor]));
    const roomTypeMap = new Map(roomTypes.map(type => [type.id, type]));

    // Enrich room data with related entity names
    return rooms.map(room => ({
      ...room,
      block_name: blockMap.get(room.block_id)?.name || 'Unknown Block',
      floor_name: floorMap.get(room.floor_id)?.number !== undefined ? getFloorDisplayName(floorMap.get(room.floor_id)!.number) : 'Unknown Floor',
      room_type_name: roomTypeMap.get(room.room_type_id)?.name || 'Unknown Type',
      capacity: roomTypeMap.get(room.room_type_id)?.capacity || 0
    }));
  } catch (error) {
    console.error("Error enriching room data:", error);
    return rooms; // Return original data if enrichment fails
  }
};

/**
 * Sample function demonstrating how to use filters with getRooms
 */
export const getSampleRoomsByFilters = async () => {
  console.log("Starting filter tests...");
  
  try {
    // First, let's get all rooms to see if we have any data at all
    console.log("Fetching all rooms to check data availability...");
    const allRooms = await getRooms();
    console.log(`Total rooms in database: ${allRooms.length}`, allRooms);
    
    if (allRooms.length === 0) {
      console.warn("No rooms found in the database. Please add some rooms first.");
      return;
    }
    
    // Get the actual IDs from data instead of using hard-coded values
    console.log("Fetching all blocks to get actual IDs...");
    const blocks = await getAllBlocks();
    console.log("Available blocks:", blocks);
    
    if (blocks.length === 0) {
      console.warn("No blocks found in the database. Please add some blocks first.");
      return;
    }
    
    // Get the first block ID from actual data
    const firstBlockId = blocks[0].id;
    console.log(`Using first block ID: ${firstBlockId}`);
    
    // Try a simple filter with just the first block
    console.log("Testing simple block filter...");
    const roomsInFirstBlock = await getRooms({ blockId: firstBlockId });
    console.log(`Rooms in first block (${blocks[0].name}):`, roomsInFirstBlock);
    
    // Rest of the function remains the same
    // ...existing code...
  } catch (error) {
    console.error("Error in filter tests:", error);
  }
};