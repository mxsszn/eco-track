package com.backend.app_core.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.app_core.model.User_achievement;

@Repository
public interface User_achievementRepository extends JpaRepository<User_achievement, Long> {

    List<User_achievement> findByUserId(Long userId);

    List<User_achievement> findByAchievementId(Long achievementId);

    Optional<User_achievement> findByUserIdAndAchievementId(Long userId, Long achievementId);

    boolean existsByUserIdAndAchievementId(Long userId, Long achievementId);

    void deleteByUserIdAndAchievementId(Long userId, Long achievementId);
}