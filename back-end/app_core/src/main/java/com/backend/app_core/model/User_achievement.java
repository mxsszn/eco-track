package com.backend.app_core.model;


import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.FetchType;

@Entity
@Table(name="User_achievements")

public class User_achievement {

    @Id
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="achievement_id")
    private Achievement achievement;

    @NotNull
    Date earned_at;


    public User_achievement() {
        super();
    }

    public User_achievement(User user, Achievement achievement, Date earned_at) {
        this.user = user;
        this.achievement = achievement;
        this.earned_at = earned_at;
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
