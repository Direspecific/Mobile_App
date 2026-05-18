package com.example.voter.repository;

import com.example.voter.model.Voter;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface VoterRepository extends MongoRepository<Voter, String> {

    List<Voter> findByLastNameContainingIgnoreCase(String lastName);

    Optional<Voter> findByUserId(String userId);
}
