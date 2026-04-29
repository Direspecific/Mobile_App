package com.example.voter.service;

import com.example.voter.model.Voter;
import com.example.voter.repository.VoterRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoterService {

    private final VoterRepository voterRepository;

    public VoterService(VoterRepository voterRepository) {
        this.voterRepository = voterRepository;
    }

    public List<Voter> getAll() {
        return voterRepository.findAll();
    }

    public Voter getById(String id) {
        return voterRepository.findById(id).orElse(null);
    }

    public Voter create(Voter voter) {
        return voterRepository.save(voter);
    }

    public void delete(String id) {
        voterRepository.deleteById(id);
    }

    public List<Voter> searchByLastName(String name) {
        return voterRepository.findByLastNameContainingIgnoreCase(name);
    }
}