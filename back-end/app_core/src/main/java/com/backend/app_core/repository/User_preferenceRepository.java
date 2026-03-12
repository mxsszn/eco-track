package com.backend.app_core.repository;

import com.backend.app_core.model.User_preference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface User_preferenceRepository extends JpaRepository<User_preference, Long> {

    @Query("SELECT up FROM User_preference up WHERE up.user.user_id = :userId")
    List<User_preference> findByUserId(@Param("userId") Long userId);

    @Modifying
    @Query("DELETE FROM User_preference up WHERE up.user.user_id = :userId")
    void deleteByUserId(@Param("userId") Long userId);
}