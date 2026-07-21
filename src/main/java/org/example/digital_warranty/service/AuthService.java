package org.example.digital_warranty.service;

import org.example.digital_warranty.dto.AuthResponse;
import org.example.digital_warranty.dto.LoginRequest;
import org.example.digital_warranty.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}