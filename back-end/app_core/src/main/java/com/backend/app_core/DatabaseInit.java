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


    }



    
}
