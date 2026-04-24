package com.backend.app_core.controller;

import com.backend.app_core.model.Content_item;
import com.backend.app_core.model.Topic;
import com.backend.app_core.model.User;
import com.backend.app_core.model.User_preference;
import com.backend.app_core.repository.Content_itemRepository;
import com.backend.app_core.repository.TopicRepository;
import com.backend.app_core.repository.UserRepository;
import com.backend.app_core.repository.User_preferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "*")
public class NewsController {

    @Autowired
    private Content_itemRepository newsRepository;

    @Autowired
    private User_preferenceRepository userPreferenceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TopicRepository topicRepository;

    // GET all news
    @GetMapping
    public List<Content_item> getAllNews() {
        return newsRepository.findAll();
    }

    // GET news filtered by topic
    @GetMapping("/topic/{topicId}")
    public List<Content_item> getNewsByTopic(@PathVariable Long topicId) {
        return newsRepository.findByTopic_Id(topicId);
    }

    // GET personalised news for a user based on their preferences
    @GetMapping("/user/{userId}")
    public List<Content_item> getPersonalisedNews(@PathVariable Long userId) {
        List<User_preference> preferences = userPreferenceRepository.findByUserId(userId);

        if (preferences.isEmpty()) {
            return newsRepository.findAll();
        }

        List<Long> topicIds = preferences.stream()
                .map(p -> p.getTopic().getId())
                .toList();
        return newsRepository.findByTopic_IdIn(topicIds);
    }

    // PUT update a user's topic preferences
    @Transactional
    @PutMapping("/user/{userId}/preferences")
    public ResponseEntity<String> updatePreferences(
            @PathVariable Long userId,
            @RequestBody List<Long> topicIds) {

        User user = userRepository.findById(userId).orElse(null);
        if (user == null)
            return ResponseEntity.notFound().build();

        // Delete existing preferences
        userPreferenceRepository.deleteByUserId(userId);

        // Save new preferences
        for (Long topicId : topicIds) {
            Topic topic = topicRepository.findById(topicId).orElse(null);
            if (topic != null) {
                userPreferenceRepository.save(new User_preference(user, topic));
            }
        }

        return ResponseEntity.ok("Preferences updated successfully");
    }
}