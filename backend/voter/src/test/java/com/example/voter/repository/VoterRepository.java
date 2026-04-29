package com.example.voter.repository;

import com.example.voter.model.Voter;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface VoterRepository extends MongoRepository<Voter, String> {

    // search feature (future use)
    List<Voter> findByLastNameContainingIgnoreCase(String lastName);
}