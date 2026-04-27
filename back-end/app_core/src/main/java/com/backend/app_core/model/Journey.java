package com.backend.app_core.model;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.FetchType;

@Entity
@Table(name="Journeys")
public class Journey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long journey_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="transport_mode_id")
    private Transport_mode transport_mode;

    @NotBlank
    String start_location;

    @NotBlank
    String destination;

    @NotNull
    Date journey_date;

    @NotNull
    Float distance_km;

    @NotNull
    Float selected_mode_emission;

    @NotNull
    Float co2_saved;

    @NotNull
    Integer points_awarded;

    String route_geometry;

    @CreatedDate
    private Date created_at;

    @LastModifiedDate
    private Date updated_at;

    public Journey() {
        super();
    }

    public Journey(String start_location, String destination, Date journey_date, Float distance_km, Float selected_mode_emission, Float co2_saved, Integer points_awarded, String route_geometry) {
        super();
        this.start_location = start_location;
        this.destination = destination;
        this.journey_date = journey_date;
        this.distance_km = distance_km;
        this.selected_mode_emission = selected_mode_emission;
        this.co2_saved = co2_saved;
        this.points_awarded = points_awarded;
        this.route_geometry = route_geometry;
    }

    public Journey(User user, Transport_mode transport_mode, String start_location, String destination, Date journey_date, Float distance_km, Float selected_mode_emission, Float co2_saved, Integer points_awarded, String route_geometry) {
        super();
        this.user = user;
        this.transport_mode = transport_mode;
        this.start_location = start_location;
        this.destination = destination;
        this.journey_date = journey_date;
        this.distance_km = distance_km;
        this.selected_mode_emission = selected_mode_emission;
        this.co2_saved = co2_saved;
        this.points_awarded = points_awarded;
        this.route_geometry = route_geometry;
    }

    public Long getJourney_id() {
        return journey_id;
    }

    public void setJourney_id(Long journey_id) {
        this.journey_id = journey_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Transport_mode getTransport_mode() {
        return transport_mode;
    }

    public void setTransport_mode(Transport_mode transport_mode) {
        this.transport_mode = transport_mode;
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

    public Float getSelected_mode_emission() {
        return selected_mode_emission;
    }

    public void setSelected_mode_emission(Float selected_mode_emission) {
        this.selected_mode_emission = selected_mode_emission;
    }

    public Float getCo2_saved() {
        return co2_saved;
    }

    public void setCo2_saved(Float co2_saved) {
        this.co2_saved = co2_saved;
    }

    public Integer getPoints_awarded() {
        return points_awarded;
    }

    public void setPoints_awarded(Integer points_awarded) {
        this.points_awarded = points_awarded;
    }

    public String getRoute_geometry() {
        return route_geometry;
    }

    public void setRoute_geometry(String route_geometry) {
        this.route_geometry = route_geometry;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Date getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(Date updated_at) {
        this.updated_at = updated_at;
    }
}