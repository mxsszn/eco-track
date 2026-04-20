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

                Topic transport = topicRepository.save(new Topic("Transport"));
                Topic energy = topicRepository.save(new Topic("Energy"));
                Topic climate = topicRepository.save(new Topic("Climate"));
                Topic wildlife = topicRepository.save(new Topic("Wildlife"));
                Topic health = topicRepository.save(new Topic("Health"));
                Topic technology = topicRepository.save(new Topic("Technology"));
                topicRepository.save(transport);
                topicRepository.save(energy);
                topicRepository.save(climate);

                content_itemRepository.save(new Content_item("Electric Buses Cut City Emissions by 40%",
                                "Cities adopting electric buses have reduced transport emissions by 40% over five years.",
                                transport));
                content_itemRepository.save(new Content_item("Cycling Infrastructure Boom Across Europe",
                                "European cities are investing billions in cycling lanes to reduce car dependency.",
                                transport));
                content_itemRepository.save(new Content_item("Solar Panel Costs Hit All-Time Low",
                                "The cost of solar panels has dropped 90% in the last decade.", energy));
                content_itemRepository.save(new Content_item("Arctic Ice Reaches Record Low",
                                "Scientists report Arctic sea ice has reached its lowest recorded level.", climate));
                content_itemRepository.save(new Content_item("Carbon Capture Technology Advances",
                                "New carbon capture tech can remove CO2 directly from the atmosphere.", climate));
                // Transport
                content_itemRepository.save(new Content_item("Electric Vehicles Surge in Global Sales",
                                "Global electric vehicle sales have surpassed 10 million units this year, marking a significant shift away from fossil fuel-powered transport. Governments across Europe and Asia are offering increased subsidies to accelerate the transition.",
                                transport));

                content_itemRepository.save(new Content_item("Cities Expanding Cycling Infrastructure",
                                "Major cities including London, Amsterdam and Nairobi are investing heavily in dedicated cycling lanes as part of efforts to reduce urban carbon emissions from private vehicles.",
                                transport));

                // Energy
                content_itemRepository.save(new Content_item("Solar Power Breaks Global Record",
                                "Solar energy generation hit a new global record this quarter, now accounting for over 12% of worldwide electricity production. The cost of solar panels has dropped by 90% over the last decade.",
                                energy));

                content_itemRepository.save(new Content_item("Wind Farms Power Millions of Homes",
                                "Offshore wind capacity has tripled in the past five years. The UK alone now generates enough wind energy to power over 10 million homes, reducing reliance on gas-fired power stations.",
                                energy));

                // Climate
                content_itemRepository.save(new Content_item("Arctic Ice Reaches Record Low",
                                "Scientists have recorded the lowest Arctic sea ice extent since measurements began. The decline is accelerating faster than climate models predicted, raising concerns about global temperature rise.",
                                climate));

                content_itemRepository.save(new Content_item("COP30 Climate Pledges Fall Short",
                                "A new report warns that current national climate pledges will result in 2.5 degrees of warming by 2100, significantly above the 1.5 degree target set by the Paris Agreement.",
                                climate));

                // Wildlife
                content_itemRepository.save(new Content_item("Coral Reefs Face Mass Bleaching Event",
                                "Rising ocean temperatures have triggered one of the largest coral bleaching events on record. Over 50% of the Great Barrier Reef has been affected, threatening marine biodiversity.",
                                wildlife));

                content_itemRepository.save(new Content_item("Reforestation Efforts Restore Habitats",
                                "Community-led reforestation projects across sub-Saharan Africa have planted over 50 million trees in the past two years, restoring critical habitats for endangered species.",
                                wildlife));

                // Health
                content_itemRepository.save(new Content_item("Air Pollution Linked to 7 Million Deaths Annually",
                                "The World Health Organization reports that air pollution, largely driven by fossil fuel combustion, is responsible for approximately 7 million premature deaths each year worldwide.",
                                health));

                content_itemRepository.save(new Content_item("Green Spaces Improve Mental Health in Cities",
                                "New research shows that urban residents living near parks and green spaces report significantly lower levels of stress and anxiety. City planners are now prioritising green infrastructure.",
                                health));

                // Technology
                content_itemRepository.save(new Content_item("AI Optimises Energy Consumption in Data Centres",
                                "Major tech companies are deploying artificial intelligence to reduce energy consumption in data centres by up to 40%. Data centres currently account for around 2% of global carbon emissions.",
                                technology));

                content_itemRepository.save(new Content_item("Carbon Capture Technology Scales Up",
                                "Direct air capture facilities are scaling up globally, with new plants capable of removing thousands of tonnes of CO2 from the atmosphere annually. Costs are falling rapidly as the technology matures.",
                                technology));

                user_preferenceRepository.save(new User_preference(testUser, transport));
                user_preferenceRepository.save(new User_preference(testUser, energy));
        }

}
