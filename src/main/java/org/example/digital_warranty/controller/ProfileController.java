package org.example.digital_warranty.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.dto.ChangePasswordRequestDTO;
import org.example.digital_warranty.dto.ProfileResponseDTO;
import org.example.digital_warranty.dto.ProfileUpdateRequestDTO;
import org.example.digital_warranty.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ProfileResponseDTO> getProfile() {

        return ResponseEntity.ok(profileService.getProfile());
    }

    @PutMapping
    public ResponseEntity<ProfileResponseDTO> updateProfile(
            @Valid @RequestBody ProfileUpdateRequestDTO request
    ) {

        return ResponseEntity.ok(profileService.updateProfile(request));
    }
    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestBody ChangePasswordRequestDTO request) {

        profileService.changePassword(request);

        return ResponseEntity.ok("Password changed successfully");
    }
}