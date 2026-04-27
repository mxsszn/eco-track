package com.backend.app_core.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;

public class JourneyRequestDto {
    private Long user_id;
    private Long transport_mode_id;
    private String start_location;
    private String destination;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date journey_date;

    private Float distance_km;
    private String route_geometry;

    public JourneyRequestDto() {
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public Long getTransport_mode_id() {
        return transport_mode_id;
    }

    public void setTransport_mode_id(Long transport_mode_id) {
        this.transport_mode_id = transport_mode_id;
    }

    public String getStart_location() {
        return start_location;
    }

    public void setStart_location(String start_location) {
        this.start_location = start_location;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public Date getJourney_date() {
        return journey_date;
    }

    public void setJourney_date(Date journey_date) {
        this.journey_date = journey_date;
    }

    public Float getDistance_km() {
        return distance_km;
    }

    public void setDistance_km(Float distance_km) {
        this.distance_km = distance_km;
    }

    public String getRoute_geometry() {
        return route_geometry;
    }

    public void setRoute_geometry(String route_geometry) {
        this.route_geometry = route_geometry;
    }
}