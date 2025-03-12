package com.iiitb.hms.decorators;

import com.iiitb.hms.helper.RoomHelper;
import com.iiitb.hms.resource.Room;

import platform.decorator.BaseDecorator;
import platform.resource.BaseResource;
import platform.util.ApplicationException;
import platform.util.ExceptionSeverity;
import platform.util.Util;
import platform.webservice.ServletContext;
import platform.webservice.BaseService;
import platform.db.Expression;
import platform.db.REL_OP;

import java.util.Map;
import java.util.Objects;

public class RoomDecorator extends BaseDecorator {

    // Constants for query IDs
    private static final String QUERY_GET_ROOM_BY_ROOM_NUMBER = "GET_ROOM_BY_ROOM_NUMBER";
    private static final String PARAM_ROOM_NUMBER = "room_number";
    public RoomDecorator(){
        super(new Room());
    }

   @Override
    public BaseResource[] getQuery(ServletContext ctx, String queryId, Map<String, Object> map, BaseService service) throws ApplicationException {
        System.out.println("RoomDecorator getQuery: " + queryId);
        
        if (QUERY_GET_ROOM_BY_ROOM_NUMBER.equalsIgnoreCase(queryId)) {
            return getRoomByRoomNumber(ctx, map);
        } else {
            return super.getQuery(ctx, queryId, map, service);
        }
    }
    
    /**
     * Gets a room by its room number
     * @param ctx Servlet context
     * @param map Query parameters
     * @return Array of Room resources matching the room number (usually only one)
     * @throws ApplicationException If room_number is missing or other errors occur
     */
    private BaseResource[] getRoomByRoomNumber(ServletContext ctx, Map<String, Object> map) throws ApplicationException {
        // Extract room_number from parameters
        String roomNumber = (String) map.get(PARAM_ROOM_NUMBER);
        
        // Validate input
        if (Util.isEmpty(roomNumber)) {
            throw new ApplicationException(ExceptionSeverity.ERROR, "Room number not provided");
        }
        
        System.out.println("Getting room with room number: " + roomNumber);
        
        try {
            // Create expression for query
            Expression exp = new Expression(Room.FIELD_ROOM_NUMBER, REL_OP.EQ, roomNumber);
            
            // Get rooms by expression
            BaseResource[] rooms = RoomHelper.getInstance().getByExpression(exp);
            
            // Log result
            System.out.println("Found " + (rooms != null ? rooms.length : 0) + " rooms with room number " + roomNumber);
            
            return rooms != null ? rooms : new BaseResource[0];
        } catch (Exception e) {
            System.err.println("Error getting room by room number: " + e.getMessage());
            throw new ApplicationException(ExceptionSeverity.ERROR, 
                "Failed to retrieve room with room number " + roomNumber + ": " + e.getMessage());
        }
    }

    @Override
    public void preAddDecorator(ServletContext ctx, BaseResource _resource) throws ApplicationException {
        Room room = (Room) _resource;

        BaseResource[] rooms = RoomHelper.getInstance().getAll();

        for (BaseResource res: rooms){
            Room r = (Room) res;
            if (Objects.equals(r.getRoom_number(), room.getRoom_number())){
                throw new ApplicationException(ExceptionSeverity.ERROR, "Room Number already exists!");
            }
        }
    }
}
