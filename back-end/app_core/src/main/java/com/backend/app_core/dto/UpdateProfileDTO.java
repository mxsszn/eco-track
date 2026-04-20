package com.backend.app_core.dto;

public class UpdateProfileDTO {


    private String profileUsername;
    private String bio;
    private String profileImageURL;
    private Long profile_id;


    public UpdateProfileDTO() {
    }

    public UpdateProfileDTO(String profileUsername, String bio, String profileImageURL, Long profile_id) {
        this.profile_id = profile_id;
        this.profileUsername = profileUsername;
        this.bio = bio;
        this.profileImageURL = profileImageURL;
    }

    public Long getProfile_id() {
        return profile_id;
    }

    public void setProfile_id(Long profile_id) {
        this.profile_id = profile_id;
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

    
}
