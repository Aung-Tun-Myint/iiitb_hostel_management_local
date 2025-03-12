package com.iiitb.hms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import platform.resource.login;
import com.iiitb.hms.service.LoginService;

@Controller
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://localhost:5174"}, allowCredentials = "true")
@RequestMapping("/api/login")
class LoginController extends BaseController {
    protected boolean isLoginRequired() {
        return false;
    }
    public LoginController() {
        super(new login(),new LoginService());
    }
}
