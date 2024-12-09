package com.dgoil.travelPlanner.Model.DAO;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a document in the "packingList" MongoDB collection.
 */
@Document(collection = "packingList") // Maps this class to the "packingList" MongoDB collection.
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PackingList {
    @Id // Unique identifier for the document.
    /**
     * List of packing list items associated with this document.
     * Packing list items are divided into 5 buckets.
     */
    private String _id;
    private String tripID;
    private PackingObj packingList;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PackingObj{
        private List<Item> essentialDocuments;
        private List<Item> clothing;
        private List<Item> toiletries;
        private List<Item> electronics;
        private List<Item> miscellaneous;

        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class Item{
            private String name;
            private Integer quantity;
            private Boolean packed;
        }
    }
}
