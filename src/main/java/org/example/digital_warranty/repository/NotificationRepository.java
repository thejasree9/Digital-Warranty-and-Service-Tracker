package org.example.digital_warranty.repository;

import org.example.digital_warranty.entity.Notification;
import org.example.digital_warranty.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Get all notifications of a user (latest first)
    List<Notification> findByUserOrderByCreatedAtDesc(User user);

    // Get unread notifications
    List<Notification> findByUserAndIsReadFalseOrderByCreatedAtDesc(User user);

    // Count unread notifications
    long countByUserAndIsReadFalse(User user);
}