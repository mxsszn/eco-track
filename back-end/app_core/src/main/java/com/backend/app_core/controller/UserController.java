package com.backend.app_core.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.app_core.dto.UserDTO;
import com.backend.app_core.model.User;
import com.backend.app_core.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController

@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<Optional<User>> addUser(@RequestBody UserDTO newUserDTO) {

        if (newUserDTO.getUsername()==null || 
            newUserDTO.getEmail()==null || 
            newUserDTO.getPassword_hash()==null) {
                return new ResponseEntity<>(Optional.ofNullable(null), HttpStatus.BAD_REQUEST);
            }
        User newUser = new User(newUserDTO.getEmail(), newUserDTO.getUsername(), newUserDTO.getPassword_hash());
        userService.addUser(newUser);
        //TODO: process POST request
        
        return new ResponseEntity<>(Optional.ofNullable(newUser), HttpStatus.CREATED);
    }
    

    
}
