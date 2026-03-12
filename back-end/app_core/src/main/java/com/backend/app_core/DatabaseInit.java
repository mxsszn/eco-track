package com.backend.app_core;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.backend.app_core.model.*;
import com.backend.app_core.repository.*;

@Component
public class DatabaseInit implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private User_preferenceRepository user_preferenceRepository;
    @Autowired
    private User_achievementRepository user_achievementRepository;
    @Autowired
    private Transport_modeRepository transport_modeRepository;
    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private TierRepository tierRepository;
    @Autowired
    private Saved_routeRepository saved_routeRepository;
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private JourneyRepository journeyRepository;
    @Autowired
    private Content_itemRepository content_itemRepository;
    @Autowired
    private AchievementRepository achievementRepository;

    @Override
    public void run(String... args) throws Exception {

        User testUser = new User("testemail@sample.com", "testusername", "superhashedpassword");
        userRepository.save(testUser);

        Topic transport = new Topic("Transport");
        Topic energy = new Topic("Energy");
        Topic climate = new Topic("Climate");
        topicRepository.save(transport);
        topicRepository.save(energy);
        topicRepository.save(climate);

        content_itemRepository.save(new Content_item("Electric Buses Cut City Emissions by 40%",
                "Cities adopting electric buses have reduced transport emissions by 40% over five years.", transport));
        content_itemRepository.save(new Content_item("Cycling Infrastructure Boom Across Europe",
                "European cities are investing billions in cycling lanes to reduce car dependency.", transport));
        content_itemRepository.save(new Content_item("Solar Panel Costs Hit All-Time Low",
                "The cost of solar panels has dropped 90% in the last decade.", energy));
        content_itemRepository.save(new Content_item("Arctic Ice Reaches Record Low",
                "Scientists report Arctic sea ice has reached its lowest recorded level.", climate));
        content_itemRepository.save(new Content_item("Carbon Capture Technology Advances",
                "New carbon capture tech can remove CO2 directly from the atmosphere.", climate));

        user_preferenceRepository.save(new User_preference(testUser, transport));
        user_preferenceRepository.save(new User_preference(testUser, energy));
    }

}
