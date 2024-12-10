package com.dgoil.travelPlanner.Repository;

import com.dgoil.travelPlanner.Model.DAO.FeaturesList;
import com.dgoil.travelPlanner.Model.DAO.FeaturesList.Features;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class featuresListRepoTest {

    @Autowired
    private featuresListRepo featuresListRepo;

    @BeforeEach
    public void setup() {
        featuresListRepo.deleteAll(); // Clear database before each test
    }

    @Test
    public void testFindAllSuccess() {
        // Prepare test data
        Features feature1 = new Features("Accommodation", "Find best places to stay");
        Features feature2 = new Features("Transportation", "Manage travel routes");

        FeaturesList featuresList1 = new FeaturesList("1", Arrays.asList(feature1));
        FeaturesList featuresList2 = new FeaturesList("2", Arrays.asList(feature2));

        // Save test data
        featuresListRepo.saveAll(Arrays.asList(featuresList1, featuresList2));

        // Execute the method
        List<FeaturesList> allFeatures = featuresListRepo.findAll();

        // Validate
        assertThat(allFeatures).hasSize(2);
        assertThat(allFeatures.get(0).getFeatures().get(0).getFeature()).isEqualTo("Accommodation");
        assertThat(allFeatures.get(1).getFeatures().get(0).getFeature()).isEqualTo("Transportation");
    }

    @Test
    public void testSaveAndFindById() {
        // Prepare test data
        Features feature = new Features("Sightseeing", "Explore popular attractions");
        FeaturesList featuresList = new FeaturesList("1", Arrays.asList(feature));

        // Save the document
        FeaturesList savedFeaturesList = featuresListRepo.save(featuresList);

        // Retrieve it by ID
        Optional<FeaturesList> retrievedFeaturesList = featuresListRepo.findById(savedFeaturesList.get_id());

        // Validate
        assertThat(retrievedFeaturesList).isPresent();
        assertThat(retrievedFeaturesList.get().getFeatures().get(0).getFeature()).isEqualTo("Sightseeing");
    }

    @Test
    public void testFindAllEmptyDatabase() {
        // Execute the method
        List<FeaturesList> allFeatures = featuresListRepo.findAll();

        // Validate
        assertThat(allFeatures).isEmpty();
    }
}


//package com.dgoil.travelPlanner.Repository;
//
//import com.dgoil.travelPlanner.Model.DAO.FeaturesList;
//import com.dgoil.travelPlanner.Model.DAO.FeaturesList.Features;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//import org.testcontainers.containers.MongoDBContainer;
//import org.testcontainers.utility.DockerImageName;
//
//import java.util.Arrays;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//@ExtendWith(SpringExtension.class)
//@SpringBootTest
//public class FeaturesListRepoTest {
//
//    // Define the MongoDB container using the latest image from Docker Hub
//    private static final MongoDBContainer mongoDBContainer = new MongoDBContainer(DockerImageName.parse("mongo:latest"));
//
//    @Autowired
//    private featuresListRepo myfeaturesListRepo;
//
//    @Autowired
//    private MongoTemplate mongoTemplate;
//
//    @BeforeEach
//    public void setUp() {
//        // Start the MongoDB container
//        mongoDBContainer.start();
//
//        // Set the MongoDB URI to Testcontainers container's URI
//        System.setProperty("spring.data.mongodb.uri", mongoDBContainer.getReplicaSetUrl());
//    }
//
//    @Test
//    public void testSaveAndFindFeatureList() {
//        // Prepare test data
//        Features feature1 = new Features("Accommodation", "Find best places to stay");
//        Features feature2 = new Features("Transportation", "Manage travel routes");
//
//        FeaturesList featuresList = new FeaturesList();
//        featuresList.setFeatures(Arrays.asList(feature1, feature2));
//
//        // Save the FeaturesList to the database
//        myfeaturesListRepo.save(featuresList);
//
//        // Retrieve the list from the repository
//        FeaturesList retrievedFeaturesList = myfeaturesListRepo.findById(featuresList.getId()).orElse(null);
//
//        // Verify the data
//        assertThat(retrievedFeaturesList).isNotNull();
//        assertThat(retrievedFeaturesList.getFeatures()).hasSize(2);
//        assertThat(retrievedFeaturesList.getFeatures().get(0).getFeature()).isEqualTo("Accommodation");
//        assertThat(retrievedFeaturesList.getFeatures().get(1).getFeature()).isEqualTo("Transportation");
//    }
//
//    @Test
//    public void testDeleteFeatureList() {
//        // Prepare test data
//        Features feature1 = new Features("Accommodation", "Find best places to stay");
//        FeaturesList featuresList = new FeaturesList();
//        featuresList.setFeatures(Arrays.asList(feature1));
//
//        // Save the FeaturesList to the repository
//        FeaturesList savedFeaturesList = myfeaturesListRepo.save(featuresList);
//
//        // Delete the saved FeaturesList
//        myfeaturesListRepo.deleteById(savedFeaturesList.getId());
//
//        // Verify that the FeaturesList was deleted
//        FeaturesList retrievedFeaturesList = myfeaturesListRepo.findById(savedFeaturesList.getId()).orElse(null);
//        assertThat(retrievedFeaturesList).isNull();
//    }
//
//    @AfterEach
//    public void tearDown() {
//        // Stop the container after the tests
//        mongoDBContainer.stop();
//    }
//}
