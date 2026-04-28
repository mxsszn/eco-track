package com.backend.app_core.dto;

public class CarbonCalculationDTO {

    private String transportMode;
    private double distanceKm;
    private double co2Kg;

    public CarbonCalculationDTO() {
    }

    public CarbonCalculationDTO(String transportMode, double distanceKm, double co2Kg) {
        this.transportMode = transportMode;
        this.distanceKm = distanceKm;
        this.co2Kg = co2Kg;
    }

    public String getTransportMode() {
        return transportMode;
    }

    public void setTransportMode(String transportMode) {
        this.transportMode = transportMode;
    }

    public double getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public double getCo2Kg() {
        return co2Kg;
    }

    public void setCo2Kg(double co2Kg) {
        this.co2Kg = co2Kg;
    }
}
