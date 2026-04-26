package com.backend.app_core.repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.backend.app_core.model.*;

public interface TierRepository extends CrudRepository<Tier, Long> {

    @Query("SELECT t FROM Tier t WHERE t.tier_id = :tierId")
    Tier findTierById(@Param("tier_id") Long tierId);

    @Query("SELECT t FROM Tier t WHERE t.tier_id = 1")
    Tier getDefaultTier();

    @Query("SELECT t from Tier t WHERE t.min_points <= :current_points ORDER BY t.min_points DESC LIMIT 1")
    Tier findHighestValidTier(@Param("current_points") int current_points);

}
