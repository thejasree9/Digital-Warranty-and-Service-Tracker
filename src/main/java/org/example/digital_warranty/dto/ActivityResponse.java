package org.example.digital_warranty.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ActivityResponse {

    private String title;

    private String description;

    private LocalDate date;

    private String type;

}