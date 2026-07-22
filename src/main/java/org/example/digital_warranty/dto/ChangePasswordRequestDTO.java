package org.example.digital_warranty.dto;

import lombok.Data;

@Data
public class ChangePasswordRequestDTO {

    private String currentPassword;

    private String newPassword;

    private String confirmPassword;
}