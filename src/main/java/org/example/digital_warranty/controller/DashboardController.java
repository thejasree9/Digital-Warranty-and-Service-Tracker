package org.example.digital_warranty.controller;

import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.dto.DashboardResponse;
import org.example.digital_warranty.dto.response.ApiResponse;
import org.example.digital_warranty.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboard() {

        DashboardResponse response = dashboardService.getDashboard();

        return ResponseEntity.ok(
                ApiResponse.<DashboardResponse>builder()
                        .success(true)
                        .message("Dashboard data fetched successfully")
                        .data(response)
                        .build()
        );
    }
}