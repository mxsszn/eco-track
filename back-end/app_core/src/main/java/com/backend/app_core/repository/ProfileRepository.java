package com.backend.app_core.repository;

import org.springframework.data.repository.CrudRepository;
import com.backend.app_core.model.*;

import java.util.Optional;

public interface ProfileRepository extends CrudRepository<Profile, Long> {
    Optional<Profile> findByUser_UserId(Long userId);
}