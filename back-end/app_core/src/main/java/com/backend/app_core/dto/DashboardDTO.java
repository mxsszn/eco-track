package com.backend.app_core.dto;

import java.util.List;

public class DashboardDTO {

    private String displayName;
    private String tierName;
    private double weeklyCo2Saved;
    private int weeklyJourneys;
    private int weeklyPoints;

    private List<WeeklyPointsDTO> weeklyPointsChart;
    private List<RecentJourneyDTO> recentJourneys;

    public DashboardDTO() {
    }

    public DashboardDTO(String displayName, String tierName, double weeklyCo2Saved, int weeklyJourneys, int weeklyPoints,
                        List<WeeklyPointsDTO> weeklyPointsChart, List<RecentJourneyDTO> recentJourneys) {
        this.displayName = displayName;
        this.tierName = tierName;
        this.weeklyCo2Saved = weeklyCo2Saved;
        this.weeklyJourneys = weeklyJourneys;
        this.weeklyPoints = weeklyPoints;
        this.weeklyPointsChart = weeklyPointsChart;
        this.recentJourneys = recentJourneys;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getTierName() {
        return tierName;
    }

    public void setTierName(String tierName) {
        this.tierName = tierName;
    }

    public double getWeeklyCo2Saved() {
        return weeklyCo2Saved;
    }

    public void setWeeklyCo2Saved(double weeklyCo2Saved) {
        this.weeklyCo2Saved = weeklyCo2Saved;
    }

    public int getWeeklyJourneys() {
        return weeklyJourneys;
    }

    public void setWeeklyJourneys(int weeklyJourneys) {
        this.weeklyJourneys = weeklyJourneys;
    }

    public int getWeeklyPoints() {
        return weeklyPoints;
    }

    public void setWeeklyPoints(int weeklyPoints) {
        this.weeklyPoints = weeklyPoints;
    }

    public List<WeeklyPointsDTO> getWeeklyPointsChart() {
        return weeklyPointsChart;
    }

    public void setWeeklyPointsChart(List<WeeklyPointsDTO> weeklyPointsChart) {
        this.weeklyPointsChart = weeklyPointsChart;
    }

    public List<RecentJourneyDTO> getRecentJourneys() {
        return recentJourneys;
    }

    public void setRecentJourneys(List<RecentJourneyDTO> recentJourneys) {
        this.recentJourneys = recentJourneys;
    }
}