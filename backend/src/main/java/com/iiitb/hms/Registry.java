package com.iiitb.hms;
import platform.helper.HelperManager;
import platform.webservice.ServiceManager;
import com.iiitb.hms.helper.*;
import com.iiitb.hms.service.*;
public class Registry {
		public static void register(){
				 HelperManager.getInstance().register(BlockHelper.getInstance());
				 HelperManager.getInstance().register(FloorHelper.getInstance());
				 HelperManager.getInstance().register(RoomHelper.getInstance());
				 HelperManager.getInstance().register(RoomAllotmentHelper.getInstance());
				 HelperManager.getInstance().register(RoomTypeHelper.getInstance());
				 HelperManager.getInstance().register(UserHelper.getInstance());
				 ServiceManager.getInstance().register(new BlockService());
				 ServiceManager.getInstance().register(new FloorService());
				 ServiceManager.getInstance().register(new RoomService());
				 ServiceManager.getInstance().register(new RoomAllotmentService());
				 ServiceManager.getInstance().register(new RoomTypeService());
				 ServiceManager.getInstance().register(new UserService());
		}
}
