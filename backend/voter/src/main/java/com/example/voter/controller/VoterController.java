package com.example.voter.controller;

import com.example.voter.dto.VoterRequest;
import com.example.voter.model.Voter;
import com.example.voter.service.VoterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/voters")
public class VoterController {

    private final VoterService voterService;

    public VoterController(VoterService voterService) {
        this.voterService = voterService;
    }

    @GetMapping
    public List<Voter> getAll() {
        return voterService.getAll();
    }

    @GetMapping("/{id}")
    public Voter getById(@PathVariable String id) {
        return voterService.getById(id);
    }

    @PostMapping
    public Voter create(@RequestBody VoterRequest request) {
        return voterService.create(
            request.getVoter(),
            request.getUserId()
        );
    }

    @PutMapping("/{id}")
    public Voter update(@PathVariable String id,@RequestBody Voter voter) {
        return voterService.update(id, voter);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        voterService.delete(id);
    }

    @GetMapping("/search")
    public List<Voter> search(@RequestParam String lastName) {
        return voterService.searchByLastName(lastName);
    }
}
