package com.backend.app_core.repository;
import org.springframework.data.repository.CrudRepository;

import com.backend.app_core.model.*;

public interface ProfileRepository extends CrudRepository<Profile, Long> {
    
}
