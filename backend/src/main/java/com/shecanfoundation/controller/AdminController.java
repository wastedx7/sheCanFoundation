package com.shecanfoundation.controller;

import com.shecanfoundation.entitiy.DataEntity;
import com.shecanfoundation.io.AdminLoginRequestDto;
import com.shecanfoundation.io.AdminLoginResponseDto;
import com.shecanfoundation.repository.DataRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private static final String ADMIN_USERNAME = "admin";
    private static final String ADMIN_PASSWORD = "admin123";

    // Simple in-memory token store.
    private final Set<String> validTokens = ConcurrentHashMap.newKeySet();

    private final DataRepository dataRepository;

    public AdminController(DataRepository dataRepository) {
        this.dataRepository = dataRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginRequestDto request) {
        if (request == null
                || request.getUsername() == null
                || request.getPassword() == null
                || !ADMIN_USERNAME.equals(request.getUsername())
                || !ADMIN_PASSWORD.equals(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        String token = UUID.randomUUID().toString();
        validTokens.add(token);

        return ResponseEntity.ok(new AdminLoginResponseDto(token));
    }

    @GetMapping("/messages")
    public ResponseEntity<?> getAllMessages(
            @RequestHeader(name = "X-Admin-Token", required = false) String token) {

        if (token == null || !validTokens.contains(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        List<DataEntity> all = dataRepository.findAll();
        // Return only the required fields.
        return ResponseEntity.ok(all.stream().map(d -> {
            DataEntity dto = DataEntity.builder()
                    .id(d.getId())
                    .name(d.getName())
                    .email(d.getEmail())
                    .message(d.getMessage())
                    .build();
            return dto;
        }).toList());
    }
}

