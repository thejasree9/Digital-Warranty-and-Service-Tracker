package org.example.digital_warranty.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.dto.ChangePasswordRequestDTO;
import org.example.digital_warranty.dto.ProfileResponseDTO;
import org.example.digital_warranty.dto.ProfileUpdateRequestDTO;
import org.example.digital_warranty.dto.response.ApiResponse;
import org.example.digital_warranty.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ApiResponse<ProfileResponseDTO>> getProfile() {

        return ResponseEntity.ok(
                ApiResponse.<ProfileResponseDTO>builder()
                        .success(true)
                        .message("Profile fetched successfully")
                        .data(profileService.getProfile())
                        .build()
        );
    }

    @PutMapping
    public ResponseEntity<ApiResponse<ProfileResponseDTO>> updateProfile(
            @Valid @RequestBody ProfileUpdateRequestDTO request) {

        return ResponseEntity.ok(
                ApiResponse.<ProfileResponseDTO>builder()
                        .success(true)
                        .message("Profile updated successfully")
                        .data(profileService.updateProfile(request))
                        .build()
        );
    }

    @PostMapping("/change-password")
    public ResponseEntity<ApiResponse<String>> changePassword(
            @RequestBody ChangePasswordRequestDTO request) {

        profileService.changePassword(request);

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Password changed successfully")
                        .data("Success")
                        .build()
        );
    }
}