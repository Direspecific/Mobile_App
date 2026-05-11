package com.example.voter.dto;

import com.example.voter.model.Voter;
import lombok.Data;

@Data
public class VoterRequest {
    private Voter voter;
    private String userId;
}