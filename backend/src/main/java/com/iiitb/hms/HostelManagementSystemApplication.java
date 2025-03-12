package com.iiitb.hms;

import com.iiitb.hms.decorators.FloorDecorator;
import com.iiitb.hms.decorators.RoomDecorator;
import com.iiitb.hms.decorators.UserDecorator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import platform.decorator.DecoratorManager;

@SpringBootApplication
//@ComponentScan(basePackages = {"controller", "platform.webservice.map", "platform.webservice.controller.base"})
@ComponentScan(basePackages = {"com.iiitb.hms.controller", "platform.webservice.map", "platform.webservice.controller.base", "com.example.demo.config", "cli", "platform.defined.account.controller"})

public class HostelManagementSystemApplication {

	public static void registerDecorators() {
		DecoratorManager.getInstance().register(new UserDecorator());
		DecoratorManager.getInstance().register(new RoomDecorator());
		DecoratorManager.getInstance().register(new FloorDecorator());
	}

	public static void main(String[] args) {
		registerDecorators();
		Registry.register();
		SpringApplication.run(HostelManagementSystemApplication.class, args);
	}
}
