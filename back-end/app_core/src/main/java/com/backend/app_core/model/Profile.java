package com.backend.app_core.model;

import org.springframework.data.annotation.LastModifiedDate;
import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.FetchType;


@Entity
@Table(name="Profiles")
public class Profile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long profile_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @NotBlank
    String display_name;

    String bio;

    String profile_image_url;

    @NotNull
    boolean private_profile;

    @NotNull
    Integer total_points;

    @NotNull
    Float total_co2_saved;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="tier_id")
    private Tier tier;

    @LastModifiedDate
    private Date updated_at;

    public Profile() {
    }


    public Profile(User user, String display_name, String bio, String profile_image_url, Integer total_points,  Float total_co2_saved, Tier tier, boolean private_profile) {
        super();
        this.user = user;
        this.display_name = display_name;
        this.bio = bio;
        this.profile_image_url = profile_image_url;
        this.total_points = total_points;
        this.total_co2_saved = total_co2_saved;
        this.tier = tier;
        this.private_profile = private_profile;
    }


    public Long getProfile_id() {
        return profile_id;
    }


    public void setProfile_id(Long profile_id) {
        this.profile_id = profile_id;
    }


    public User getUser() {
        return user;
    }


    public void setUser(User user) {
        this.user = user;
    }


    public String getDisplay_name() {
        return display_name;
    }


    public void setDisplay_name(String display_name) {
        this.display_name = display_name;
    }


    public String getBio() {
        return bio;
    }


    public void setBio(String bio) {
        this.bio = bio;
    }


    public String getProfile_image_url() {
        return profile_image_url;
    }


    public void setProfile_image_url(String profile_image_url) {
        this.profile_image_url = profile_image_url;
    }


    public Integer getTotal_points() {
        return total_points;
    }


    public void setTotal_points(Integer total_points) {
        this.total_points = total_points;
    }


    public Float getTotal_co2_saved() {
        return total_co2_saved;
    }


    public void setTotal_co2_saved(Float total_co2_saved) {
        this.total_co2_saved = total_co2_saved;
    }


    public Tier getTier() {
        return tier;
    }


    public void setTier(Tier tier) {
        this.tier = tier;
    }


    public Date getUpdated_at() {
        return updated_at;
    }


    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }


    public boolean isPrivate_profile() {
        return private_profile;
    }


    public void setPrivate_profile(boolean private_profile) {
        this.private_profile = private_profile;
    }




}

