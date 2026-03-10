package com.backend.app_core.model;


import org.springframework.data.annotation.CreatedDate;
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
@Table(name="Saved_routes")
public class Saved_route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long saved_route_id;

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

    Float last_distance_km;

    @NotNull
    Integer times_used;

    Date last_used_at;

    @CreatedDate
    private Date created_at;


    public Saved_route() {
        super();
    }


    public Saved_route(User user, Transport_mode transport_mode, String start_location,
            String destination, Float last_distance_km, Integer times_used, Date last_used_at) {
        this.user = user;
        this.transport_mode = transport_mode;
        this.start_location = start_location;
        this.destination = destination;
        this.last_distance_km = last_distance_km;
        this.times_used = times_used;
        this.last_used_at = last_used_at;
    }


    public Long getSaved_route_id() {
        return saved_route_id;
    }


    public void setSaved_route_id(Long saved_route_id) {
        this.saved_route_id = saved_route_id;
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


    public Float getLast_distance_km() {
        return last_distance_km;
    }


    public void setLast_distance_km(Float last_distance_km) {
        this.last_distance_km = last_distance_km;
    }


    public Integer getTimes_used() {
        return times_used;
    }


    public void setTimes_used(Integer times_used) {
        this.times_used = times_used;
    }


    public Date getLast_used_at() {
        return last_used_at;
    }


    public void setLast_used_at(Date last_used_at) {
        this.last_used_at = last_used_at;
    }


    public Date getCreated_at() {
        return created_at;
    }


    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }



    


    




    
}
