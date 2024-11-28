package com.dgoil.travelPlanner.Model.DAO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "userDetails")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetails {
    @Id
    private String _id;
    private String email;
    private String name;
    private String password;
    private String location;
    private enum role{user,tester,admin};
    private String gender;
    private LocalDateTime updatedAt;
    private String defaultCurrency;
}
