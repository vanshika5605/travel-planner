package com.dgoil.travelPlanner.Model.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
//@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success; // Indicates whether the API call was successful.
    private T data; // Generic type to hold the response data.
    private String errorMessage; // Error message in case the API call fails.
    /**
     * Constructor to initialize all fields of the response.
     * 
     * @param success       Whether the API call was successful.
     * @param data          The data returned in the response.
     * @param errorMessage  Error message for failed API calls.
     */
    public ApiResponse(boolean success, T data, String errorMessage){
        this.success = success;
        this.data = data;
        this.errorMessage = errorMessage;
    }
}
