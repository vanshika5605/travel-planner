package com.dgoil.travelPlanner.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user_Details")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetails {
    @Id
    private String _id;
    private String email;
    private String name;
    private String password;
    private String destination;
    private enum role{user,tester,admin};
    private String gender;
    private String updatedAt;
    private String defaultCurrency;
}
