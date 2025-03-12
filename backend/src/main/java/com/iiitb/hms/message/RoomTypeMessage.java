/*
 * Copyright 2010-2020 M16, Inc. All rights reserved.
 * This software and documentation contain valuable trade
 * secrets and proprietary property belonging to M16, Inc.
 * None of this software and documentation may be copied,
 * duplicated or disclosed without the express
 * written permission of M16, Inc.
 */

package com.iiitb.hms.message;

import com.iiitb.hms.resource.*;
import platform.communication.kafka.BaseMessage;
import platform.resource.BaseResource;
import platform.webservice.BaseService;
import platform.db.*;
import java.util.*;

/*
 ********** This is a generated class Don't modify it.Extend this file for additional functionality **********
 * 
 */
 public class RoomTypeMessage extends BaseMessage {
		public RoomTypeMessage() {this(new RoomType());}
		public RoomTypeMessage(BaseResource resource) {super(resource);}
		public RoomTypeMessage(BaseResource resource,String action) {super(resource,action);}
		public RoomTypeMessage(BaseResource resource,String action,String sessionId) {super(resource,action,sessionId);}
		public static RoomTypeMessage of(BaseResource resource,String action) {return new RoomTypeMessage(resource,action);}
}