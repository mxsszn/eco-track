package com.backend.app_core.dto;

public class ProfileDTO {


    private String profileUsername;
    private String bio;
    private String profileImageURL;
    private String tier;
    private int totalPoints;
    private Float totalCo2Saved;
    private boolean privateProfile;
    private double co2RecordWeek;
    private double co2RecordMonth;
    private double co2RecordAlltime;


    public ProfileDTO() {
    }

    public ProfileDTO(String profileUsername, String bio, String profileImageURL, String tier, int totalPoints,
            Float totalCo2Saved, boolean privateProfile, double mostCo2SavedWeek, double mostCo2SavedMonth,
            double mostCo2SavedRecord) {
        this.profileUsername = profileUsername;
        this.bio = bio;
        this.profileImageURL = profileImageURL;
        this.tier = tier;
        this.totalPoints = totalPoints;
        this.totalCo2Saved = totalCo2Saved;
        this.privateProfile = privateProfile;
        this.co2RecordWeek = mostCo2SavedWeek;
        this.co2RecordMonth = mostCo2SavedMonth;
        this.co2RecordAlltime = mostCo2SavedRecord;
    }

    public String getProfileUsername() {
        return profileUsername;
    }

    public void setProfileUsername(String profileUsername) {
        this.profileUsername = profileUsername;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProfileImageURL() {
        return profileImageURL;
    }

    public void setProfileImageURL(String profileImageURL) {
        this.profileImageURL = profileImageURL;
    }

    public String getTier() {
        return tier;
    }

    public void setTier(String tier) {
        this.tier = tier;
    }

    public int getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(int totalPoints) {
        this.totalPoints = totalPoints;
    }

    public float getTotalCo2Saved() {
        return totalCo2Saved;
    }

    public void setTotalCo2Saved(float totalCo2Saved) {
        this.totalCo2Saved = totalCo2Saved;
    }

    public boolean isPrivateProfile() {
        return privateProfile;
    }

    public void setPrivateProfile(boolean privateProfile) {
        this.privateProfile = privateProfile;
    }

    public double getCo2RecordWeek() {
        return co2RecordWeek;
    }

    public void setCo2RecordWeek(double mostCo2SavedWeek) {
        this.co2RecordWeek = mostCo2SavedWeek;
    }

    public double getCo2RecordMonth() {
        return co2RecordMonth;
    }

    public void setCo2RecordMonth(double mostCo2SavedMonth) {
        this.co2RecordMonth = mostCo2SavedMonth;
    }

    public double getCo2RecordAlltime() {
        return co2RecordAlltime;
    }

    public void setCo2RecordAlltime(double mostCo2SavedRecord) {
        this.co2RecordAlltime = mostCo2SavedRecord;
    }

  







    
}
