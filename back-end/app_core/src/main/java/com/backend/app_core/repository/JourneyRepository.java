package com.backend.app_core.repository;

import com.backend.app_core.model.Journey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface JourneyRepository extends JpaRepository<Journey, Long> {

    @Query("SELECT j FROM Journey j WHERE j.user.user_id = :userId AND j.journey_date BETWEEN :startDate AND :endDate")
    List<Journey> findJourneysByUserIdAndDateBetween(@Param("userId") Long userId,
                                                     @Param("startDate") Date startDate,
                                                     @Param("endDate") Date endDate);

    @Query("SELECT j FROM Journey j WHERE j.user.user_id = :userId ORDER BY j.journey_date DESC")
    List<Journey> findRecentJourneysByUserId(@Param("userId") Long userId);
}