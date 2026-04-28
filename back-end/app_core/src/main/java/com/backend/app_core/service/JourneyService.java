package com.backend.app_core.service;

import com.backend.app_core.dto.JourneyRequestDto;
import com.backend.app_core.dto.JourneyResponseDto;
import com.backend.app_core.model.Achievement;
import com.backend.app_core.model.Journey;
import com.backend.app_core.model.Transport_mode;
import com.backend.app_core.model.User;
import com.backend.app_core.model.User_achievement;
import com.backend.app_core.repository.AchievementRepository;
import com.backend.app_core.repository.JourneyRepository;
import com.backend.app_core.repository.Transport_modeRepository;
import com.backend.app_core.repository.UserRepository;
import com.backend.app_core.repository.User_achievementRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class JourneyService {

    private final JourneyRepository journeyRepository;
    private final UserRepository userRepository;
    private final Transport_modeRepository transportModeRepository;
    private final AchievementRepository achievementRepository;
    private final User_achievementRepository userAchievementRepository;

    public JourneyService(JourneyRepository journeyRepository,
                          UserRepository userRepository,
                          Transport_modeRepository transportModeRepository,
                          AchievementRepository achievementRepository,
                          User_achievementRepository userAchievementRepository) {
        this.journeyRepository = journeyRepository;
        this.userRepository = userRepository;
        this.transportModeRepository = transportModeRepository;
        this.achievementRepository = achievementRepository;
        this.userAchievementRepository = userAchievementRepository;
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

        checkAndAwardAchievements(user, request.getUser_id());

        return mapToDto(saved);
    }

    public void deleteJourney(Long journeyId) {
        if (!journeyRepository.existsById(journeyId)) {
            throw new RuntimeException("Journey not found");
        }
        journeyRepository.deleteById(journeyId);
    }

    private void checkAndAwardAchievements(User user, Long userId) {
        List<Journey> allJourneys = journeyRepository.findAllJourneysForUserId(userId);
        List<Achievement> allAchievements = achievementRepository.findAll();

        int journeyCount = allJourneys.size();
        float totalCo2Saved = 0f;
        int totalPoints = 0;

        for (Journey j : allJourneys) {
            totalCo2Saved += j.getCo2_saved();
            totalPoints += j.getPoints_awarded();
        }

        for (Achievement achievement : allAchievements) {
            boolean alreadyEarned = userAchievementRepository
                    .existsByUserAndAchievement(userId, achievement.getAchievement_id());
            if (alreadyEarned) continue;

            boolean earned = false;
            String criteria = achievement.getCriteria_type();
            int threshold = achievement.getCriteria_value();

            if ("journey_count".equals(criteria) && journeyCount >= threshold) {
                earned = true;
            } else if ("co2_saved".equals(criteria) && totalCo2Saved >= threshold) {
                earned = true;
            } else if ("points".equals(criteria) && totalPoints >= threshold) {
                earned = true;
            }

            if (earned) {
                User_achievement ua = new User_achievement();
                ua.setUser(user);
                ua.setAchievement(achievement);
                ua.setEarned_at(new Date());
                userAchievementRepository.save(ua);
                System.out.println("🏆 Achievement unlocked: " + achievement.getAchievement_name());
            }
        }
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