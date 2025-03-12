/*
 * Copyright 2010-2020 M16, Inc. All rights reserved.
 * This software and documentation contain valuable trade
 * secrets and proprietary property belonging to M16, Inc.
 * None of this software and documentation may be copied,
 * duplicated or disclosed without the express
 * written permission of M16, Inc.
 */

package com.iiitb.hms.resource;

import com.fasterxml.jackson.annotation.JsonIgnore;
import platform.exception.ExceptionEnum;
 import platform.resource.BaseResource;
import platform.util.*;
import platform.db.*;
import java.util.*;
import com.iiitb.hms.message.*;
import com.iiitb.hms.helper.*;
import com.iiitb.hms.service.*;

/*
 ********** This is a generated class Don't modify it.Extend this file for additional functionality **********
 * 
 */
public class User extends BaseResource {
	private String id = null;
	private String g_created_by_id = null;
	private String g_created_by_name = null;
	private String g_modified_by_id = null;
	private String g_modified_by_name = null;
	private Long g_creation_time = null;
	private Long g_modify_time = null;
	private String g_soft_delete = null;
	private String g_status = null;
	private String archived = null;
	private Long archived_time = null;
	private String name = null;
	private String batch_id = null;
	private String program_id = null;
	private String branch_id = null;
	private String specialization = null;
	private String batch_name = null;
	private String email_id = null;
	private String roll_number = null;
	private String card_number = null;
	private String role = null;
	private String joining_date = null;
	private String dob = null;
	private String mobile_number = null;
	private String expiry_date = null;
	private String image_url = null;
	private String father_name = null;
	private String status = null;
	private Map<String, Object> extra_data = null;

	public static String FIELD_ID = "id";
	public static String FIELD_G_CREATED_BY_ID = "g_created_by_id";
	public static String FIELD_G_CREATED_BY_NAME = "g_created_by_name";
	public static String FIELD_G_MODIFIED_BY_ID = "g_modified_by_id";
	public static String FIELD_G_MODIFIED_BY_NAME = "g_modified_by_name";
	public static String FIELD_G_CREATION_TIME = "g_creation_time";
	public static String FIELD_G_MODIFY_TIME = "g_modify_time";
	public static String FIELD_G_SOFT_DELETE = "g_soft_delete";
	public static String FIELD_G_STATUS = "g_status";
	public static String FIELD_ARCHIVED = "archived";
	public static String FIELD_ARCHIVED_TIME = "archived_time";
	public static String FIELD_NAME = "name";
	public static String FIELD_BATCH_ID = "batch_id";
	public static String FIELD_PROGRAM_ID = "program_id";
	public static String FIELD_BRANCH_ID = "branch_id";
	public static String FIELD_SPECIALIZATION = "specialization";
	public static String FIELD_BATCH_NAME = "batch_name";
	public static String FIELD_EMAIL_ID = "email_id";
	public static String FIELD_ROLL_NUMBER = "roll_number";
	public static String FIELD_CARD_NUMBER = "card_number";
	public static String FIELD_ROLE = "role";
	public static String FIELD_JOINING_DATE = "joining_date";
	public static String FIELD_DOB = "dob";
	public static String FIELD_MOBILE_NUMBER = "mobile_number";
	public static String FIELD_EXPIRY_DATE = "expiry_date";
	public static String FIELD_IMAGE_URL = "image_url";
	public static String FIELD_FATHER_NAME = "father_name";
	public static String FIELD_STATUS = "status";
	public static String FIELD_EXTRA_DATA = "extra_data";

	private static final long serialVersionUID = 1L;
	public final static ResourceMetaData metaData = new ResourceMetaData("user");

	static {
		metaData.setCheckBeforeAdd(false);
		metaData.setCheckBeforeUpdate(false);

		metaData.setAllow_duplicate_name(false);
		Field idField = new Field("id", "String");
		idField.setIndexed(true);
		idField.setRequired(true);
		idField.setLength(128);
		metaData.addField(idField);

		Field g_created_by_idField = new Field("g_created_by_id", "String");
		g_created_by_idField.setLength(128);
		metaData.addField(g_created_by_idField);

		Field g_created_by_nameField = new Field("g_created_by_name", "String");
		g_created_by_nameField.setLength(128);
		metaData.addField(g_created_by_nameField);

		Field g_modified_by_idField = new Field("g_modified_by_id", "String");
		g_modified_by_idField.setLength(128);
		metaData.addField(g_modified_by_idField);

		Field g_modified_by_nameField = new Field("g_modified_by_name", "String");
		g_modified_by_nameField.setLength(128);
		metaData.addField(g_modified_by_nameField);

		Field g_creation_timeField = new Field("g_creation_time", "long");
		metaData.addField(g_creation_timeField);

		Field g_modify_timeField = new Field("g_modify_time", "long");
		metaData.addField(g_modify_timeField);

		Field g_soft_deleteField = new Field("g_soft_delete", "String");
		g_soft_deleteField.setDefaultValue("N");
		g_soft_deleteField.setLength(1);
		metaData.addField(g_soft_deleteField);

		Field g_statusField = new Field("g_status", "String");
		g_statusField.setIndexed(true);
		g_statusField.setLength(32);
		metaData.addField(g_statusField);

		Field archivedField = new Field("archived", "String");
		archivedField.setIndexed(true);
		archivedField.setDefaultValue("N");
		archivedField.setLength(1);
		metaData.addField(archivedField);

		Field archived_timeField = new Field("archived_time", "long");
		metaData.addField(archived_timeField);

		Field nameField = new Field("name", "String");
		nameField.setRequired(true);
		nameField.setLength(128);
		metaData.addField(nameField);

		Field batch_idField = new Field("batch_id", "String");
		batch_idField.setForeign(new Foreign("batch"));
		batch_idField.setLength(128);
		metaData.addField(batch_idField);

		Field program_idField = new Field("program_id", "String");
		program_idField.setRequired(true);
		program_idField.setForeign(new Foreign("program"));
		metaData.addField(program_idField);

		Field branch_idField = new Field("branch_id", "String");
		branch_idField.setRequired(true);
		branch_idField.setForeign(new Foreign("branch"));
		metaData.addField(branch_idField);

		Field specializationField = new Field("specialization", "String");
		metaData.addField(specializationField);

		Field batch_nameField = new Field("batch_name", "String");
		batch_nameField.setForeignDerived(new ForeignDerived("batch_id","batch_name"));
		batch_nameField.setLength(128);
		metaData.addField(batch_nameField);

		Field email_idField = new Field("email_id", "String");
		email_idField.setRequired(true);
		email_idField.setLength(50);
		metaData.addField(email_idField);

		Field roll_numberField = new Field("roll_number", "String");
		roll_numberField.setRequired(true);
		roll_numberField.setLength(16);
		metaData.addField(roll_numberField);

		Field card_numberField = new Field("card_number", "String");
		card_numberField.setLength(16);
		metaData.addField(card_numberField);

		Field roleField = new Field("role", "String");
		roleField.setRequired(true);
		roleField.setLength(16);
		metaData.addField(roleField);

		Field joining_dateField = new Field("joining_date", "String");
		joining_dateField.setRequired(true);
		metaData.addField(joining_dateField);

		Field dobField = new Field("dob", "String");
		metaData.addField(dobField);

		Field mobile_numberField = new Field("mobile_number", "String");
		mobile_numberField.setRequired(true);
		mobile_numberField.setLength(10);
		metaData.addField(mobile_numberField);

		Field expiry_dateField = new Field("expiry_date", "String");
		expiry_dateField.setRequired(true);
		metaData.addField(expiry_dateField);

		Field image_urlField = new Field("image_url", "String");
		metaData.addField(image_urlField);

		Field father_nameField = new Field("father_name", "String");
		father_nameField.setRequired(true);
		metaData.addField(father_nameField);

		Field statusField = new Field("status", "String");
		statusField.setRequired(true);
		statusField.setDefaultValue("Active");
		metaData.addField(statusField);

		Field extra_dataField = new Field("extra_data", "Map");
		extra_dataField.setValueType("Object");
		metaData.addField(extra_dataField);


		metaData.setTableName("user");

		metaData.setCluster("hostel_management_system");
	}

	public User() {this.setId(Util.getUniqueId());}
	public User(String id) {this.setId(id);}

	public User(User obj) {
		this.id = obj.id;
		this.g_created_by_id = obj.g_created_by_id;
		this.g_created_by_name = obj.g_created_by_name;
		this.g_modified_by_id = obj.g_modified_by_id;
		this.g_modified_by_name = obj.g_modified_by_name;
		this.g_creation_time = obj.g_creation_time;
		this.g_modify_time = obj.g_modify_time;
		this.g_soft_delete = obj.g_soft_delete;
		this.g_status = obj.g_status;
		this.archived = obj.archived;
		this.archived_time = obj.archived_time;
		this.name = obj.name;
		this.batch_id = obj.batch_id;
		this.program_id = obj.program_id;
		this.branch_id = obj.branch_id;
		this.specialization = obj.specialization;
		this.batch_name = obj.batch_name;
		this.email_id = obj.email_id;
		this.roll_number = obj.roll_number;
		this.card_number = obj.card_number;
		this.role = obj.role;
		this.joining_date = obj.joining_date;
		this.dob = obj.dob;
		this.mobile_number = obj.mobile_number;
		this.expiry_date = obj.expiry_date;
		this.image_url = obj.image_url;
		this.father_name = obj.father_name;
		this.status = obj.status;
		this.extra_data = obj.extra_data;
	}

	public ResourceMetaData getMetaData() {
		return metaData;
	}

	private void setDefaultValues() {
		if(g_soft_delete == null)
			g_soft_delete = "N";
		if(archived == null)
			archived = "N";
		if(status == null)
			status = "Active";
	}

	public Map<String, Object> convertResourceToMap(HashMap<String, Object> map) {
		if(id != null)
			map.put("id", id);
		if(g_created_by_id != null)
			map.put("g_created_by_id", g_created_by_id);
		if(g_created_by_name != null)
			map.put("g_created_by_name", g_created_by_name);
		if(g_modified_by_id != null)
			map.put("g_modified_by_id", g_modified_by_id);
		if(g_modified_by_name != null)
			map.put("g_modified_by_name", g_modified_by_name);
		if(g_creation_time != null)
			map.put("g_creation_time", g_creation_time);
		if(g_modify_time != null)
			map.put("g_modify_time", g_modify_time);
		if(g_soft_delete != null)
			map.put("g_soft_delete", g_soft_delete);
		if(g_status != null)
			map.put("g_status", g_status);
		if(archived != null)
			map.put("archived", archived);
		if(archived_time != null)
			map.put("archived_time", archived_time);
		if(name != null)
			map.put("name", name);
		if(batch_id != null)
			map.put("batch_id", batch_id);
		if(program_id != null)
			map.put("program_id", program_id);
		if(branch_id != null)
			map.put("branch_id", branch_id);
		if(specialization != null)
			map.put("specialization", specialization);
		if(batch_name != null)
			map.put("batch_name", batch_name);
		if(email_id != null)
			map.put("email_id", email_id);
		if(roll_number != null)
			map.put("roll_number", roll_number);
		if(card_number != null)
			map.put("card_number", card_number);
		if(role != null)
			map.put("role", role);
		if(joining_date != null)
			map.put("joining_date", joining_date);
		if(dob != null)
			map.put("dob", dob);
		if(mobile_number != null)
			map.put("mobile_number", mobile_number);
		if(expiry_date != null)
			map.put("expiry_date", expiry_date);
		if(image_url != null)
			map.put("image_url", image_url);
		if(father_name != null)
			map.put("father_name", father_name);
		if(status != null)
			map.put("status", status);
		if(extra_data != null)
			map.put("extra_data", extra_data);
		return map;
	}

	public Map<String, Object> validateAndConvertResourceToMap(HashMap<String,Object> map,boolean add) throws ApplicationException {
		if(validateId(add))
			map.put("id", id);
		if(g_created_by_id != null)
			map.put("g_created_by_id", g_created_by_id);
		if(g_created_by_name != null)
			map.put("g_created_by_name", g_created_by_name);
		if(g_modified_by_id != null)
			map.put("g_modified_by_id", g_modified_by_id);
		if(g_modified_by_name != null)
			map.put("g_modified_by_name", g_modified_by_name);
		if(g_creation_time != null)
			map.put("g_creation_time", g_creation_time);
		if(g_modify_time != null)
			map.put("g_modify_time", g_modify_time);
		if(g_soft_delete != null)
			map.put("g_soft_delete", g_soft_delete);
		if(g_status != null)
			map.put("g_status", g_status);
		if(archived != null)
			map.put("archived", archived);
		if(archived_time != null)
			map.put("archived_time", archived_time);
		if(validateName(add))
			map.put("name", name);
		if(batch_id != null)
			map.put("batch_id", batch_id);
		if(validateProgram_id(add))
			map.put("program_id", program_id);
		if(validateBranch_id(add))
			map.put("branch_id", branch_id);
		if(specialization != null)
			map.put("specialization", specialization);
		if(batch_name != null)
			map.put("batch_name", batch_name);
		if(validateEmail_id(add))
			map.put("email_id", email_id);
		if(validateRoll_number(add))
			map.put("roll_number", roll_number);
		if(card_number != null)
			map.put("card_number", card_number);
		if(validateRole(add))
			map.put("role", role);
		if(validateJoining_date(add))
			map.put("joining_date", joining_date);
		if(dob != null)
			map.put("dob", dob);
		if(validateMobile_number(add))
			map.put("mobile_number", mobile_number);
		if(validateExpiry_date(add))
			map.put("expiry_date", expiry_date);
		if(image_url != null)
			map.put("image_url", image_url);
		if(validateFather_name(add))
			map.put("father_name", father_name);
		if(validateStatus(add))
			map.put("status", status);
		if(extra_data != null)
			map.put("extra_data", extra_data);
		return map;
	}

	public Map<String, Object> convertResourceToPrimaryMap(HashMap<String, Object> map) {
		return map;
	}

	@SuppressWarnings("unchecked")
	public void convertMapToResource(Map<String, Object> map) {
		id = (String) map.get("id");
		g_created_by_id = (String) map.get("g_created_by_id");
		g_created_by_name = (String) map.get("g_created_by_name");
		g_modified_by_id = (String) map.get("g_modified_by_id");
		g_modified_by_name = (String) map.get("g_modified_by_name");
		g_creation_time = (map.get("g_creation_time") == null ? null : ((Number) map.get("g_creation_time")).longValue());
		g_modify_time = (map.get("g_modify_time") == null ? null : ((Number) map.get("g_modify_time")).longValue());
		g_soft_delete = (String) map.get("g_soft_delete");
		g_status = (String) map.get("g_status");
		archived = (String) map.get("archived");
		archived_time = (map.get("archived_time") == null ? null : ((Number) map.get("archived_time")).longValue());
		name = (String) map.get("name");
		batch_id = (String) map.get("batch_id");
		program_id = (String) map.get("program_id");
		branch_id = (String) map.get("branch_id");
		specialization = (String) map.get("specialization");
		batch_name = (String) map.get("batch_name");
		email_id = (String) map.get("email_id");
		roll_number = (String) map.get("roll_number");
		card_number = (String) map.get("card_number");
		role = (String) map.get("role");
		joining_date = (String) map.get("joining_date");
		dob = (String) map.get("dob");
		mobile_number = (String) map.get("mobile_number");
		expiry_date = (String) map.get("expiry_date");
		image_url = (String) map.get("image_url");
		father_name = (String) map.get("father_name");
		status = (String) map.get("status");
		extra_data = (Map<String, Object>) map.get("extra_data");
	}

	@SuppressWarnings("unchecked")
	public void convertTypeUnsafeMapToResource(Map<String, Object> map) {
		Object idObj = map.get("id");
		if(idObj != null)
			id = idObj.toString();

		Object g_created_by_idObj = map.get("g_created_by_id");
		if(g_created_by_idObj != null)
			g_created_by_id = g_created_by_idObj.toString();

		Object g_created_by_nameObj = map.get("g_created_by_name");
		if(g_created_by_nameObj != null)
			g_created_by_name = g_created_by_nameObj.toString();

		Object g_modified_by_idObj = map.get("g_modified_by_id");
		if(g_modified_by_idObj != null)
			g_modified_by_id = g_modified_by_idObj.toString();

		Object g_modified_by_nameObj = map.get("g_modified_by_name");
		if(g_modified_by_nameObj != null)
			g_modified_by_name = g_modified_by_nameObj.toString();

		Object g_creation_timeObj = map.get("g_creation_time");
		if(g_creation_timeObj != null)
			g_creation_time = new Long(g_creation_timeObj.toString());

		Object g_modify_timeObj = map.get("g_modify_time");
		if(g_modify_timeObj != null)
			g_modify_time = new Long(g_modify_timeObj.toString());

		Object g_soft_deleteObj = map.get("g_soft_delete");
		if(g_soft_deleteObj != null)
			g_soft_delete = g_soft_deleteObj.toString();

		Object g_statusObj = map.get("g_status");
		if(g_statusObj != null)
			g_status = g_statusObj.toString();

		Object archivedObj = map.get("archived");
		if(archivedObj != null)
			archived = archivedObj.toString();

		Object archived_timeObj = map.get("archived_time");
		if(archived_timeObj != null)
			archived_time = new Long(archived_timeObj.toString());

		Object nameObj = map.get("name");
		if(nameObj != null)
			name = nameObj.toString();

		Object batch_idObj = map.get("batch_id");
		if(batch_idObj != null)
			batch_id = batch_idObj.toString();

		Object program_idObj = map.get("program_id");
		if(program_idObj != null)
			program_id = program_idObj.toString();

		Object branch_idObj = map.get("branch_id");
		if(branch_idObj != null)
			branch_id = branch_idObj.toString();

		Object specializationObj = map.get("specialization");
		if(specializationObj != null)
			specialization = specializationObj.toString();

		Object batch_nameObj = map.get("batch_name");
		if(batch_nameObj != null)
			batch_name = batch_nameObj.toString();

		Object email_idObj = map.get("email_id");
		if(email_idObj != null)
			email_id = email_idObj.toString();

		Object roll_numberObj = map.get("roll_number");
		if(roll_numberObj != null)
			roll_number = roll_numberObj.toString();

		Object card_numberObj = map.get("card_number");
		if(card_numberObj != null)
			card_number = card_numberObj.toString();

		Object roleObj = map.get("role");
		if(roleObj != null)
			role = roleObj.toString();

		Object joining_dateObj = map.get("joining_date");
		if(joining_dateObj != null)
			joining_date = joining_dateObj.toString();

		Object dobObj = map.get("dob");
		if(dobObj != null)
			dob = dobObj.toString();

		Object mobile_numberObj = map.get("mobile_number");
		if(mobile_numberObj != null)
			mobile_number = mobile_numberObj.toString();

		Object expiry_dateObj = map.get("expiry_date");
		if(expiry_dateObj != null)
			expiry_date = expiry_dateObj.toString();

		Object image_urlObj = map.get("image_url");
		if(image_urlObj != null)
			image_url = image_urlObj.toString();

		Object father_nameObj = map.get("father_name");
		if(father_nameObj != null)
			father_name = father_nameObj.toString();

		Object statusObj = map.get("status");
		if(statusObj != null)
			status = statusObj.toString();

		extra_data = (Map<String, Object>) map.get("extra_data");
	}

	public void convertPrimaryMapToResource(Map<String, Object> map) {
	}

	public void convertTypeUnsafePrimaryMapToResource(Map<String, Object> map) {
	}

	public String getId() {
		return id;
	}

	public String getIdEx() {
		return id != null ? id : "";
	}

	public void setId(String id) {
		this.id = id;
	}

	public void unSetId() {
		this.id = null;
	}

	public boolean validateId(boolean add) throws ApplicationException {
		if(add && id == null)
			throw new ApplicationException(ExceptionSeverity.ERROR, "Requierd validation Failed[id]");
		return id != null;
	}

	public String getG_created_by_id() {
		return g_created_by_id;
	}

	public String getG_created_by_idEx() {
		return g_created_by_id != null ? g_created_by_id : "";
	}

	public void setG_created_by_id(String g_created_by_id) {
		this.g_created_by_id = g_created_by_id;
	}

	public void unSetG_created_by_id() {
		this.g_created_by_id = null;
	}

	public String getG_created_by_name() {
		return g_created_by_name;
	}

	public String getG_created_by_nameEx() {
		return g_created_by_name != null ? g_created_by_name : "";
	}

	public void setG_created_by_name(String g_created_by_name) {
		this.g_created_by_name = g_created_by_name;
	}

	public void unSetG_created_by_name() {
		this.g_created_by_name = null;
	}

	public String getG_modified_by_id() {
		return g_modified_by_id;
	}

	public String getG_modified_by_idEx() {
		return g_modified_by_id != null ? g_modified_by_id : "";
	}

	public void setG_modified_by_id(String g_modified_by_id) {
		this.g_modified_by_id = g_modified_by_id;
	}

	public void unSetG_modified_by_id() {
		this.g_modified_by_id = null;
	}

	public String getG_modified_by_name() {
		return g_modified_by_name;
	}

	public String getG_modified_by_nameEx() {
		return g_modified_by_name != null ? g_modified_by_name : "";
	}

	public void setG_modified_by_name(String g_modified_by_name) {
		this.g_modified_by_name = g_modified_by_name;
	}

	public void unSetG_modified_by_name() {
		this.g_modified_by_name = null;
	}

	public Long getG_creation_time() {
		return g_creation_time;
	}

	public long getG_creation_timeEx() {
		return g_creation_time != null ? g_creation_time : 0L;
	}

	public void setG_creation_time(long g_creation_time) {
		this.g_creation_time = g_creation_time;
	}

	@JsonIgnore
	public void setG_creation_time(Long g_creation_time) {
		this.g_creation_time = g_creation_time;
	}

	public void unSetG_creation_time() {
		this.g_creation_time = null;
	}

	public Long getG_modify_time() {
		return g_modify_time;
	}

	public long getG_modify_timeEx() {
		return g_modify_time != null ? g_modify_time : 0L;
	}

	public void setG_modify_time(long g_modify_time) {
		this.g_modify_time = g_modify_time;
	}

	@JsonIgnore
	public void setG_modify_time(Long g_modify_time) {
		this.g_modify_time = g_modify_time;
	}

	public void unSetG_modify_time() {
		this.g_modify_time = null;
	}

	public String getG_soft_delete() {
		return g_soft_delete != null ? g_soft_delete : "N";
	}

	public void setG_soft_delete(String g_soft_delete) {
		this.g_soft_delete = g_soft_delete;
	}

	public void unSetG_soft_delete() {
		this.g_soft_delete = "N";
	}

	public String getG_status() {
		return g_status;
	}

	public String getG_statusEx() {
		return g_status != null ? g_status : "";
	}

	public void setG_status(String g_status) {
		this.g_status = g_status;
	}

	public void unSetG_status() {
		this.g_status = null;
	}

	public String getArchived() {
		return archived != null ? archived : "N";
	}

	public void setArchived(String archived) {
		this.archived = archived;
	}

	public void unSetArchived() {
		this.archived = "N";
	}

	public Long getArchived_time() {
		return archived_time;
	}

	public long getArchived_timeEx() {
		return archived_time != null ? archived_time : 0L;
	}

	public void setArchived_time(long archived_time) {
		this.archived_time = archived_time;
	}

	@JsonIgnore
	public void setArchived_time(Long archived_time) {
		this.archived_time = archived_time;
	}

	public void unSetArchived_time() {
		this.archived_time = null;
	}

	public String getName() {
		return name;
	}

	public String getNameEx() {
		return name != null ? name : "";
	}

	public void setName(String name) {
		this.name = name;
	}

	public void unSetName() {
		this.name = null;
	}

	public boolean validateName(boolean add) throws ApplicationException {
		if(add && name == null)
			throw new ApplicationException(ExceptionSeverity.ERROR, "Requierd validation Failed[name]");
		return name != null;
	}

	public String getBatch_id() {
		return batch_id;
	}

	public String getBatch_idEx() {
		return batch_id != null ? batch_id : "";
	}

	public void setBatch_id(String batch_id) {
		this.batch_id = batch_id;
	}

	public void unSetBatch_id() {
		this.batch_id = null;
	}

	public String getProgram_id() {
		return program_id;
	}

	public String getProgram_idEx() {
		return program_id != null ? program_id : "";
	}

	public void setProgram_id(String program_id) {
		this.program_id = program_id;
	}

	public void unSetProgram_id() {
		this.program_id = null;
	}

	public boolean validateProgram_id(boolean add) throws ApplicationException {
		if(add && program_id == null)
			throw new ApplicationException(ExceptionSeverity.ERROR, "Requierd validation Failed[program_id]");
		return program_id != null;
	}

	public String getBranch_id() {
		return branch_id;
	}

	public String getBranch_idEx() {
		return branch_id != null ? branch_id : "";
	}

	public void setBranch_id(String branch_id) {
		this.branch_id = branch_id;
	}

	public void unSetBranch_id() {
		this.branch_id = null;
	}

	public boolean validateBranch_id(boolean add) throws ApplicationException {
		if(add && branch_id == null)
			throw new ApplicationException(ExceptionSeverity.ERROR, "Requierd validation Failed[branch_id]");
		return branch_id != null;
	}

	public String getSpecialization() {
		return specialization;
	}

	public String getSpecializationEx() {
		return specialization != null ? specialization : "";
	}

	public void setSpecialization(String specialization) {
		this.specialization = specialization;
	}

	public void unSetSpecialization() {
		this.specialization = null;
	}

	public String getBatch_name() {
		return batch_name;
	}

	public String getBatch_nameEx() {
		return batch_name != null ? batch_name : "";
	}

	public void setBatch_name(String batch_name) {
		this.batch_name = batch_name;
	}

	public void unSetBatch_name() {
		this.batch_name = null;
	}

	public String getEmail_id() {
		return email_id;
	}

	public String getEmail_idEx() {
		return email_id != null ? email_id : "";
	}

	public void setEmail_id(String email_id) {
		this.email_id = email_id;
	}

	public void unSetEmail_id() {
		this.email_id = null;
	}

	public boolean validateEmail_id(boolean add) throws ApplicationException {
		if(add && email_id == null)
			throw new ApplicationException(ExceptionSeverity.ERROR, "Requierd validation Failed[email_id]");
		return email_id != null;
	}

	public String getRoll_number() {
		return roll_number;
	}

	public String getRoll_numberEx() {
		return roll_number != null ? roll_number : "";
	}

	public void setRoll_number(String roll_number) {
		this.roll_number = roll_number;
	}

	public void unSetRoll_number() {
		this.roll_number = null;
	}

	public boolean validateRoll_number(boolean add) throws ApplicationException {
		if(add && roll_number == null)
			throw new ApplicationException(ExceptionSeverity.ERROR, "Requierd validation Failed[roll_number]");
		return roll_number != null;
	}

	public String getCard_number() {
		return card_number;
	}

	public String getCard_numberEx() {
		return card_number != null ? card_number : "";
	}

	public void setCard_number(String card_number) {
		this.card_number = card_number;
	}

	public void unSetCard_number() {
		this.card_number = null;
	}

	public String getRole() {
		return role;
	}

	public String getRoleEx() {
		return role != null ? role : "";
	}

	public void setRole(String role) {
		this.role = role;
	}

	public void unSetRole() {
		this.role = null;
	}

	public boolean validateRole(boolean add) throws ApplicationException {
		if(add && role == null)
			throw new ApplicationException(ExceptionSeverity.ERROR, "Requierd validation Failed[role]");
		return role != null;
	}

	public String getJoining_date() {
		return joining_date;
	}

	public String getJoining_dateEx() {
		return joining_date != null ? joining_date : "";
	}

	public void setJoining_date(String joining_date) {
		this.joining_date = joining_date;
	}

	public void unSetJoining_date() {
		this.joining_date = null;
	}

	public boolean validateJoining_date(boolean add) throws ApplicationException {
		if(add && joining_date == null)
			throw new ApplicationException(ExceptionSeverity.ERROR, "Requierd validation Failed[joining_date]");
		return joining_date != null;
	}

	public String getDob() {
		return dob;
	}

	public String getDobEx() {
		return dob != null ? dob : "";
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public void unSetDob() {
		this.dob = null;
	}

	public String getMobile_number() {
		return mobile_number;
	}

	public String getMobile_numberEx() {
		return mobile_number != null ? mobile_number : "";
	}

	public void setMobile_number(String mobile_number) {
		this.mobile_number = mobile_number;
	}

	public void unSetMobile_number() {
		this.mobile_number = null;
	}

	public boolean validateMobile_number(boolean add) throws ApplicationException {
		if(add && mobile_number == null)
			throw new ApplicationException(ExceptionSeverity.ERROR, "Requierd validation Failed[mobile_number]");
		return mobile_number != null;
	}

	public String getExpiry_date() {
		return expiry_date;
	}

	public String getExpiry_dateEx() {
		return expiry_date != null ? expiry_date : "";
	}

	public void setExpiry_date(String expiry_date) {
		this.expiry_date = expiry_date;
	}

	public void unSetExpiry_date() {
		this.expiry_date = null;
	}

	public boolean validateExpiry_date(boolean add) throws ApplicationException {
		if(add && expiry_date == null)
			throw new ApplicationException(ExceptionSeverity.ERROR, "Requierd validation Failed[expiry_date]");
		return expiry_date != null;
	}

	public String getImage_url() {
		return image_url;
	}

	public String getImage_urlEx() {
		return image_url != null ? image_url : "";
	}

	public void setImage_url(String image_url) {
		this.image_url = image_url;
	}

	public void unSetImage_url() {
		this.image_url = null;
	}

	public String getFather_name() {
		return father_name;
	}

	public String getFather_nameEx() {
		return father_name != null ? father_name : "";
	}

	public void setFather_name(String father_name) {
		this.father_name = father_name;
	}

	public void unSetFather_name() {
		this.father_name = null;
	}

	public boolean validateFather_name(boolean add) throws ApplicationException {
		if(add && father_name == null)
			throw new ApplicationException(ExceptionSeverity.ERROR, "Requierd validation Failed[father_name]");
		return father_name != null;
	}

	public String getStatus() {
		return status != null ? status : "Active";
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void unSetStatus() {
		this.status = "Active";
	}

	public boolean validateStatus(boolean add) throws ApplicationException {
		if(add && status == null)
			throw new ApplicationException(ExceptionSeverity.ERROR, "Requierd validation Failed[status]");
		return status != null;
	}

	public Map<String, Object> getExtra_data() {
		return extra_data;
	}

	public Object getExtra_data(String key) {
		return extra_data == null ? null : extra_data.get(key);
	}

	public void setExtra_data(Map<String, Object> extra_data) {
		this.extra_data = extra_data;
	}

	public void setExtra_data(String key, Object value) {
		if(extra_data == null)
			extra_data = new HashMap<String, Object>();
		extra_data.put(key, value);
	}

	public void unSetExtra_data() {
		this.extra_data = null;
	}
	public String getCluster() {
		return "hostel_management_system";
	}
	public String getClusterType() {
		return "REPLICATED";
	}
	public  Class<?> getResultClass() {return UserResult.class;};
	public  Class<?> getMessageClass() {return UserMessage.class;};
	public  Class<?> getHelperClass() {return UserHelper.class;};
	public  Class<?> getServiceClass() {return UserService.class;};
}