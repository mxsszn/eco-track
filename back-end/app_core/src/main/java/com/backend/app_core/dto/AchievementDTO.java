package com.backend.app_core.dto;

public class AchievementDTO {

    private Long userId;
    private Long achievementId;

    public AchievementDTO() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getAchievementId() {
        return achievementId;
    }

    public void setAchievementId(Long achievementId) {
        this.achievementId = achievementId;
    }
}