package com.dgoil.travelPlanner.Model.DAO;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a document in the "userDetails" MongoDB collection.
 */
@Document(collection = "userDetails") // Maps this class to the "userDetails" MongoDB collection.
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetails {
    @Id // Unique identifier for the document.
    private String _id;
    private String email;
    private String name;
    private String password;
    private String location;
    private String role;
    private String gender;
    private LocalDateTime updatedAt;
    private String defaultCurrency;
}
