package com.backend.app_core.repository;
import org.springframework.data.repository.CrudRepository;

import com.backend.app_core.model.*;
import com.backend.app_core.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.user_id = :userId")
    User findUserById(@Param("userId") Long userId);

    @Query("SELECT u FROM User u WHERE u.username = :username")
    User findUserByUsername(@Param("username") String username);
    
}



