package com.backend.app_core.controller;

import com.backend.app_core.dto.JourneyRequestDto;
import com.backend.app_core.dto.JourneyResponseDto;
import com.backend.app_core.service.JourneyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/journeys")
public class JourneyController {

    private final JourneyService journeyService;

    public JourneyController(JourneyService journeyService) {
        this.journeyService = journeyService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<JourneyResponseDto>> getJourneysByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(journeyService.getRecentJourneysByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<JourneyResponseDto> saveJourney(@Valid @RequestBody JourneyRequestDto request) {
        return ResponseEntity.ok(journeyService.saveJourney(request));
    }

    @DeleteMapping("/{journeyId}")
    public ResponseEntity<String> deleteJourney(@PathVariable Long journeyId) {
        journeyService.deleteJourney(journeyId);
        return ResponseEntity.ok("Journey deleted successfully");
    }
}