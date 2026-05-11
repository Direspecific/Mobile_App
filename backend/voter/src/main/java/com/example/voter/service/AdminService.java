package com.example.voter.service;

import com.example.voter.model.User;
import com.example.voter.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getPendingUsers() {

        return userRepository.findAll()
                .stream()
                .filter(user -> "PENDING".equals(user.getStatus()))
                .collect(Collectors.toList());
    }

    public User approve(String id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus("VERIFIED");

        return userRepository.save(user);
    }

    public User reject(String id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus("REJECTED");

        return userRepository.save(user);
    }
}