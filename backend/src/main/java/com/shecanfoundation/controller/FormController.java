package com.shecanfoundation.controller;

import com.shecanfoundation.io.FormRequestDto;
import com.shecanfoundation.io.FormResponseDto;
import com.shecanfoundation.service.FormService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/form")
@CrossOrigin(origins = "http://localhost:5173")
public class FormController {

    private final FormService formService;

    public FormController(FormService formService) {
        this.formService = formService;
    }

    @PostMapping
    public FormResponseDto submit(@RequestBody FormRequestDto form) {
        return formService.submit(form);
    }
}

