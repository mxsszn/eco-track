package com.backend.app_core.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.app_core.dto.CarbonCalculationDTO;
import com.backend.app_core.model.Journey;
import com.backend.app_core.service.CarbonCalculatorService;

@RestController
@RequestMapping("/api/carbon")
public class CarbonCalculatorController {

    private final CarbonCalculatorService carbonService;

    public CarbonCalculatorController(CarbonCalculatorService carbonService) {
        this.carbonService = carbonService;
    }

    // Calculate carbon emission
    @PostMapping("/calculate")
    public ResponseEntity<CarbonCalculationDTO> calculateCarbon(@RequestBody CarbonCalculationDTO dto) {
        CarbonCalculationDTO result = carbonService.calculate(dto);
        return ResponseEntity.ok(result);
    }

    // Save a journey
    @PostMapping("/journey")
    public ResponseEntity<Journey> createJourney(@RequestBody Journey journey) {
        Journey created = carbonService.saveJourney(journey);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // Get all journeys
    @GetMapping("/journeys")
    public ResponseEntity<List<Journey>> getAllJourneys() {
        return ResponseEntity.ok(carbonService.getAllJourneys());
    }

    // Get journey by ID
    @GetMapping("/journey/{id}")
    public ResponseEntity<Journey> getJourneyById(@PathVariable Long id) {
        return ResponseEntity.ok(carbonService.getJourneyById(id));
    }

    // Update journey
    @PutMapping("/journey/{id}")
    public ResponseEntity<Journey> updateJourney(@PathVariable Long id, @RequestBody Journey journey) {
        return ResponseEntity.ok(carbonService.updateJourney(id, journey));
    }

    // Delete journey
    @DeleteMapping("/journey/{id}")
    public ResponseEntity<String> deleteJourney(@PathVariable Long id) {
        carbonService.deleteJourney(id);
        return ResponseEntity.ok("Journey deleted successfully");
    }
}
