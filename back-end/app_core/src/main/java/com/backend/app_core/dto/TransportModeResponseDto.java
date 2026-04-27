package com.backend.app_core.dto;

public class TransportModeResponseDto {
    private Long transport_mode_id;
    private String mode_name;
    private Float co2_factor_per_km;
    private boolean is_baseline;

    public TransportModeResponseDto() {
    }

    public Long getTransport_mode_id() { return transport_mode_id; }
    public void setTransport_mode_id(Long transport_mode_id) { this.transport_mode_id = transport_mode_id; }

    public String getMode_name() { return mode_name; }
    public void setMode_name(String mode_name) { this.mode_name = mode_name; }

    public Float getCo2_factor_per_km() { return co2_factor_per_km; }
    public void setCo2_factor_per_km(Float co2_factor_per_km) { this.co2_factor_per_km = co2_factor_per_km; }

    public boolean isIs_baseline() { return is_baseline; }
    public void setIs_baseline(boolean is_baseline) { this.is_baseline = is_baseline; }
}