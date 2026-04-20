package com.backend.app_core.controller;

import com.backend.app_core.dto.ProfileDTO;
import com.backend.app_core.dto.UpdateProfileDTO;
import com.backend.app_core.model.Achievement;
import com.backend.app_core.service.ProfileService;
import com.backend.app_core.service.UserService;
import com.backend.app_core.model.Profile;
import com.backend.app_core.model.User;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;








@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")

public class ProfileController {


    private final ProfileService profileService;

    public ProfileController(ProfileService profileService, UserService userService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<List<Profile>> getAllProfiles() {
        return ResponseEntity.ok(profileService.getAllProfiles());
    }

    @GetMapping("/{userId}")
    public ProfileDTO getProfile(@PathVariable Long userId) {
        return profileService.getProfileData(userId);
    }


    @GetMapping("/updatePoints/{profileId}")
    public ResponseEntity<Profile> updateTotalPoints(@PathVariable Long profileId) {
        return ResponseEntity.ok(profileService.updateTotalPoints(profileId));
    }

    @GetMapping("/updateCo2Total/{profileId}")
    public ResponseEntity<Profile> updateTotalCo2Saved(@PathVariable Long profileId) {
        return ResponseEntity.ok(profileService.updateCo2Total(profileId));
    }

    @GetMapping("/updateTier/{profileId}")
    public ResponseEntity<Profile> updateProfileTier(@PathVariable Long profileId) {
        return ResponseEntity.ok(profileService.updateTier(profileId));
    }

    @GetMapping("/update/{profileId}")
    public ResponseEntity<Profile> updateProfileStats(@PathVariable Long profileId) {
        return ResponseEntity.ok(profileService.updateProfileStats(profileId));
    }


    @PostMapping("/{userId}")
    public ResponseEntity<Profile> createProfile(@PathVariable Long userId) {
        Profile created = profileService.createProfile(userId);
        return new ResponseEntity<Profile>(created, HttpStatus.CREATED);
    }


    @PostMapping("/update/{profileId}")
    public ResponseEntity<Profile> updateProfile(@RequestBody UpdateProfileDTO profile, @PathVariable Long profileId) {
        return ResponseEntity.ok(profileService.updateProfile(profile, profileId));
    }


    @DeleteMapping("/{profileId}")
    public ResponseEntity<String> deleteProfile(@PathVariable Long profileId) {
        profileService.deleteProfile(profileId);
        return ResponseEntity.ok("Profile deleted successfuly");
    }    
}
