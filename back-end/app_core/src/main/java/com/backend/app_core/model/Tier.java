package com.backend.app_core.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;




@Entity
@Table(name="Tiers")
public class Tier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long tier_id;

    @NotBlank
    String tier_name;

    @NotNull
    Integer min_points;

    @NotNull
    Integer points_reward;

    @NotBlank
    String description;

    public Tier() {
        super();
    }

    public Tier(String tier_name, Integer min_points, Integer points_reward, String description) {

        super();
        this.tier_name = tier_name;
        this.min_points = min_points;
        this.points_reward = points_reward;
        this.description = description;

    }

    public Long getTier_id() {
        return tier_id;
    }

    public void setTier_id(Long tier_id) {
        this.tier_id = tier_id;
    }

    public String getTier_name() {
        return tier_name;
    }

    public void setTier_name(String tier_name) {
        this.tier_name = tier_name;
    }

    public Integer getMin_points() {
        return min_points;
    }

    public void setMin_points(Integer min_points) {
        this.min_points = min_points;
    }

    public Integer getPoints_reward() {
        return points_reward;
    }

    public void setPoints_reward(Integer points_reward) {
        this.points_reward = points_reward;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
