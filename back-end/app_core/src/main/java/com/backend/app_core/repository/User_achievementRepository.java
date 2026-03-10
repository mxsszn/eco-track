package com.backend.app_core.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.app_core.model.User_achievement;

@Repository
public interface User_achievementRepository extends JpaRepository<User_achievement, Long> {

    @Query("SELECT ua FROM User_achievement ua WHERE ua.user.user_id = :userId")
    List<User_achievement> findAchievementsByUserId(@Param("userId") Long userId);

    @Query("SELECT ua FROM User_achievement ua WHERE ua.user.user_id = :userId AND ua.achievement.achievement_id = :achievementId")
    Optional<User_achievement> findByUserAndAchievement(@Param("userId") Long userId,
                                                        @Param("achievementId") Long achievementId);

    @Query("SELECT COUNT(ua) > 0 FROM User_achievement ua WHERE ua.user.user_id = :userId AND ua.achievement.achievement_id = :achievementId")
    boolean existsByUserAndAchievement(@Param("userId") Long userId,
                                       @Param("achievementId") Long achievementId);
}