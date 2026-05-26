package com.shecanfoundation.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/form")
@CrossOrigin(origins = "http://localhost:5173")
public class FormController {

    public static class Form {
        public String name;
        public String email;
        public String message;

        public Form() {}

        public Form(String name, String email, String message) {
            this.name = name;
            this.email = email;
            this.message = message;
        }
    }

    @PostMapping
    public Map<String, String> submit(@RequestBody Form form) {
        // Here you could save to a database or send an email.
        return Collections.singletonMap("message", "Form Submitted Successfully");
    }
}
