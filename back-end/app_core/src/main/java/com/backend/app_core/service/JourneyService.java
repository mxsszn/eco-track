package com.backend.app_core.service;

import com.backend.app_core.dto.JourneyRequestDto;
import com.backend.app_core.dto.JourneyResponseDto;
import com.backend.app_core.model.Journey;
import com.backend.app_core.model.Transport_mode;
import com.backend.app_core.model.User;
import com.backend.app_core.repository.JourneyRepository;
import com.backend.app_core.repository.Transport_modeRepository;
import com.backend.app_core.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class JourneyService {

    private final JourneyRepository journeyRepository;
    private final UserRepository userRepository;
    private final Transport_modeRepository transportModeRepository;

    public JourneyService(JourneyRepository journeyRepository,
                          UserRepository userRepository,
                          Transport_modeRepository transportModeRepository) {
        this.journeyRepository = journeyRepository;
        this.userRepository = userRepository;
        this.transportModeRepository = transportModeRepository;
    }

    public List<JourneyResponseDto> getRecentJourneysByUserId(Long userId) {
        List<Journey> journeys = journeyRepository.findRecentJourneysByUserId(userId);
        List<JourneyResponseDto> response = new ArrayList<>();
        for (Journey journey : journeys) {
            response.add(mapToDto(journey));
        }
        return response;
    }

    public JourneyResponseDto saveJourney(JourneyRequestDto request) {
        User user = userRepository.findById(request.getUser_id())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Transport_mode transportMode = transportModeRepository.findById(request.getTransport_mode_id())
                .orElseThrow(() -> new RuntimeException("Transport mode not found"));

        Float selectedModeEmission = request.getDistance_km() * transportMode.getCo2_factor_per_km();
        Float baselineFactor = findBaselineFactor(transportMode.getCo2_factor_per_km());
        Float co2Saved = Math.max(0f, (baselineFactor - transportMode.getCo2_factor_per_km()) * request.getDistance_km());
        Integer pointsAwarded = Math.max(0, Math.round(co2Saved * 10));

        Journey journey = new Journey(
                request.getStart_location(),
                request.getDestination(),
                request.getJourney_date(),
                request.getDistance_km(),
                selectedModeEmission,
                co2Saved,
                pointsAwarded,
                request.getRoute_geometry()
        );

        journey.setUser(user);
        journey.setTransport_mode(transportMode);
        journey.setCreated_at(new Date());
        journey.setUpdated_at(new Date());

        Journey saved = journeyRepository.save(journey);
        return mapToDto(saved);
    }

    public void deleteJourney(Long journeyId) {
        if (!journeyRepository.existsById(journeyId)) {
            throw new RuntimeException("Journey not found");
        }
        journeyRepository.deleteById(journeyId);
    }

    private Float findBaselineFactor(Float fallback) {
        for (Transport_mode mode : transportModeRepository.findAll()) {
            if (mode.isIs_baseline()) {
                return mode.getCo2_factor_per_km();
            }
        }
        return fallback;
    }

    private JourneyResponseDto mapToDto(Journey journey) {
        JourneyResponseDto dto = new JourneyResponseDto();
        dto.setJourney_id(journey.getJourney_id());

        if (journey.getUser() != null) {
            dto.setUser_id(journey.getUser().getUser_id());
            dto.setUsername(journey.getUser().getUsername());
        }

        if (journey.getTransport_mode() != null) {
            dto.setTransport_mode_id(journey.getTransport_mode().getTransport_mode_id());
            dto.setTransport_mode_name(journey.getTransport_mode().getMode_name());
        }

        dto.setStart_location(journey.getStart_location());
        dto.setDestination(journey.getDestination());
        dto.setJourney_date(journey.getJourney_date());
        dto.setDistance_km(journey.getDistance_km());
        dto.setSelected_mode_emission(journey.getSelected_mode_emission());
        dto.setCo2_saved(journey.getCo2_saved());
        dto.setPoints_awarded(journey.getPoints_awarded());
        dto.setRoute_geometry(journey.getRoute_geometry());
        dto.setCreated_at(journey.getCreated_at());
        dto.setUpdated_at(journey.getUpdated_at());

        return dto;
    }
}