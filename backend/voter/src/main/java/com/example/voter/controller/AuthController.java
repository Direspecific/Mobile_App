package com.example.voter.controller;

import com.example.voter.dto.AuthResponse;
import com.example.voter.dto.LoginRequest;
import com.example.voter.dto.RegisterRequest;
import com.example.voter.dto.VerifyOtpRequest;
import com.example.voter.model.User;
import com.example.voter.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody VerifyOtpRequest request) {
        return authService.verifyOtp(request);
    }

    @PostMapping("/resend-otp")
    public String resendOtp(@RequestParam String email) {
        return authService.resendOtp(email);
    }
}
