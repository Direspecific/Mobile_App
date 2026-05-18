package com.example.voter.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String email;
    @JsonIgnore
    private String password;
    private String role;
    private Status status;
    private boolean enabled;
    private boolean otpVerified;
    @JsonIgnore
    private String otpCode;
    @JsonIgnore
    private Instant otpExpiresAt;
}
