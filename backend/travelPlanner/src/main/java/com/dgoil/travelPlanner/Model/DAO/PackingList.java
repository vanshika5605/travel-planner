package com.dgoil.travelPlanner.Model.DAO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "packingList")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PackingList {
    @Id
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
