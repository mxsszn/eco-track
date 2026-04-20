package com.backend.app_core.controller;


import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.boot.context.config.Profiles;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.app_core.Security.JWTService;
import com.backend.app_core.Security.UserDetailsServiceImpl;
import com.backend.app_core.dto.LoginDTO;
import com.backend.app_core.dto.ProfileDTO;
import com.backend.app_core.dto.UserDTO;
import com.backend.app_core.model.Profile;
import com.backend.app_core.model.User;
import com.backend.app_core.service.ProfileService;
import com.backend.app_core.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController

@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {


    private final JWTService jwtService;
    private final UserService userService;
    private final ProfileService profileService;
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    public UserController(UserService userService, ProfileService profileService, JWTService jwtService, UserDetailsServiceImpl userDetailsServiceImpl) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.profileService = profileService;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
    }

    

    @PostMapping("/register")
    public ResponseEntity<Optional<User>> addUser(@RequestBody UserDTO newUserDTO) {

        if (newUserDTO.getUsername()==null || 
            newUserDTO.getEmail()==null || 
            newUserDTO.getPassword()==null) {
                return new ResponseEntity<>(Optional.ofNullable(null), HttpStatus.BAD_REQUEST);
            }

        String passwordHash = encoder.encode(newUserDTO.getPassword());
        User newUser = new User(newUserDTO.getEmail(), newUserDTO.getUsername(), passwordHash);
        userService.addUser(newUser);
        profileService.createProfile(newUser.getUser_id());

        return new ResponseEntity<>(Optional.ofNullable(newUser), HttpStatus.CREATED);


    }


    @PostMapping("/logintest")
    public ResponseEntity<Optional<Profile>> loginUsertest(@RequestBody LoginDTO loginDTO) {
        if (loginDTO.getPassword()==null ||
            loginDTO.getUsername()==null) {
                System.out.println("NULL DTO");
                return new ResponseEntity<>(Optional.ofNullable(null), HttpStatus.BAD_REQUEST);
            }
        try {
            User user = userService.findByUsername(loginDTO.getUsername());

            if (encoder.matches(loginDTO.getPassword(), user.getPassword_hash())) {
                Profile profile = profileService.getProfileFromUser(user.getUser_id());
                userDetailsServiceImpl.loadUserByUsername(loginDTO.getUsername());
                System.out.println(profile.getDisplay_name());
                return new ResponseEntity<>(Optional.of(profile), HttpStatus.ACCEPTED);
            }
            System.out.println("INVALID PASSWORD");
            return new ResponseEntity<>(Optional.ofNullable(null), HttpStatus.BAD_REQUEST);
            
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(Optional.ofNullable(null), HttpStatus.BAD_REQUEST);
        }

    }

    @PostMapping("/login")
    public ResponseEntity<Optional<User>> loginUser(@RequestBody LoginDTO loginDTO) {
        if (loginDTO.getPassword()==null ||
            loginDTO.getUsername()==null) {
                System.out.println("NULL DTO");
                return new ResponseEntity<>(Optional.ofNullable(null), HttpStatus.BAD_REQUEST);
            }
        try {
            User user = userService.findByUsername(loginDTO.getUsername());

            if (encoder.matches(loginDTO.getPassword(), user.getPassword_hash())) {
                Profile profile = profileService.getProfileFromUser(user.getUser_id());
                userDetailsServiceImpl.loadUserByUsername(loginDTO.getUsername());
                System.out.println(profile.getDisplay_name());
                return new ResponseEntity<>(Optional.of(user), HttpStatus.OK);
            }
            System.out.println("INVALID PASSWORD");
            return new ResponseEntity<>(Optional.ofNullable(null), HttpStatus.BAD_REQUEST);
            
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(Optional.ofNullable(null), HttpStatus.BAD_REQUEST);
        }

    }

    
}
