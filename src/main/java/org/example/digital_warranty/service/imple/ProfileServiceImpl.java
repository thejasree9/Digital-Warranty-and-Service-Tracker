package org.example.digital_warranty.service.imple;

import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.dto.ChangePasswordRequestDTO;
import org.example.digital_warranty.dto.ProfileResponseDTO;
import org.example.digital_warranty.dto.ProfileUpdateRequestDTO;
import org.example.digital_warranty.entity.User;
import org.example.digital_warranty.repository.UserRepository;
import org.example.digital_warranty.service.ProfileService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public ProfileResponseDTO getProfile() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ProfileResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .profileImage(user.getProfileImage())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }

    @Override
    public ProfileResponseDTO updateProfile(ProfileUpdateRequestDTO request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update only editable fields
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setProfileImage(request.getProfileImage());

        User updatedUser = userRepository.save(user);

        return ProfileResponseDTO.builder()
                .id(updatedUser.getId())
                .name(updatedUser.getName())
                .email(updatedUser.getEmail()) // Read-only
                .phone(updatedUser.getPhone())
                .profileImage(updatedUser.getProfileImage())
                .role(updatedUser.getRole())
                .createdAt(updatedUser.getCreatedAt())
                .build();
    }
    @Override
    public void changePassword(ChangePasswordRequestDTO request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Current password is incorrect"
            );
        }

        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Passwords do not match"
            );
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }
}