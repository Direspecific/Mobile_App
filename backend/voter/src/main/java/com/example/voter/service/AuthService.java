package com.example.voter.service;

import com.example.voter.dto.AuthResponse;
import com.example.voter.dto.LoginRequest;
import com.example.voter.dto.RegisterRequest;
import com.example.voter.dto.VerifyOtpRequest;
import com.example.voter.model.Status;
import com.example.voter.model.User;
import com.example.voter.repository.UserRepository;
import com.example.voter.security.JwtUtil;
import com.example.voter.utils.OTPGenerator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

@Service
public class AuthService {

    private static final Duration OTP_TTL = Duration.ofMinutes(10);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       EmailService emailService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.emailService = emailService;
    }

    public User register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");
        user.setStatus(Status.UNREGISTERED);
        user.setEnabled(false);
        user.setOtpVerified(false);
        setNewOtp(user);

        User savedUser = userRepository.save(user);
        emailService.sendOtp(savedUser.getEmail(), savedUser.getOtpCode());

        return savedUser;
    }

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        if (!user.isOtpVerified() && user.getOtpCode() != null) {
            throw new RuntimeException("Please verify your OTP before logging in");
        }

        if (!user.isEnabled()) {
            throw new RuntimeException("Account is disabled or pending approval");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        return new AuthResponse(
                token,
                user.getId(),
                user.getEmail(),
                user.getRole(),
                user.getStatus()
        );
    }

    public String verifyOtp(VerifyOtpRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.isOtpVerified()) {
            return "OTP already verified";
        }

        if (user.getOtpCode() == null || user.getOtpExpiresAt() == null) {
            throw new RuntimeException("No OTP found. Please request a new OTP");
        }

        if (Instant.now().isAfter(user.getOtpExpiresAt())) {
            throw new RuntimeException("OTP has expired. Please request a new OTP");
        }

        if (!user.getOtpCode().equals(request.getOtp())) {
            throw new RuntimeException("Invalid OTP");
        }

        user.setOtpVerified(true);
        user.setEnabled(true);
        user.setOtpCode(null);
        user.setOtpExpiresAt(null);

        userRepository.save(user);

        return "OTP verified successfully";
    }

    public String resendOtp(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.isOtpVerified()) {
            return "OTP already verified";
        }

        setNewOtp(user);
        User savedUser = userRepository.save(user);
        emailService.sendOtp(savedUser.getEmail(), savedUser.getOtpCode());

        return "OTP sent successfully";
    }

    private void setNewOtp(User user) {
        user.setOtpCode(OTPGenerator.generateOTP());
        user.setOtpExpiresAt(Instant.now().plus(OTP_TTL));
    }
}
