package com.backend.app_core.service;

import com.backend.app_core.dto.SavedRouteRequestDto;
import com.backend.app_core.dto.SavedRouteResponseDto;
import com.backend.app_core.model.Saved_route;
import com.backend.app_core.model.Transport_mode;
import com.backend.app_core.model.User;
import com.backend.app_core.repository.Saved_routeRepository;
import com.backend.app_core.repository.Transport_modeRepository;
import com.backend.app_core.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class Saved_routeService {

    private final Saved_routeRepository savedRouteRepository;
    private final UserRepository userRepository;
    private final Transport_modeRepository transportModeRepository;

    public Saved_routeService(Saved_routeRepository savedRouteRepository,
                              UserRepository userRepository,
                              Transport_modeRepository transportModeRepository) {
        this.savedRouteRepository = savedRouteRepository;
        this.userRepository = userRepository;
        this.transportModeRepository = transportModeRepository;
    }

    public List<SavedRouteResponseDto> getSavedRoutesByUserId(Long userId) {
        List<Saved_route> routes = savedRouteRepository.findSavedRoutesByUserId(userId);
        List<SavedRouteResponseDto> response = new ArrayList<>();
        for (Saved_route route : routes) {
            response.add(mapToDto(route));
        }
        return response;
    }

    public SavedRouteResponseDto saveSavedRoute(SavedRouteRequestDto request) {
        User user = userRepository.findById(request.getUser_id())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Transport_mode transportMode = transportModeRepository.findById(request.getTransport_mode_id())
                .orElseThrow(() -> new RuntimeException("Transport mode not found"));

        Optional<Saved_route> existingRoute = savedRouteRepository.findExistingSavedRoute(
                request.getUser_id(),
                request.getTransport_mode_id(),
                request.getStart_location(),
                request.getDestination()
        );

        Saved_route savedRoute;

        if (existingRoute.isPresent()) {
            savedRoute = existingRoute.get();
            savedRoute.setLast_distance_km(request.getLast_distance_km());
            savedRoute.setTimes_used(savedRoute.getTimes_used() + 1);
            savedRoute.setLast_used_at(new Date());
        } else {
            savedRoute = new Saved_route(
                    user,
                    transportMode,
                    request.getStart_location(),
                    request.getDestination(),
                    request.getLast_distance_km(),
                    1,
                    new Date()
            );
            savedRoute.setCreated_at(new Date());
        }

        Saved_route saved = (Saved_route) savedRouteRepository.save(savedRoute);
        return mapToDto(saved);
    }

    public void deleteSavedRoute(Long savedRouteId) {
        if (!savedRouteRepository.existsById(savedRouteId)) {
            throw new RuntimeException("Saved route not found");
        }
        savedRouteRepository.deleteById(savedRouteId);
    }

    private SavedRouteResponseDto mapToDto(Saved_route route) {
        SavedRouteResponseDto dto = new SavedRouteResponseDto();
        dto.setSaved_route_id(route.getSaved_route_id());

        if (route.getUser() != null) {
            dto.setUser_id(route.getUser().getUser_id());
            dto.setUsername(route.getUser().getUsername());
        }

        if (route.getTransport_mode() != null) {
            dto.setTransport_mode_id(route.getTransport_mode().getTransport_mode_id());
            dto.setTransport_mode_name(route.getTransport_mode().getMode_name());
        }

        dto.setStart_location(route.getStart_location());
        dto.setDestination(route.getDestination());
        dto.setLast_distance_km(route.getLast_distance_km());
        dto.setTimes_used(route.getTimes_used());
        dto.setLast_used_at(route.getLast_used_at());
        dto.setCreated_at(route.getCreated_at());

        return dto;
    }
}