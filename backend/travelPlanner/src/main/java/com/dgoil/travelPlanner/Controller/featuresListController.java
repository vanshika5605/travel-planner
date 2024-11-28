package com.dgoil.travelPlanner.Controller;

import com.dgoil.travelPlanner.Model.DAO.FeaturesList;
import com.dgoil.travelPlanner.Service.featuresListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class featuresListController {
    @Autowired
    private featuresListService myfeaturesListService;

    @GetMapping("/getFeatures")
    public List<FeaturesList> getAllFeatures() {
        return myfeaturesListService.getAllFeatures();
    }
}
