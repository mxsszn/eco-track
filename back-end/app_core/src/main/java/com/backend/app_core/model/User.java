package com.backend.app_core.model;

import java.io.Serializable;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;



@Entity
@Table(name = "Users")
@EntityListeners(AuditingEntityListener.class)
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long user_id;

    @NotBlank
    @Column(unique = true)
    String email;

    @NotBlank
    @Column(unique = true)
    String username;

    @NotBlank
    String password_hash;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    private Date created_at;

    @LastModifiedDate
    private Date updated_at;


    public User() {
        super();

    }


    public User(String email, String username, String password_hash) {
        super();
        this.email = email;
        this.username = username;
        this.password_hash = password_hash;
    }


    public Long getUser_id() {
        return user_id;
    }


    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    public String getUsername() {
        return username;
    }


    public void setUsername(String username) {
        this.username = username;
    }


    public String getPassword_hash() {
        return password_hash;
    }


    public void setPassword_hash(String password_hash) {
        this.password_hash = password_hash;
    }


    public Date getCreated_at() {
        return created_at;
    }


    public Date getUpdated_at() {
        return updated_at;
    }

}
