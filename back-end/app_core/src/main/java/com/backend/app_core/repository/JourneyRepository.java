package com.backend.app_core.repository;

import org.springframework.data.repository.CrudRepository;
import com.backend.app_core.model.*;

import java.util.Date;
import java.util.List;

public interface JourneyRepository extends CrudRepository<Journey, Long> {

    List<Journey> findByUser_UserIdAndJourneyDateBetween(Long userId, Date startDate, Date endDate);

    List<Journey> findTop3ByUser_UserIdOrderByJourneyDateDesc(Long userId);
}