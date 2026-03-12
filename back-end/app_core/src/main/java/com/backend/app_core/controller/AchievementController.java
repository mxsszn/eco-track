package com.backend.app_core.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.app_core.dto.AchievementDTO;
import com.backend.app_core.model.Achievement;
import com.backend.app_core.model.User_achievement;
import com.backend.app_core.service.AchievementService;

@RestController
@RequestMapping("/api/achievements")
public class AchievementController {

    private final AchievementService achievementService;

    public AchievementController(AchievementService achievementService) {
        this.achievementService = achievementService;
    }

    @GetMapping
    public ResponseEntity<List<Achievement>> getAllAchievements() {
        return ResponseEntity.ok(achievementService.getAllAchievements());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Achievement> getAchievementById(@PathVariable Long id) {
        return ResponseEntity.ok(achievementService.getAchievementById(id));
    }

    @PostMapping
    public ResponseEntity<Achievement> createAchievement(@RequestBody Achievement achievement) {
        Achievement created = achievementService.createAchievement(achievement);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Achievement> updateAchievement(
            @PathVariable Long id,
            @RequestBody Achievement achievement) {
        return ResponseEntity.ok(achievementService.updateAchievement(id, achievement));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAchievement(@PathVariable Long id) {
        achievementService.deleteAchievement(id);
        return ResponseEntity.ok("Achievement deleted successfully.");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<User_achievement>> getAchievementsForUser(@PathVariable Long userId) {
        return ResponseEntity.ok(achievementService.getAchievementsForUser(userId));
    }

    @PostMapping("/assign")
    public ResponseEntity<User_achievement> assignAchievementToUser(@RequestBody AchievementDTO dto) {
        User_achievement created = achievementService.assignAchievementToUser(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> removeAchievementFromUser(
            @RequestParam Long userId,
            @RequestParam Long achievementId) {
        achievementService.removeAchievementFromUser(userId, achievementId);
        return ResponseEntity.ok("Achievement removed from user successfully.");
    }
}