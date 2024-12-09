package com.dgoil.travelPlanner.Model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * Represents Login details for a particular user.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginDetails {
    private String email;
    private String password;
}
