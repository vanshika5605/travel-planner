package com.dgoil.travelPlanner.Controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
//@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private T data;
    private String errorMessage;

    ApiResponse(boolean success, T data, String errorMessage){
        this.success = success;
        this.data = data;
        this.errorMessage = errorMessage;
    }
}
