package com.backend.app_core.service;

import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import com.backend.app_core.model.Journey;
import com.backend.app_core.dto.ProfileDTO;
import com.backend.app_core.repository.JourneyRepository;
import com.backend.app_core.repository.ProfileRepository;
import com.backend.app_core.repository.TierRepository;
import com.backend.app_core.repository.UserRepository;
import com.backend.app_core.model.Profile;
import java.util.List;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.DayOfWeek;
import java.util.Date;
import com.backend.app_core.model.User;
import com.backend.app_core.model.Tier;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final JourneyRepository journeyRepository;
    private final UserRepository userRepository;
    private final TierRepository tierRepository;



    public ProfileService(ProfileRepository profileRepository, JourneyRepository journeyRepository, UserRepository userRepository, TierRepository tierRepository) {
        this.profileRepository = profileRepository;
        this.journeyRepository = journeyRepository;
        this.userRepository = userRepository;
        this.tierRepository = tierRepository;
    }



    public Profile getProfileFromUser(Long userId) {
        Profile profile = profileRepository.findByUserId(userId)
        .orElseThrow(() -> new RuntimeException("No profile found for user ID " + userId));
        return profile;
    }


    public Profile createProfile(Long userId) {
        User user = userRepository.findUserById(userId);
        Tier tier = tierRepository.getDefaultTier();
        Profile profile = new Profile(user, user.getUsername(), "nothing to see here", "none", 0, 0f, tier, false);
        return profileRepository.save(profile);
    }


    public Profile updateTotalPoints(Long profileId) {
        Profile profile = profileRepository.findById(profileId)
        .orElseThrow(() -> new RuntimeException("No profile found for ID " + profileId));
        Long userId = profile.getUser().getUser_id();
        List<Journey> journeyList = journeyRepository.findAllJourneysForUserId(userId);
        int totalPoints = journeyList.stream()
        .mapToInt(Journey::getPoints_awarded).sum();

        profile.setTotal_points(totalPoints);
        return profileRepository.save(profile);
    }

    public Profile updateCo2Total(Long profileId) {
        Profile profile = profileRepository.findById(profileId)
        .orElseThrow(() -> new RuntimeException("No profile found for ID " + profileId));
        Long userId = profile.getUser().getUser_id();
          List<Journey> journeyList = journeyRepository.findAllJourneysForUserId(userId);
        float totalCo2Saved = (float) journeyList.stream()
        .mapToDouble(Journey::getCo2_saved).sum();
        profile.setTotal_co2_saved(totalCo2Saved);

        return profileRepository.save(profile);
    }

    /* */
    public Profile updateTier(Long profileId) {
        Profile profile = profileRepository.findById(profileId)
        .orElseThrow(() -> new RuntimeException("No profile found for ID " + profileId));
        Tier currentTier = profile.getTier();
        int currentTierMinPoints = currentTier.getMin_points();
        int totalPoints = profile.getTotal_points();

        Tier newTier = tierRepository.findHighestValidTier(totalPoints);
        int newTierMinPoints = newTier.getMin_points();

        if (newTierMinPoints > currentTierMinPoints) {
            profile.setTier(newTier);
            profileRepository.save(profile);
        }
        return profile;
    }


    public Profile updateProfileStats(Long profileId) {
        updateTotalPoints(profileId);
        updateCo2Total(profileId);
        return updateTier(profileId);
    }



    public Profile updateProfile(Profile updatedProfile, Long profileId) {
        Profile originalProfile = profileRepository.findById(profileId).orElseThrow(() -> new RuntimeException("No profile found for ID " + profileId));
        originalProfile.setDisplay_name(updatedProfile.getDisplay_name());
        originalProfile.setBio(updatedProfile.getBio());
        originalProfile.setPrivate_profile(updatedProfile.isPrivate_profile());
        originalProfile.setProfile_image_url(updatedProfile.getProfile_image_url());
        return profileRepository.save(originalProfile);
    }


    public void deleteProfile(Long profileId) {
        Profile profile = profileRepository.findById(profileId)
        .orElseThrow(() -> new RuntimeException("No profile found with ID " + profileId));

        profileRepository.delete(profile);
    }


    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public ProfileDTO getProfileData(Long userId) {
        Profile profile = profileRepository.findByProfileId(userId)
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
