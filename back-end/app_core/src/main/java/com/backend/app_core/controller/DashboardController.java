package com.backend.app_core.controller;

import com.backend.app_core.dto.DashboardDTO;
import com.backend.app_core.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/{userId}")
    public DashboardDTO getDashboard(@PathVariable Long userId) {
        return dashboardService.getDashboardData(userId);
    }
}