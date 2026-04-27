package com.backend.app_core.controller;

import com.backend.app_core.dto.TransportModeResponseDto;
import com.backend.app_core.service.TransportModeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class Transport_modeController {

    private final TransportModeService transportModeService;

    public Transport_modeController(TransportModeService transportModeService) {
        this.transportModeService = transportModeService;
    }

    @GetMapping("/api/transport-modes")
    public ResponseEntity<List<TransportModeResponseDto>> getAllTransportModes() {
        return ResponseEntity.ok(transportModeService.getAllTransportModes());
    }
}