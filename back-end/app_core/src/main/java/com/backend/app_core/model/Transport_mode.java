package com.backend.app_core.model;
import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;


import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;




@Entity
@Table(name="Transport_modes")
public class Transport_mode {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long transport_mode_id;

    @NotBlank
    String mode_name;

    @NotNull
    Float co2_factor_per_km;

    @NotNull
    boolean is_baseline;

    public Transport_mode() {
        super();
    }

    public Transport_mode(String mode_name, Float co2_factor_per_km, boolean is_baseline) {
        super();
        this.mode_name = mode_name;
        this.co2_factor_per_km = co2_factor_per_km;
        this.is_baseline = is_baseline;
    }

    public Long getTransport_mode_id() {
        return transport_mode_id;
    }

    public void setTransport_mode_id(Long transport_mode_id) {
        this.transport_mode_id = transport_mode_id;
    }

    public String getMode_name() {
        return mode_name;
    }

    public void setMode_name(String mode_name) {
        this.mode_name = mode_name;
    }

    public Float getCo2_factor_per_km() {
        return co2_factor_per_km;
    }

    public void setCo2_factor_per_km(Float co2_factor_per_km) {
        this.co2_factor_per_km = co2_factor_per_km;
    }

    public boolean isIs_baseline() {
        return is_baseline;
    }

    public void setIs_baseline(boolean is_baseline) {
        this.is_baseline = is_baseline;
    }

}
