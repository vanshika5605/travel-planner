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

    /**
     * Endpoint to save a packing list for a specific trip.
     * 
     * @param packingList The packing list to be saved (in request body).
     * @return A ResponseEntity with an ApiResponse indicating success or failure.
     */
    @PostMapping("/saveList") // POST request to save a packing list.
    public ResponseEntity<ApiResponse<String>> saveList(@RequestBody PackingList packingList) {
        try {
            mypackingListService.saveList(packingList);
            ApiResponse<String> response = new ApiResponse<String>(true, "Packing List saved!", null);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            ApiResponse<String> response = new ApiResponse<String>(false, "Exception thrown!", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Endpoint to retrieve a packing list based on a trip ID.
     * 
     * @param tripId The trip ID to fetch the packing list for (from the path variable).
     * @return A ResponseEntity containing the ApiResponse with the packing list or error.
     */
    @GetMapping("/getList/{tripId}") // GET request to retrieve a packing list by trip ID.
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
