package com.iiitb.hms;
import platform.defined.ResourceGenerator;
import platform.util.Util;

public class GenerateResource {
    public static void main(String []args) throws Exception {

        String web_app_director =  "backend/src/main/resources/static/ui/json";
        String controller_dir ="backend/src/main/java/com/iiitb/hms/controller";
        String controller_package = "com.iiitb.hms.controller";

        if (args.length > 0) {
            web_app_director = args[0];
        }
        if (args.length > 1) {
            controller_dir = args[1];
        }
        if (args.length > 2) {
            controller_package = args[2];
        }
        ResourceGenerator generator = new ResourceGenerator("com.iiitb.hms", "backend/src/main/java/com/iiitb/hms/");
        if (!Util.isEmpty(web_app_director)) {
            generator.setWeb_app_directory(web_app_director);
        }
        if (!Util.isEmpty(controller_dir)) {
            generator.setController_directory(controller_dir);
            generator.setController_directory_package(controller_package);
        }
        generator.generateCode("backend/src/main/java/com/iiitb/hms/", null);
    }
}
