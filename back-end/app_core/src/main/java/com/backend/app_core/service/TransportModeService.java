package com.backend.app_core.service;

import com.backend.app_core.dto.TransportModeResponseDto;
import com.backend.app_core.model.Transport_mode;
import com.backend.app_core.repository.Transport_modeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TransportModeService {

    private final Transport_modeRepository transportModeRepository;

    public TransportModeService(Transport_modeRepository transportModeRepository) {
        this.transportModeRepository = transportModeRepository;
    }

    public List<TransportModeResponseDto> getAllTransportModes() {
        List<TransportModeResponseDto> response = new ArrayList<>();
        for (Transport_mode mode : transportModeRepository.findAll()) {
            response.add(mapToDto(mode));
        }
        return response;
    }

    private TransportModeResponseDto mapToDto(Transport_mode mode) {
        TransportModeResponseDto dto = new TransportModeResponseDto();
        dto.setTransport_mode_id(mode.getTransport_mode_id());
        dto.setMode_name(mode.getMode_name());
        dto.setCo2_factor_per_km(mode.getCo2_factor_per_km());
        dto.setIs_baseline(mode.isIs_baseline());
        return dto;
    }
}