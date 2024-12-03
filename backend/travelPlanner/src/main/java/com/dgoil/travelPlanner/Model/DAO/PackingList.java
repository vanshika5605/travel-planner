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
    private String email;
    private List<String> toPackList;
    private String tripID;
    private List<SuggestedList> suggestedList;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SuggestedList{
        private String item;
        private String priority;
    }
}
