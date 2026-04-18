package com.backend.app_core.dto;




public class UserDTO {
    String email;
    String username;
    String password_hash;

    public UserDTO(String email, String username, String password_hash) {
        super();
        this.email = email;
        this.username = username;
        this.password_hash = password_hash;
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


    
}
