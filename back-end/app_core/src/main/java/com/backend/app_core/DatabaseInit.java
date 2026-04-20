package com.backend.app_core;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
        journeyRepository.deleteAll();
        tierRepository.deleteAll();

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();





        User testUser = new User("testemail@sample.com", "test", encoder.encode("test"));
        User testUser2 = new User("testemail2@gmail.com", "testusername2", "hashpsaasword");
        User testUser3 = new User("testemai2342@gmail.com", "testusername3", "hashpsaasword");
        userRepository.save(testUser);
        userRepository.save(testUser2);
        userRepository.save(testUser3);

        Tier testTier = new Tier("starter tier 1", 0, 0, "first tier assigned to everyone");
        Tier testTier2 = new Tier("tier 2", 15, 10, "placeholder tier 2");
        Tier testTier3 = new Tier("tier 3", 30, 10, "placeholder tier 3");
        tierRepository.save(testTier);
        tierRepository.save(testTier2);
        tierRepository.save(testTier3);


        Profile testProfile = new Profile(testUser, "testUserIsCool", "hello im test user", "nourlfornow", 0, 0f, testTier, false);
        Profile testProfile2 = new Profile(testUser3, "test profile 2", "some bio", "url", 0, 0f, testTier, false);

        profileRepository.save(testProfile);
        profileRepository.save(testProfile2);

        
        Transport_mode testTransport = new Transport_mode("test transport", 300f, false);
        transport_modeRepository.save(testTransport);

        Date testDate1 = new Date();
        testDate1.getTime();

        Journey testJourney1 = new Journey(testUser, testTransport,"location 1 ", "destionation lcoation", testDate1, 25f, 2f, 30f, 15, "lell lelel");
        Journey testJourney2 = new Journey(testUser, testTransport, "location 2 ", "destionation lcoation 2", testDate1, 30f, 2f, 35f, 3, "lelel lelel");
        Journey testJourney3 = new Journey(testUser, testTransport, "location 3 ", "destionation lcoation 2", testDate1, 30f, 3f, 3f, 30, "lelel lelel");
        journeyRepository.save(testJourney1);
        journeyRepository.save(testJourney2);
        journeyRepository.save(testJourney3);


    }



    
}
