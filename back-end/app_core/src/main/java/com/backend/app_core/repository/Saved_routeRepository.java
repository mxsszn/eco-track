package com.backend.app_core.repository;

import com.backend.app_core.model.Saved_route;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface Saved_routeRepository extends CrudRepository<Saved_route, Long> {

    @Query("SELECT s FROM Saved_route s WHERE s.user.user_id = :userId ORDER BY s.created_at DESC")
    List<Saved_route> findSavedRoutesByUserId(@Param("userId") Long userId);

    @Query("""
           SELECT s FROM Saved_route s
           WHERE s.user.user_id = :userId
           AND s.transport_mode.transport_mode_id = :transportModeId
           AND s.start_location = :startLocation
           AND s.destination = :destination
           """)
    Optional<Saved_route> findExistingSavedRoute(@Param("userId") Long userId,
                                                 @Param("transportModeId") Long transportModeId,
                                                 @Param("startLocation") String startLocation,
                                                 @Param("destination") String destination);
}