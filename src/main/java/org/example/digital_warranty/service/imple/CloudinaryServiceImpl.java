package org.example.digital_warranty.service.imple;

import com.cloudinary.Cloudinary;
import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.service.CloudinaryService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryServiceImpl implements CloudinaryService {

    private final Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file) {

        try {

            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    Map.of()
            );

            return result.get("secure_url").toString();

        } catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException(
                    "File upload failed: " + e.getMessage()
            );

        }
    }
}