package com.backend.app_core.service;

import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import com.backend.app_core.model.Journey;
import com.backend.app_core.dto.ProfileDTO;
import com.backend.app_core.repository.JourneyRepository;
import com.backend.app_core.repository.ProfileRepository;
import com.backend.app_core.repository.UserRepository;
import com.backend.app_core.model.Profile;
import java.util.List;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.DayOfWeek;
import java.util.Date;
import com.backend.app_core.model.User;


@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final JourneyRepository journeyRepository;
    private final UserRepository userRepository;

    public ProfileService(ProfileRepository profileRepository, JourneyRepository journeyRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.journeyRepository = journeyRepository;
        this.userRepository = userRepository;
    }

    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public ProfileDTO getProfileData(Long userId) {
        Profile profile = profileRepository.findByUserId(userId)
        .orElseThrow(() -> new RuntimeException("Profile with user ID " + userId + " does not exist."));

        String profileUsername = profile.getDisplay_name();
        String bio = profile.getBio();
        String profileImageURL = profile.getProfile_image_url();
        String tier = profile.getTier().getTier_name();

        int totalPoints = profile.getTotal_points();
        Float totalCo2Saved = profile.getTotal_co2_saved();
        boolean privateProfile = profile.isPrivate_profile();

        LocalDate today = LocalDate.now();
        Date now = Date.from(today.atStartOfDay(ZoneId.systemDefault()).toInstant());


        Date startOfMonth = getStartOfMonth(today);
        Date endOfMonth = getEndOfMonth(today);
        Date startOfWeek = getStartOfWeek(today);
        Date endOfWeek = getEndOfWeek(today);
        User user = userRepository.findUserById(userId); 
        Date creationDate = user.getCreated_at();
        
        double mostCo2SavedThisWeek = 0;
        double mostCo2SavedThisMonth = 0;
        double mostCo2SavedAlltime = 0;

        try {
            Journey WeeklyRecordJourney = journeyRepository.findJourneyWithHighestCo2SavedByIdAndDateRange(userId, startOfWeek, endOfWeek).orElseThrow(() -> new RuntimeException("No Journeys found between " + startOfWeek + " and " + endOfWeek));
            mostCo2SavedThisWeek = WeeklyRecordJourney.getCo2_saved();
        } catch (Exception e) {

        }

        try {
            Journey MonthlyRecordJourney = journeyRepository.findJourneyWithHighestCo2SavedByIdAndDateRange(userId, startOfMonth, endOfMonth).orElseThrow(() -> new RuntimeException("No Journeys found between " + startOfWeek + " and " + endOfWeek));
            mostCo2SavedThisMonth = MonthlyRecordJourney.getCo2_saved();
            
        } catch (Exception e) {

        }

        try {
            Journey AlltimeRecordJourney = journeyRepository.findJourneyWithHighestCo2SavedByIdAndDateRange(userId, creationDate, now).orElseThrow(() -> new RuntimeException("No Journeys found between " + startOfWeek + " and " + endOfWeek));
            mostCo2SavedAlltime = AlltimeRecordJourney.getCo2_saved();
            
        } catch (Exception e) {

        }

        return new ProfileDTO(
            profileUsername,
            bio,
            profileImageURL,
            tier,
            totalPoints,
            totalCo2Saved,
            privateProfile,
            mostCo2SavedThisWeek,
            mostCo2SavedThisMonth,
            mostCo2SavedAlltime
        );

    }












    private Date getStartOfMonth(LocalDate today) {
        today = today.withDayOfMonth(1);
        Date date = Date.from(today.atStartOfDay(ZoneId.systemDefault()).toInstant());
        return date;
    }

    private Date getEndOfMonth(LocalDate today) {
        today = today.withDayOfMonth(today.lengthOfMonth());
        Date date = Date.from(today.atStartOfDay(ZoneId.systemDefault()).toInstant());
        return date;
    }

    private Date getStartOfWeek(LocalDate today) {
        today = today.with(DayOfWeek.MONDAY);
        Date date = Date.from(today.atStartOfDay(ZoneId.systemDefault()).toInstant());
        return date;
    }

        private Date getEndOfWeek(LocalDate today) {
        today = today.with(DayOfWeek.SUNDAY);
        Date date = Date.from(today.atStartOfDay(ZoneId.systemDefault()).toInstant());
        return date;
    }
    
}
