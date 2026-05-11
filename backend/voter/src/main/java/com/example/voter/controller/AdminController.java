package com.example.voter.controller;

import com.example.voter.model.User;
import com.example.voter.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/pending")
    public List<User> getPendingUsers() {
        return adminService.getPendingUsers();
    }

    @PutMapping("/approve/{id}")
    public User approve(@PathVariable String id) {
        return adminService.approve(id);
    }

    @PutMapping("/reject/{id}")
    public User reject(@PathVariable String id) {
        return adminService.reject(id);
    }
}