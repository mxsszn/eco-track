package com.backend.app_core.dto;

public class WeeklyPointsDTO {

    private String day;
    private int points;

    public WeeklyPointsDTO() {
    }

    public WeeklyPointsDTO(String day, int points) {
        this.day = day;
        this.points = points;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}