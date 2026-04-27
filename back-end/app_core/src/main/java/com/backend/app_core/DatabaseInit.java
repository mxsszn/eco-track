package com.backend.app_core;

import com.backend.app_core.model.*;
import com.backend.app_core.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;

@Configuration
public class DatabaseInit {

    @Bean
    CommandLineRunner initDatabase(
            UserRepository userRepository,
            Transport_modeRepository transportModeRepository,
            TierRepository tierRepository,
            ProfileRepository profileRepository,
            JourneyRepository journeyRepository,
            AchievementRepository achievementRepository,
            User_achievementRepository userAchievementRepository
    ) {
        return args -> {

            if (tierRepository.count() == 0) {
                tierRepository.save(new Tier("Eco Starter",   0,   0,  "Just beginning the eco journey"));
                tierRepository.save(new Tier("Eco Explorer",  50,  10, "Starting to explore sustainable travel"));
                Tier tier3 = tierRepository.save(new Tier("Eco Traveller", 100, 20, "Regularly choosing greener transport"));
                tierRepository.save(new Tier("Eco Commuter",  200, 30, "Sustainable travel becoming a habit"));
                tierRepository.save(new Tier("Eco Advocate",  350, 50, "Strong commitment to eco-friendly journeys"));

                transportModeRepository.save(new Transport_mode("Car",     0.17f,  true));
                Transport_mode bus     = transportModeRepository.save(new Transport_mode("Bus",     0.089f, false));
                Transport_mode train   = transportModeRepository.save(new Transport_mode("Train",   0.041f, false));
                Transport_mode bicycle = transportModeRepository.save(new Transport_mode("Bicycle", 0.0f,   false));
                transportModeRepository.save(new Transport_mode("Walking", 0.0f,   false));

                BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                User testUser = new User("test@test.com", "testuser", encoder.encode("test123"));
                userRepository.save(testUser);

                profileRepository.save(new Profile(testUser, "Mekael", "Eco enthusiast", null, 320, 18.5f, tier3, false));

                Date now = new Date();
                journeyRepository.save(new Journey(testUser, train,   "London",   "Birmingham",     new Date(now.getTime() - 86400000L),  162.0f, 6.64f, 20.90f, 120, null));
                journeyRepository.save(new Journey(testUser, bus,     "Uxbridge", "Central London", new Date(now.getTime() - 259200000L), 24.0f,  2.14f, 1.94f,  80,  null));
                journeyRepository.save(new Journey(testUser, bicycle, "Ealing",   "Hammersmith",    new Date(now.getTime() - 432000000L), 5.5f,   0.0f,  0.94f,  50,  null));

                Achievement a1 = achievementRepository.save(new Achievement("First Journey", "Log your first journey", "journey_count", 1,   10,  "🌱"));
                Achievement a2 = achievementRepository.save(new Achievement("5 Journeys",    "Log 5 journeys",         "journey_count", 5,   25,  "🚶"));
                Achievement a3 = achievementRepository.save(new Achievement("CO2 Saver",     "Save 10kg of CO2",       "co2_saved",     10,  50,  "🌍"));
                Achievement a4 = achievementRepository.save(new Achievement("Eco Commuter",  "Earn 100 points",        "points",        100, 30,  "🚌"));
                Achievement a5 = achievementRepository.save(new Achievement("Green Hero",    "Save 50kg of CO2",       "co2_saved",     50,  100, "🏆"));

                userAchievementRepository.save(new User_achievement(testUser, a1, new Date(now.getTime() - 432000000L)));
                userAchievementRepository.save(new User_achievement(testUser, a4, new Date(now.getTime() - 172800000L)));

                System.out.println("✅ Database seeded successfully!");
            }

            if (transportModeRepository.count() == 0) {
                transportModeRepository.save(new Transport_mode("Car",     0.17f,  true));
                transportModeRepository.save(new Transport_mode("Bus",     0.089f, false));
                transportModeRepository.save(new Transport_mode("Train",   0.041f, false));
                transportModeRepository.save(new Transport_mode("Bicycle", 0.0f,   false));
                transportModeRepository.save(new Transport_mode("Walking", 0.0f,   false));
            }
        };
    }
}
