package com.backend.app_core.controller;

import com.backend.app_core.dto.SavedRouteRequestDto;
import com.backend.app_core.dto.SavedRouteResponseDto;
import com.backend.app_core.service.Saved_routeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/saved-routes")
public class Saved_routeController {

    private final Saved_routeService savedRouteService;

    public Saved_routeController(Saved_routeService savedRouteService) {
        this.savedRouteService = savedRouteService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<SavedRouteResponseDto>> getSavedRoutesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(savedRouteService.getSavedRoutesByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<SavedRouteResponseDto> saveSavedRoute(@Valid @RequestBody SavedRouteRequestDto request) {
        return ResponseEntity.ok(savedRouteService.saveSavedRoute(request));
    }

    @DeleteMapping("/{savedRouteId}")
    public ResponseEntity<String> deleteSavedRoute(@PathVariable Long savedRouteId) {
        savedRouteService.deleteSavedRoute(savedRouteId);
        return ResponseEntity.ok("Saved route deleted successfully");
    }
}