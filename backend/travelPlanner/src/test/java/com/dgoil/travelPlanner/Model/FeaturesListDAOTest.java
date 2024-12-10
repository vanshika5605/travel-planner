package com.dgoil.travelPlanner.Model;

import com.dgoil.travelPlanner.Model.DAO.FeaturesList;
import com.dgoil.travelPlanner.Model.DAO.FeaturesList.Features;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.Arrays;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataMongoTest
public class FeaturesListDAOTest {

    @Autowired
    private MongoTemplate mongoTemplate;

    @BeforeEach
    public void setUp() {
        // Clean the database before each test
        mongoTemplate.getDb().drop();
    }

    @Test
    public void testPersistAndRetrieveFeaturesList() {
        // Create Features and FeaturesList instances
        Features feature1 = new Features("Accommodation", "Best places to stay");
        Features feature2 = new Features("Transport", "Manage routes and schedules");

        FeaturesList featuresList = new FeaturesList();
        featuresList.setFeatures(Arrays.asList(feature1, feature2));

        // Save FeaturesList to MongoDB
        FeaturesList savedFeaturesList = mongoTemplate.save(featuresList, "features_list");

        // Retrieve FeaturesList from MongoDB
        Optional<FeaturesList> retrievedFeaturesList = Optional.ofNullable(
                mongoTemplate.findById(savedFeaturesList.get_id(), FeaturesList.class)
        );

        // Assertions
        assertThat(retrievedFeaturesList).isPresent();
        assertThat(retrievedFeaturesList.get().getFeatures()).hasSize(2);
        assertThat(retrievedFeaturesList.get().getFeatures().get(0).getFeature()).isEqualTo("Accommodation");
    }

    @Test
    public void testUpdateFeaturesList() {
        // Create and save FeaturesList
        Features feature = new Features("Accommodation", "Initial description");
        FeaturesList featuresList = new FeaturesList();
        featuresList.setFeatures(Arrays.asList(feature));
        FeaturesList savedFeaturesList = mongoTemplate.save(featuresList, "features_list");

        // Update the description of the feature
        savedFeaturesList.getFeatures().get(0).setDescription("Updated description");
        mongoTemplate.save(savedFeaturesList, "features_list");

        // Retrieve and verify the update
        FeaturesList updatedFeaturesList = mongoTemplate.findById(savedFeaturesList.get_id(), FeaturesList.class);

        assertThat(updatedFeaturesList).isNotNull();
        assertThat(updatedFeaturesList.getFeatures().get(0).getDescription()).isEqualTo("Updated description");
    }

    @Test
    public void testDeleteFeaturesList() {
        // Create and save FeaturesList
        Features feature = new Features("Dining", "Find best restaurants");
        FeaturesList featuresList = new FeaturesList();
        featuresList.setFeatures(Arrays.asList(feature));
        FeaturesList savedFeaturesList = mongoTemplate.save(featuresList, "features_list");

        // Delete FeaturesList from MongoDB
        mongoTemplate.remove(savedFeaturesList);

        // Verify deletion
        FeaturesList retrievedFeaturesList = mongoTemplate.findById(savedFeaturesList.get_id(), FeaturesList.class);
        assertThat(retrievedFeaturesList).isNull();
    }
}
