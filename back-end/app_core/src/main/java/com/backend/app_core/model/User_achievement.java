package com.backend.app_core.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(
    name = "User_achievements",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "achievement_id"})
    }
)
public class User_achievement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_achievement_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "achievement_id", nullable = false)
    private Achievement achievement;

    @NotNull
    private Date earned_at;

    public User_achievement() {
        super();
    }

    public User_achievement(User user, Achievement achievement, Date earned_at) {
        this.user = user;
        this.achievement = achievement;
        this.earned_at = earned_at;
    }

    public Long getUser_achievement_id() {
        return user_achievement_id;
    }

    public void setUser_achievement_id(Long user_achievement_id) {
        this.user_achievement_id = user_achievement_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Achievement getAchievement() {
        return achievement;
    }

    public void setAchievement(Achievement achievement) {
        this.achievement = achievement;
    }

    public Date getEarned_at() {
        return earned_at;
    }

    public void setEarned_at(Date earned_at) {
        this.earned_at = earned_at;
    }
}
