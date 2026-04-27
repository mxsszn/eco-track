package com.backend.app_core.dto;

public class SavedRouteRequestDto {
    private Long user_id;
    private Long transport_mode_id;
    private String start_location;
    private String destination;
    private Float last_distance_km;

    public SavedRouteRequestDto() {
    }

    public Long getUser_id() { return user_id; }
    public void setUser_id(Long user_id) { this.user_id = user_id; }

    public Long getTransport_mode_id() { return transport_mode_id; }
    public void setTransport_mode_id(Long transport_mode_id) { this.transport_mode_id = transport_mode_id; }

    public String getStart_location() { return start_location; }
    public void setStart_location(String start_location) { this.start_location = start_location; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public Float getLast_distance_km() { return last_distance_km; }
    public void setLast_distance_km(Float last_distance_km) { this.last_distance_km = last_distance_km; }
}