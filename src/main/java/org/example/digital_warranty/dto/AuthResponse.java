package org.example.digital_warranty.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AuthResponse {

    private String token;
    private String message;

    // Old response fields
    private String name;
    private String email;
    private String role;

    // New response field
    private UserResponse user;

    // Constructor for new response
    public AuthResponse(String token, String message, UserResponse user) {
        this.token = token;
        this.message = message;
        this.user = user;

        if (user != null) {
            this.name = user.getName();
            this.email = user.getEmail();
            this.role = user.getRole().name();
        }
    }

    // Constructor for old response
    public AuthResponse(String token, String message,
                        String name, String email, String role) {
        this.token = token;
        this.message = message;
        this.name = name;
        this.email = email;
        this.role = role;
    }
}