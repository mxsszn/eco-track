package com.backend.app_core.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;

public class JourneyResponseDto {
    private Long journey_id;
    private Long user_id;
    private String username;
    private Long transport_mode_id;
    private String transport_mode_name;
    private String start_location;
    private String destination;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date journey_date;

    private Float distance_km;
    private Float selected_mode_emission;
    private Float co2_saved;
    private Integer points_awarded;
    private String route_geometry;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date created_at;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updated_at;

    public JourneyResponseDto() {
    }

    public Long getJourney_id() { return journey_id; }
    public void setJourney_id(Long journey_id) { this.journey_id = journey_id; }

    public Long getUser_id() { return user_id; }
    public void setUser_id(Long user_id) { this.user_id = user_id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public Long getTransport_mode_id() { return transport_mode_id; }
    public void setTransport_mode_id(Long transport_mode_id) { this.transport_mode_id = transport_mode_id; }

    public String getTransport_mode_name() { return transport_mode_name; }
    public void setTransport_mode_name(String transport_mode_name) { this.transport_mode_name = transport_mode_name; }

    public String getStart_location() { return start_location; }
    public void setStart_location(String start_location) { this.start_location = start_location; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public Date getJourney_date() { return journey_date; }
    public void setJourney_date(Date journey_date) { this.journey_date = journey_date; }

    public Float getDistance_km() { return distance_km; }
    public void setDistance_km(Float distance_km) { this.distance_km = distance_km; }

    public Float getSelected_mode_emission() { return selected_mode_emission; }
    public void setSelected_mode_emission(Float selected_mode_emission) { this.selected_mode_emission = selected_mode_emission; }

    public Float getCo2_saved() { return co2_saved; }
    public void setCo2_saved(Float co2_saved) { this.co2_saved = co2_saved; }

    public Integer getPoints_awarded() { return points_awarded; }
    public void setPoints_awarded(Integer points_awarded) { this.points_awarded = points_awarded; }

    public String getRoute_geometry() { return route_geometry; }
    public void setRoute_geometry(String route_geometry) { this.route_geometry = route_geometry; }

    public Date getCreated_at() { return created_at; }
    public void setCreated_at(Date created_at) { this.created_at = created_at; }

    public Date getUpdated_at() { return updated_at; }
    public void setUpdated_at(Date updated_at) { this.updated_at = updated_at; }
}