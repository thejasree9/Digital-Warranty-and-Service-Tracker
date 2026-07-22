package org.example.digital_warranty.service;
import org.example.digital_warranty.dto.NotificationResponse;
import org.example.digital_warranty.dto.UnreadCountResponse;
import org.example.digital_warranty.entity.User;

import java.util.List;

public interface NotificationService {

    // Create a notification
    void createNotification(User user, String title, String message);

    // Get all notifications of logged-in user
    List<NotificationResponse> getNotifications();

    // Get unread notification count
    UnreadCountResponse getUnreadCount();

    // Mark a notification as read
    void markAsRead(Long notificationId);

    // Mark all notifications as read
    void markAllAsRead();

    // Delete a notification
    void deleteNotification(Long notificationId);
}