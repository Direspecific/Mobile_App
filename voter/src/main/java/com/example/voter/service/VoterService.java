package com.example.voter.service;

import com.example.voter.model.User;
import com.example.voter.model.Voter;
import com.example.voter.repository.UserRepository;
import com.example.voter.repository.VoterRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoterService {

    private final VoterRepository voterRepository;
    private final UserRepository userRepository;

    public VoterService(VoterRepository voterRepository,
                        UserRepository userRepository) {
        this.voterRepository = voterRepository;
        this.userRepository = userRepository;
    }

    // GET all voters
    public List<Voter> getAll() {
        return voterRepository.findAll();
    }

    // GET voter by ID
    public Voter getById(String id) {
        return voterRepository.findById(id).orElse(null);
    }

    // CREATE voter + set user status to PENDING
    public Voter create(Voter voter) {

        Voter savedVoter = voterRepository.save(voter);

        User user = userRepository.findById(voter.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus("PENDING");
        userRepository.save(user);

        return savedVoter;
    }

    // UPDATE voter info
    public Voter update(String id, Voter updatedVoter) {

        return voterRepository.findById(id)
                .map(voter -> {

                    voter.setFirstName(updatedVoter.getFirstName());
                    voter.setLastName(updatedVoter.getLastName());
                    voter.setMiddleName(updatedVoter.getMiddleName());
                    voter.setSuffix(updatedVoter.getSuffix());

                    voter.setAddress(updatedVoter.getAddress());
                    voter.setCitizenship(updatedVoter.getCitizenship());
                    voter.setCivilStatus(updatedVoter.getCivilStatus());
                    voter.setSex(updatedVoter.getSex());

                    voter.setDateOfBirth(updatedVoter.getDateOfBirth());
                    voter.setPlaceOfBirth(updatedVoter.getPlaceOfBirth());

                    voter.setResidence(updatedVoter.getResidence());
                    voter.setFlags(updatedVoter.getFlags());

                    voter.setPwdDetails(updatedVoter.getPwdDetails());
                    voter.setAccessiblePolling(updatedVoter.isAccessiblePolling());

                    voter.setParents(updatedVoter.getParents());
                    voter.setEmail(updatedVoter.getEmail());

                    return voterRepository.save(voter);
                })
                .orElseThrow(() -> new RuntimeException("Voter not found"));
    }

    // DELETE voter
    public void delete(String id) {
        voterRepository.deleteById(id);
    }

    // 🔥 FIXED: SEARCH by last name
    public List<Voter> searchByLastName(String name) {
        return voterRepository.findByLastNameContainingIgnoreCase(name);
    }
}