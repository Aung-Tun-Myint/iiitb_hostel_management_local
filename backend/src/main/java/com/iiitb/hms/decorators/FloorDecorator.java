package com.iiitb.hms.decorators;

import java.util.Map;

import platform.resource.BaseResource;
import platform.util.ApplicationException;
import platform.util.ExceptionSeverity;
import platform.util.Util;
import platform.db.Expression;
import platform.db.REL_OP;
import platform.decorator.BaseDecorator;
import platform.webservice.BaseService;
import platform.webservice.ServletContext;

import com.iiitb.hms.resource.Floor;
import com.iiitb.hms.helper.FloorHelper;

public class FloorDecorator extends BaseDecorator {
    
    private static final String QUERY_GET_FLOORS_BY_BLOCK_ID = "GET_FLOORS_BY_BLOCK_ID";
    private static final String PARAM_BLOCK_ID = "block_id";
    
    public FloorDecorator() {
        super(new Floor());
    }

    @Override
    public BaseResource[] getQuery(ServletContext ctx, String queryId, Map<String, Object> map, BaseService service) throws ApplicationException {
        System.out.println("FloorDecorator getQuery: " + queryId);
        
        if (QUERY_GET_FLOORS_BY_BLOCK_ID.equalsIgnoreCase(queryId)) {
            return getFloorsByBlockId(ctx, map);
        } else {
            return super.getQuery(ctx, queryId, map, service);
        }
    }
    
    /**
     * Gets floors for a specific block
     * @param ctx Servlet context
     * @param map Query parameters
     * @return Array of Floor resources for the specified block
     * @throws ApplicationException If block_id is missing or other errors occur
     */
    private BaseResource[] getFloorsByBlockId(ServletContext ctx, Map<String, Object> map) throws ApplicationException {
        // Extract block_id from parameters
        String blockId = (String) map.get(PARAM_BLOCK_ID);
        
        // Validate input
        if (Util.isEmpty(blockId)) {
            throw new ApplicationException(ExceptionSeverity.ERROR, "Block ID not provided");
        }
        
        System.out.println("Getting floors for block ID: " + blockId);
        
        try {
            // Create expression for query
            Expression exp = new Expression(Floor.FIELD_BLOCK_ID, REL_OP.EQ, blockId);
            
            // Get floors by expression
            BaseResource[] floors = FloorHelper.getInstance().getByExpression(exp);
            
            // Log result
            System.out.println("Found " + (floors != null ? floors.length : 0) + " floors for block " + blockId);
            // Iterate over floors and log their details
            for (BaseResource floor : floors) {
                System.out.println("Floor ID: " + floor.getId() + ", Floor Number: " + ((Floor) floor).getNumber());
            }
            return floors != null ? floors : new BaseResource[0];
        } catch (Exception e) {
            System.err.println("Error getting floors for block: " + e.getMessage());
            throw new ApplicationException(ExceptionSeverity.ERROR, 
                "Failed to retrieve floors for block " + blockId + ": " + e.getMessage());
        }
    }
}
