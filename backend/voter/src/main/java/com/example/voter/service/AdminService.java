package com.example.voter.service;

import com.example.voter.model.Status;
import com.example.voter.model.User;
import com.example.voter.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getPendingUsers() {

        return userRepository.findByStatus(Status.PENDING);
    }

    public User approve(String id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus(Status.VERIFIED);
        user.setEnabled(true);

        return userRepository.save(user);
    }

    public User reject(String id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus(Status.REJECTED);
        user.setEnabled(false);

        return userRepository.save(user);
    }
}
