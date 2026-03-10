package com.backend.app_core.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;




@Entity
@Table(name="Achievements")

public class Achievement {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long achievement_id;

    @NotBlank
    String achievement_name;

    String description;

    @NotBlank
    String criteria_type;

    @NotNull
    Integer criteria_value;

    @NotNull
    Integer points_reward;

    @NotBlank
    String badge_icon;

    public Achievement() {
        super();
    }

    public Achievement(String achievement_name, String description, String criteria_type, Integer criteria_value, Integer points_reward, String badge_icon) {
        super();
        this.achievement_name = achievement_name;
        this.description = description;
        this.criteria_type = criteria_type;
        this.criteria_value = criteria_value;
        this.points_reward = points_reward;
        this.badge_icon = badge_icon;
    }

    public Long getAchievement_id() {
        return achievement_id;
    }

    public void setAchievement_id(Long achievement_id) {
        this.achievement_id = achievement_id;
    }

    public String getAchievement_name() {
        return achievement_name;
    }

    public void setAchievement_name(String achievement_name) {
        this.achievement_name = achievement_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCriteria_type() {
        return criteria_type;
    }

    public void setCriteria_type(String criteria_type) {
        this.criteria_type = criteria_type;
    }

    public Integer getCriteria_value() {
        return criteria_value;
    }

    public void setCriteria_value(Integer criteria_value) {
        this.criteria_value = criteria_value;
    }

    public Integer getPoints_reward() {
        return points_reward;
    }

    public void setPoints_reward(Integer points_reward) {
        this.points_reward = points_reward;
    }

    public String getBadge_icon() {
        return badge_icon;
    }

    public void setBadge_icon(String badge_icon) {
        this.badge_icon = badge_icon;
    }

    





    
}
