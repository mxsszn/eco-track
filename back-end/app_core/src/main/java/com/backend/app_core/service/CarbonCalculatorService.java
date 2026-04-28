package com.backend.app_core.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.backend.app_core.dto.CarbonCalculationDTO;
import com.backend.app_core.model.Journey;
import com.backend.app_core.repository.JourneyRepository;

@Service
public class CarbonCalculatorService {

    private final JourneyRepository journeyRepository;

    public CarbonCalculatorService(JourneyRepository journeyRepository) {
        this.journeyRepository = journeyRepository;
    }

    // Emission factors
    private static final Map<String, Double> EMISSION_FACTORS = Map.of(
            "car", 0.21,
            "motorbike", 0.12,
            "bus", 0.05,
            "train", 0.04,
            "cycle", 0.01,
            "walk", 0.0);

    // -------------------------------
    // 1. Carbon Calculation
    // -------------------------------

    public CarbonCalculationDTO calculate(CarbonCalculationDTO request) {

        double factor = EMISSION_FACTORS
                .getOrDefault(request.getTransportMode().toLowerCase(), 0.0);

        double emission = request.getDistanceKm() * factor;

        CarbonCalculationDTO response = new CarbonCalculationDTO();
        response.setTransportMode(request.getTransportMode());
        response.setDistanceKm(request.getDistanceKm());
        response.setCo2Kg(emission);

        return response;
    }

    // -------------------------------
    // 2. Create Journey
    // -------------------------------

    public Journey saveJourney(Journey journey) {
        return journeyRepository.save(journey);
    }

    // -------------------------------
    // 3. Get All Journeys
    // -------------------------------

    public List<Journey> getAllJourneys() {
        return journeyRepository.findAll();
    }

    // -------------------------------
    // 4. Get Journey By ID
    // -------------------------------

    public Journey getJourneyById(Long id) {
        return journeyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Journey not found"));
    }

    // -------------------------------
    // 5. Update Journey
    // -------------------------------

    public Journey updateJourney(Long id, Journey updatedJourney) {

        Journey journey = journeyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Journey not found"));

        journey.setStart_location(updatedJourney.getStart_location());
        journey.setDestination(updatedJourney.getDestination());
        journey.setDistance_km(updatedJourney.getDistance_km());
        journey.setTransport_mode(updatedJourney.getTransport_mode());

        return journeyRepository.save(journey);
    }

    // -------------------------------
    // 6. Delete Journey
    // -------------------------------

    public void deleteJourney(Long id) {

        Journey journey = journeyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Journey not found"));

        journeyRepository.delete(journey);
    }
}