package org.example.digital_warranty.service;

import io.jsonwebtoken.Jwts;

public interface JwtService {

    String generateToken(String email);

    String extractUsername(String token);

    boolean isTokenValid(String token, String email);


}