package com.backend.app_core.dto;

import java.time.LocalDateTime;

public class RecentJourneyDTO {

    private String startLocation;
    private String destination;
    private double distanceKm;
    private LocalDateTime journeyDate;
    private String transportMode;

    public RecentJourneyDTO() {
    }

    public RecentJourneyDTO(String startLocation, String destination, double distanceKm, LocalDateTime journeyDate, String transportMode) {
        this.startLocation = startLocation;
        this.destination = destination;
        this.distanceKm = distanceKm;
        this.journeyDate = journeyDate;
        this.transportMode = transportMode;
    }

    public String getStartLocation() {
        return startLocation;
    }

    public void setStartLocation(String startLocation) {
        this.startLocation = startLocation;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public double getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public LocalDateTime getJourneyDate() {
        return journeyDate;
    }

    public void setJourneyDate(LocalDateTime journeyDate) {
        this.journeyDate = journeyDate;
    }

    public String getTransportMode() {
        return transportMode;
    }

    public void setTransportMode(String transportMode) {
        this.transportMode = transportMode;
    }
}