package com.dgoil.travelPlanner.Controller;

import com.dgoil.travelPlanner.Model.DAO.PackingList;
import com.dgoil.travelPlanner.Model.DTO.ApiResponse;
import com.dgoil.travelPlanner.Service.packingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class packingListController {
    @Autowired
    private packingListService mypackingListService;

    @PostMapping("/saveList")
    public ResponseEntity<ApiResponse<String>> saveList(@RequestBody PackingList packingList) {
        try {
            mypackingListService.saveList(packingList);
            ApiResponse<String> response = new ApiResponse<String>(true, "Packing List saved!", null);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            ApiResponse<String> response = new ApiResponse<String>(false, "Exception thrown!", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/getList/{tripId}")
    public ResponseEntity<ApiResponse<PackingList>> saveList(@PathVariable String tripId) {
        try{
            PackingList packingList = mypackingListService.getList(tripId);
            ApiResponse<PackingList> response = new ApiResponse<>(true, packingList, null);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            ApiResponse<PackingList> response = new ApiResponse<PackingList>(false, new PackingList(), e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
