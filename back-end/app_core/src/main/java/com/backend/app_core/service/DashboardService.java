package com.backend.app_core.service;

import com.backend.app_core.dto.DashboardDTO;
import com.backend.app_core.dto.RecentJourneyDTO;
import com.backend.app_core.dto.WeeklyPointsDTO;
import com.backend.app_core.model.Journey;
import com.backend.app_core.model.Profile;
import com.backend.app_core.repository.JourneyRepository;
import com.backend.app_core.repository.ProfileRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class DashboardService {

    private final ProfileRepository profileRepository;
    private final JourneyRepository journeyRepository;

    public DashboardService(ProfileRepository profileRepository, JourneyRepository journeyRepository) {
        this.profileRepository = profileRepository;
        this.journeyRepository = journeyRepository;
    }

    public DashboardDTO getDashboardData(Long userId) {
        // 1. Find profile
        Profile profile = profileRepository.findByUser_UserId(userId)
                .orElseThrow(() -> new RuntimeException("Profile not found for user id: " + userId));

        // 2. Get start and end of current week
        Date startOfWeek = getStartOfWeek();
        Date endOfWeek = getEndOfWeek();

        // 3. Get weekly journeys
        List<Journey> weeklyJourneys = journeyRepository
                .findByUser_UserIdAndJourneyDateBetween(userId, startOfWeek, endOfWeek);

        // 4. Weekly totals
        int weeklyJourneysCount = weeklyJourneys.size();

        int weeklyPoints = weeklyJourneys.stream()
                .mapToInt(journey -> journey.getPoints_awarded())
                .sum();

        float weeklyCo2Saved = 0;
        for (Journey journey : weeklyJourneys) {
            weeklyCo2Saved += journey.getCo2_saved();
        }

        // 5. Weekly chart data
        List<WeeklyPointsDTO> weeklyPointsChart = buildWeeklyPointsChart(weeklyJourneys);

        // 6. Recent 3 journeys
        List<Journey> recentJourneys = journeyRepository.findTop3ByUser_UserIdOrderByJourneyDateDesc(userId);

        List<RecentJourneyDTO> recentJourneyDTOs = new ArrayList<>();
        for (Journey journey : recentJourneys) {
            recentJourneyDTOs.add(new RecentJourneyDTO(
                    journey.getStart_location(),
                    journey.getDestination(),
                    journey.getDistance_km(),
                    journey.getJourney_date(),
                    journey.getTransport_mode().getMode_name()
            ));
        }

        // 7. Tier name
        String tierName = null;
        if (profile.getTier() != null) {
            tierName = profile.getTier().getTier_name();
        }

        // 8. Return DTO
        return new DashboardDTO(
                profile.getDisplay_name(),
                tierName,
                weeklyCo2Saved,
                weeklyJourneysCount,
                weeklyPoints,
                weeklyPointsChart,
                recentJourneyDTOs
        );
    }

    private List<WeeklyPointsDTO> buildWeeklyPointsChart(List<Journey> weeklyJourneys) {
        List<WeeklyPointsDTO> chart = new ArrayList<>();

        String[] dayLabels = {"Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"};
        int[] pointsPerDay = new int[7];

        Calendar calendar = Calendar.getInstance();

        for (Journey journey : weeklyJourneys) {
            calendar.setTime(journey.getJourney_date());

            int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);

            // Java Calendar: Sunday=1, Monday=2, ..., Saturday=7
            int index;
            if (dayOfWeek == Calendar.SUNDAY) {
                index = 6;
            } else {
                index = dayOfWeek - 2;
            }

            pointsPerDay[index] += journey.getPoints_awarded();
        }

        for (int i = 0; i < 7; i++) {
            chart.add(new WeeklyPointsDTO(dayLabels[i], pointsPerDay[i]));
        }

        return chart;
    }

    private Date getStartOfWeek() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    private Date getEndOfWeek() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        return calendar.getTime();
    }
}