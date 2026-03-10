package com.backend.app_core.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.app_core.model.Achievement;

@Repository
public interface AchievementRepository extends JpaRepository<Achievement, Long> {
}X$