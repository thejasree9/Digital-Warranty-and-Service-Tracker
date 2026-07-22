package org.example.digital_warranty.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.example.digital_warranty.entity.Role;

@Getter
@Setter
@Builder
public class UserResponse {

    private Long id;
    private String name;
    private String email;
    private Role role;
}