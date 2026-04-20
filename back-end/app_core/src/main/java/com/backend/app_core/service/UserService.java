package com.backend.app_core.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.app_core.model.User;
import com.backend.app_core.repository.UserRepository;
import com.backend.app_core.Exceptions.ResourceNotFoundException;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public UserService() {
        super();
    }


    public void addUser(User newUser) {
        if(newUser.getEmail() == null || newUser.getPassword_hash() == null || newUser.getUsername() == null) {
            throw new IllegalArgumentException("Email, password and name cannot be null");
        }
        userRepository.save(newUser);
    }

    public void deleteUser(Long id) {
        if(id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userRepository.delete(user);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User findByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    
    
}
