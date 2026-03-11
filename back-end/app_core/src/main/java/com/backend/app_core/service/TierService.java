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
public class TierService {
    
    private final TierRepository tierRepository;

    public TierService(TierRepository tierRepository) {
        this.tierRepository = tierRepository;
    }


    public Tier createTier(String tierName, int min_points, int points_reward, String description) {
        Tier tier = new Tier(tierName, min_points, points_reward, description);
        return tier;
    }








}
