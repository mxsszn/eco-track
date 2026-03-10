package com.backend.app_core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.app_core.model.Achievement;

public interface AchievementRepository extends JpaRepository<Achievement, Long> {
}