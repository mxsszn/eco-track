package com.backend.app_core.service;

import org.springframework.stereotype.Service;

import com.backend.app_core.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    
    
}
