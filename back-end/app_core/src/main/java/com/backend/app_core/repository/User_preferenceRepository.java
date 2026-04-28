package com.backend.app_core.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.backend.app_core.model.User_preference;

public interface User_preferenceRepository extends CrudRepository<User_preference, Long> {

    @Query("SELECT up FROM User_preference up WHERE up.user.user_id = :userId")
    List<User_preference> findByUserId(@Param("userId") Long userId);

    @Transactional
    @Modifying
    @Query("DELETE FROM User_preference up WHERE up.user.user_id = :userId")
    void deleteByUserId(@Param("userId") Long userId);
}