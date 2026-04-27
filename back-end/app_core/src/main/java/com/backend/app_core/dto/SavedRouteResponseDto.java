package com.backend.app_core.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.Date;

public class SavedRouteResponseDto {
    private Long saved_route_id;
    private Long user_id;
    private String username;
    private Long transport_mode_id;
    private String transport_mode_name;
    private String start_location;
    private String destination;
    private Float last_distance_km;
    private Integer times_used;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date last_used_at;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date created_at;

    public SavedRouteResponseDto() {
    }

    public Long getSaved_route_id() { return saved_route_id; }
    public void setSaved_route_id(Long saved_route_id) { this.saved_route_id = saved_route_id; }

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

    public Float getLast_distance_km() { return last_distance_km; }
    public void setLast_distance_km(Float last_distance_km) { this.last_distance_km = last_distance_km; }

    public Integer getTimes_used() { return times_used; }
    public void setTimes_used(Integer times_used) { this.times_used = times_used; }

    public Date getLast_used_at() { return last_used_at; }
    public void setLast_used_at(Date last_used_at) { this.last_used_at = last_used_at; }

    public Date getCreated_at() { return created_at; }
    public void setCreated_at(Date created_at) { this.created_at = created_at; }
}