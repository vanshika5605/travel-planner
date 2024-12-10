package com.dgoil.travelPlanner.Model.DAO;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a document in the "featuresList" MongoDB collection.
 */
@Document(collection = "featuresList") // Maps this class to the "featuresList" MongoDB collection.
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeaturesList {
    @Id // Unique identifier for the document.
    /**
     * List of features associated with this document.
     * Each feature contains a name and description.
     */
    private String _id;
    public List<Features> features;
    /**
     * Represents an individual feature with its name and description.
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Features{
        public String feature; // Name of the feature.
        public String description; // Description of the feature.
    }
}
