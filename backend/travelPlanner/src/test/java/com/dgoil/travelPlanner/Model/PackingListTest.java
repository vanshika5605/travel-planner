package com.dgoil.travelPlanner.Model;

import com.dgoil.travelPlanner.Model.DAO.PackingList;
import com.dgoil.travelPlanner.Repository.packingListRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.TestPropertySource;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
@TestPropertySource(properties = "spring.mongodb.embedded.version=4.0.2") // Embedded MongoDB version
class PackingListTest {

    @Autowired
    private packingListRepo packingListRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    void testPackingListObjectCreation() {
        // Arrange
        PackingList.PackingObj.Item item = new PackingList.PackingObj.Item("Passport", 1, false);
        assertNotNull(item);
        assertEquals("Passport", item.getName());
        assertEquals(1, item.getQuantity());
        assertFalse(item.getPacked());

        PackingList.PackingObj packingObj = new PackingList.PackingObj();
        packingObj.setEssentialDocuments(Collections.singletonList(item));
        assertNotNull(packingObj);
        assertEquals(1, packingObj.getEssentialDocuments().size());

        PackingList packingList = new PackingList("1", "trip123", packingObj);
        assertNotNull(packingList);
        assertEquals("trip123", packingList.getTripID());
        assertEquals(1, packingList.getPackingList().getEssentialDocuments().size());
    }

    @Test
    void testPackingListSerialization() throws Exception {
        // Arrange
        PackingList.PackingObj packingObj = new PackingList.PackingObj();
        packingObj.setEssentialDocuments(Arrays.asList(
                new PackingList.PackingObj.Item("Passport", 1, false),
                new PackingList.PackingObj.Item("Visa", 1, false)
        ));
        packingObj.setClothing(Collections.singletonList(
                new PackingList.PackingObj.Item("T-Shirt", 3, true)
        ));

        PackingList packingList = new PackingList("1", "trip123", packingObj);

        // Act
        String json = objectMapper.writeValueAsString(packingList);
        PackingList deserialized = objectMapper.readValue(json, PackingList.class);

        // Assert
        assertEquals("trip123", deserialized.getTripID());
        assertNotNull(deserialized.getPackingList());
        assertEquals(2, deserialized.getPackingList().getEssentialDocuments().size());
        assertEquals(1, deserialized.getPackingList().getClothing().size());
        assertEquals("T-Shirt", deserialized.getPackingList().getClothing().get(0).getName());
        assertTrue(deserialized.getPackingList().getClothing().get(0).getPacked());
    }

    @Test
    void testSaveAndRetrievePackingList() {
        // Arrange
        PackingList.PackingObj packingObj = new PackingList.PackingObj();
        packingObj.setEssentialDocuments(Arrays.asList(
                new PackingList.PackingObj.Item("Passport", 1, false),
                new PackingList.PackingObj.Item("Visa", 1, false)
        ));
        packingObj.setElectronics(Collections.singletonList(
                new PackingList.PackingObj.Item("Phone Charger", 1, true)
        ));

        PackingList packingList = new PackingList("1", "trip123", packingObj);

        // Act
        packingListRepository.save(packingList);
        Optional<PackingList> retrieved = packingListRepository.findById("1");

        // Assert
        assertTrue(retrieved.isPresent());
        assertEquals("trip123", retrieved.get().getTripID());
        assertEquals(2, retrieved.get().getPackingList().getEssentialDocuments().size());
        assertEquals(1, retrieved.get().getPackingList().getElectronics().size());
        assertEquals("Phone Charger", retrieved.get().getPackingList().getElectronics().get(0).getName());
    }

    @Test
    void testUpdatePackingList() {
        // Arrange
        PackingList.PackingObj packingObj = new PackingList.PackingObj();
        packingObj.setToiletries(Collections.singletonList(
                new PackingList.PackingObj.Item("Toothbrush", 1, false)
        ));

        PackingList packingList = new PackingList("1", "trip123", packingObj);
        packingListRepository.save(packingList);

        // Act
        packingList.getPackingList().setToiletries(Collections.singletonList(
                new PackingList.PackingObj.Item("Toothbrush", 2, true)
        ));
        packingListRepository.save(packingList);

        Optional<PackingList> updated = packingListRepository.findById("1");

        // Assert
        assertTrue(updated.isPresent());
        assertEquals(1, updated.get().getPackingList().getToiletries().size());
        assertEquals(2, updated.get().getPackingList().getToiletries().get(0).getQuantity());
        assertTrue(updated.get().getPackingList().getToiletries().get(0).getPacked());
    }

    @Test
    void testDeletePackingList() {
        // Arrange
        PackingList.PackingObj packingObj = new PackingList.PackingObj();
        packingObj.setMiscellaneous(Collections.singletonList(
                new PackingList.PackingObj.Item("Travel Adapter", 1, false)
        ));

        PackingList packingList = new PackingList("1", "trip123", packingObj);
        packingListRepository.save(packingList);

        // Act
        packingListRepository.deleteById("1");
        Optional<PackingList> retrieved = packingListRepository.findById("1");

        // Assert
        assertFalse(retrieved.isPresent());
    }
}
