package org.example.digital_warranty.service;

import org.example.digital_warranty.dto.ChangePasswordRequestDTO;
import org.example.digital_warranty.dto.ProfileResponseDTO;
import org.example.digital_warranty.dto.ProfileUpdateRequestDTO;

public interface ProfileService {

    ProfileResponseDTO getProfile();

    ProfileResponseDTO updateProfile(ProfileUpdateRequestDTO request);

    void changePassword(ChangePasswordRequestDTO request);
}