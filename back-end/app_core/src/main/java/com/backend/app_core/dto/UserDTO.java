package com.backend.app_core.dto;


public class UserDTO {
    String email;
    String username;
    String password;

    public UserDTO(String email, String username, String password_hash) {
        super();
        this.email = email;
        this.username = username;
        this.password = password_hash;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password_hash) {
        this.password = password_hash;
    }


    
}
