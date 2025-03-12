package com.iiitb.hms.decorators;

import com.iiitb.hms.helper.RoomAllotmentHelper;
import com.iiitb.hms.helper.RoomHelper;
import com.iiitb.hms.helper.UserHelper;
import com.iiitb.hms.resource.Room;
import com.iiitb.hms.resource.RoomAllotment;
import com.iiitb.hms.resource.User;
import platform.db.Expression;
import platform.db.REL_OP;
import platform.decorator.BaseDecorator;
import platform.resource.BaseResource;
import platform.util.ApplicationException;
import platform.util.ExceptionSeverity;
import platform.util.Util;
import platform.webservice.BaseService;
import platform.webservice.ServletContext;

import java.util.*;

public class UserDecorator extends BaseDecorator {

    public UserDecorator(){
        super(new User());
    }

    @Override
    public void preAddDecorator(ServletContext ctx, BaseResource _resource) throws ApplicationException{
        User user = (User) _resource;

        BaseResource[] users = UserHelper.getInstance().getAll();

        for (BaseResource resource: users){
            User u = (User) resource;

            if (Objects.equals(u.getEmail_id(), user.getEmail_id())){
                throw new ApplicationException(ExceptionSeverity.ERROR, "User already exists! Duplicate email found!");
            }
        }
    }

    @Override
    public void postAddDecorator(ServletContext ctx, BaseResource _resource) throws ApplicationException{
        User newUser = (User) _resource;

        platform.defined.resource.User user = new platform.defined.resource.User(newUser.getId());
        user.setType("Super Admin");
        user.setEmail_id(newUser.getEmail_id());
        user.setMobile_no(newUser.getMobile_number());
        user.setPassword(newUser.getEmail_id());
        user.setName(newUser.getName());
//        user.setRole(newUser.getRole());
        platform.defined.helper.UserHelper.getInstance().AddOrUpdateNoCache(user);
    }

    @Override
    public BaseResource[] getQuery(ServletContext ctx, String queryId, Map<String, Object> map, BaseService service) throws ApplicationException{
        if ("GET_STUDENT_BY_ROLL_NUMBER".equalsIgnoreCase(queryId)){
            String roll_number = (String) map.get(User.FIELD_ROLL_NUMBER);

            if (Util.isEmpty(roll_number)){
                throw new ApplicationException(ExceptionSeverity.ERROR, "Roll Number not found!");
            }

            Expression e = new Expression(User.FIELD_ROLL_NUMBER, REL_OP.EQ, roll_number);
            return UserHelper.getInstance().getByExpression(e);
        }
        else if("GET_STUDENT_BY_ROOM_NUMBER".equalsIgnoreCase(queryId)){
            String room_number = (String) map.get(Room.FIELD_ROOM_NUMBER);

            if (Util.isEmpty(room_number)){
                throw new ApplicationException(ExceptionSeverity.ERROR, "Room Number does not exist!");
            }

            Expression room_exp = new Expression(Room.FIELD_ROOM_NUMBER, REL_OP.EQ, room_number);
            Room room_data = (Room) RoomHelper.getInstance().getByExpressionFirstRecord(room_exp);

            Expression room_allotment_exp = new Expression(RoomAllotment.FIELD_ROOM_ID, REL_OP.EQ, room_data.getId());
            BaseResource[] room_allotments = RoomAllotmentHelper.getInstance().getByExpression(room_allotment_exp);

            if (room_allotments.length != 0) {
                List<String> student_ids = new ArrayList<>();

                for (BaseResource resource : room_allotments) {
                    RoomAllotment rlt = (RoomAllotment) resource;
                    student_ids.add(rlt.getUser_id());
                }

                Expression students_exp = new Expression(User.FIELD_ID, REL_OP.IN, student_ids);

                return UserHelper.getInstance().getByExpression(students_exp);
            } else {
                throw new ApplicationException(ExceptionSeverity.ERROR, "This room has not been assigned to anyone yet!");
            }
        }

        return super.getQuery(ctx, queryId, map, service);
    }
}
