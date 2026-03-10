package com.backend.app_core.service;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.app_core.dto.AchievementDTO;
import com.backend.app_core.model.Achievement;
import com.backend.app_core.model.User;
import com.backend.app_core.model.User_achievement;
import com.backend.app_core.repository.AchievementRepository;
import com.backend.app_core.repository.UserRepository;
import com.backend.app_core.repository.User_achievementRepository;

@Service
public class AchievementService {

    private final AchievementRepository achievementRepository;
    private final UserRepository userRepository;
    private final User_achievementRepository userAchievementRepository;

    public AchievementService(
            AchievementRepository achievementRepository,
            UserRepository userRepository,
            User_achievementRepository userAchievementRepository) {
        this.achievementRepository = achievementRepository;
        this.userRepository = userRepository;
        this.userAchievementRepository = userAchievementRepository;
    }

    public List<Achievement> getAllAchievements() {
        return achievementRepository.findAll();
    }

    public Achievement getAchievementById(Long id) {
        return achievementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Achievement not found with id: " + id));
    }

    public Achievement createAchievement(Achievement achievement) {
        return achievementRepository.save(achievement);
    }

    public Achievement updateAchievement(Long id, Achievement updatedAchievement) {
        Achievement existing = achievementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Achievement not found with id: " + id));

        existing.setAchievement_name(updatedAchievement.getAchievement_name());
        existing.setDescription(updatedAchievement.getDescription());
        existing.setCriteria_type(updatedAchievement.getCriteria_type());
        existing.setCriteria_value(updatedAchievement.getCriteria_value());
        existing.setPoints_reward(updatedAchievement.getPoints_reward());
        existing.setBadge_icon(updatedAchievement.getBadge_icon());

        return achievementRepository.save(existing);
    }

    public void deleteAchievement(Long id) {
        Achievement existing = achievementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Achievement not found with id: " + id));

        achievementRepository.delete(existing);
    }

    public List<User_achievement> getAchievementsForUser(Long userId) {
        return userAchievementRepository.findAchievementsByUserId(userId);
    }

    public User_achievement assignAchievementToUser(AchievementDTO dto) {
        if (dto.getUserId() == null || dto.getAchievementId() == null) {
            throw new RuntimeException("userId and achievementId are required.");
        }

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + dto.getUserId()));

        Achievement achievement = achievementRepository.findById(dto.getAchievementId())
                .orElseThrow(() -> new RuntimeException("Achievement not found with id: " + dto.getAchievementId()));

        boolean alreadyExists = userAchievementRepository
                .existsByUserAndAchievement(dto.getUserId(), dto.getAchievementId());

        if (alreadyExists) {
            throw new RuntimeException("This user already has this achievement.");
        }

        User_achievement userAchievement = new User_achievement();
        userAchievement.setUser(user);
        userAchievement.setAchievement(achievement);
        userAchievement.setEarned_at(new Date());

        return userAchievementRepository.save(userAchievement);
    }

    public void removeAchievementFromUser(Long userId, Long achievementId) {
        User_achievement existing = userAchievementRepository
                .findByUserAndAchievement(userId, achievementId)
                .orElseThrow(() -> new RuntimeException("User achievement record not found."));

        userAchievementRepository.delete(existing);
    }
}