package com.backend.app_core.controller;

import com.backend.app_core.dto.ProfileDTO;
import com.backend.app_core.service.ProfileService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")

public class ProfileController {


    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }


    @GetMapping("/test")
    public String testController() {
        String test = "hello";
        return test;
    }
    


    @GetMapping("/{userId}")
    public ProfileDTO getProfile(@PathVariable Long userId) {
        return profileService.getProfileData(userId);
    }
    

}
