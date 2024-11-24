package com.dgoil.travelPlanner.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "features_List")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeaturesList {
    @Id
    public String _id;
    public List<Features> features;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Features{
        public String feature;
        public String description;
    }
}
