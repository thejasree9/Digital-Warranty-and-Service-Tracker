package org.example.digital_warranty.service.imple;

import lombok.RequiredArgsConstructor;
import org.example.digital_warranty.dto.NotificationResponse;
import org.example.digital_warranty.dto.UnreadCountResponse;
import org.example.digital_warranty.entity.Notification;
import org.example.digital_warranty.entity.User;
import org.example.digital_warranty.exception.ResourceNotFoundException;
import org.example.digital_warranty.repository.NotificationRepository;
import org.example.digital_warranty.repository.UserRepository;
import org.example.digital_warranty.service.NotificationService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    public void createNotification(User user, String title, String message) {

        Notification notification = Notification.builder()
                .user(user)
                .title(title)
                .message(message)
                .isRead(false)
                .build();

        notificationRepository.save(notification);
    }

    @Override
    public List<NotificationResponse> getNotifications() {

        User user = getCurrentUser();

        return notificationRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public UnreadCountResponse getUnreadCount() {

        User user = getCurrentUser();

        long count = notificationRepository.countByUserAndIsReadFalse(user);

        return new UnreadCountResponse(count);
    }

    @Override
    public void markAsRead(Long notificationId) {

        User user = getCurrentUser();

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));

        if (!notification.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        notification.setRead(true);

        notificationRepository.save(notification);
    }

    @Override
    public void markAllAsRead() {

        User user = getCurrentUser();

        List<Notification> notifications =
                notificationRepository.findByUserAndIsReadFalseOrderByCreatedAtDesc(user);

        notifications.forEach(notification -> notification.setRead(true));

        notificationRepository.saveAll(notifications);
    }

    @Override
    public void deleteNotification(Long notificationId) {

        User user = getCurrentUser();

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));

        if (!notification.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }

        notificationRepository.delete(notification);
    }

    private NotificationResponse mapToResponse(Notification notification) {

        return NotificationResponse.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .isRead(notification.isRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }
}