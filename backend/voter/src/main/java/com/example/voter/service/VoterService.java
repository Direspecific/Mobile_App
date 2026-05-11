package com.example.voter.service;

import com.example.voter.model.Status;
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

    // =========================
    // GET ALL VOTERS
    // =========================
    public List<Voter> getAll() {
        return voterRepository.findAll();
    }

    // =========================
    // GET VOTER BY ID
    // =========================
    public Voter getById(String id) {

        return voterRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Voter not found"));
    }

    // =========================
    // CREATE VOTER
    // =========================
    public Voter create(Voter voter, String userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        voter.setUserId(user.getId());

        Voter savedVoter = voterRepository.save(voter);

        user.setStatus(Status.PENDING);
        user.setEnabled(false);

        userRepository.save(user);

        return savedVoter;
    }

    // =========================
    // UPDATE VOTER
    // =========================
    public Voter update(String id, Voter updatedVoter) {

        return voterRepository.findById(id)
                .map(voter -> {

                    // PERSONAL INFO
                    voter.setFirstName(updatedVoter.getFirstName());
                    voter.setLastName(updatedVoter.getLastName());
                    voter.setMiddleName(updatedVoter.getMiddleName());
                    voter.setSuffix(updatedVoter.getSuffix());

                    // DEMOGRAPHICS
                    voter.setAddress(updatedVoter.getAddress());
                    voter.setCitizenship(updatedVoter.getCitizenship());
                    voter.setCivilStatus(updatedVoter.getCivilStatus());
                    voter.setSex(updatedVoter.getSex());

                    // BIRTH INFO
                    voter.setDateOfBirth(updatedVoter.getDateOfBirth());
                    voter.setPlaceOfBirth(updatedVoter.getPlaceOfBirth());

                    // RESIDENCY
                    voter.setResidence(updatedVoter.getResidence());

                    // FLAGS
                    voter.setFlags(updatedVoter.getFlags());

                    // PWD
                    voter.setPwdDetails(updatedVoter.getPwdDetails());
                    voter.setAccessiblePolling(
                            updatedVoter.isAccessiblePolling()
                    );

                    // FAMILY
                    voter.setParents(updatedVoter.getParents());

                    // CONTACT
                    voter.setEmail(updatedVoter.getEmail());

                    return voterRepository.save(voter);
                })
                .orElseThrow(() ->
                        new RuntimeException("Voter not found"));
    }

    // =========================
    // DELETE VOTER
    // =========================
    public void delete(String id) {

        if (!voterRepository.existsById(id)) {
            throw new RuntimeException("Voter not found");
        }

        voterRepository.deleteById(id);
    }

    // =========================
    // SEARCH BY LAST NAME
    // =========================
    public List<Voter> searchByLastName(String name) {

        return voterRepository
                .findByLastNameContainingIgnoreCase(name);
    }

}
