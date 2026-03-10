package com.backend.app_core;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.backend.app_core.model.*;
import com.backend.app_core.repository.*;
import java.util.Date;


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

        userRepository.deleteAll();
        profileRepository.deleteAll();


        User testUser = new User("testemail@sample.com", "testusername", "superhashedpassword");
        userRepository.save(testUser);

        Tier testTier = new Tier("placeholder tier", 10, 25, "awesome placeholder tier");
        tierRepository.save(testTier);

        Profile testProfile = new Profile(testUser, "testUserIsCool", "hello im test user", "nourlfornow", 400, 300f, testTier, false);
        profileRepository.save(testProfile);

        Transport_mode testTransport = new Transport_mode("test transport", 300f, false);

        Date testDate1 = new Date();
        testDate1.getTime();

        Journey testJourney1 = new Journey("location 1 ", "destionation lcoation", testDate1, 30f, 2f, 30f, 3, "lelel lelel");

        








    }



    
}
