package org.example.digital_warranty.controller;

import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.dto.response.ApiResponse;
import org.example.digital_warranty.service.CloudinaryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
public class FileController {

    private final CloudinaryService cloudinaryService;

    @PostMapping(
            value = "/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ApiResponse<String>> upload(
            @RequestParam("file") MultipartFile file) {

        String fileUrl = cloudinaryService.uploadFile(file);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        ApiResponse.<String>builder()
                                .success(true)
                                .message("File uploaded successfully")
                                .data(fileUrl)
                                .build()
                );
    }
}