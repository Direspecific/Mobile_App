package com.example.voter.controller;

import com.example.voter.model.Voter;
import com.example.voter.service.VoterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/voters")
@CrossOrigin
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
    public Voter create(@RequestBody Voter voter) {
        return voterService.create(voter);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        voterService.delete(id);
    }

    // search endpoint
    @GetMapping("/search")
    public List<Voter> search(@RequestParam String name) {
        return voterService.searchByLastName(name);
    }
}