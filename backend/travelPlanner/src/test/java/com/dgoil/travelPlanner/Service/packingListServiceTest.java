package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.DAO.PackingList;
import com.dgoil.travelPlanner.Model.DAO.UserItinerary;
import com.dgoil.travelPlanner.Repository.packingListRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

public class packingListServiceTest {

    @Mock
    private packingListRepo myPackingListRepo;

    @Mock
    private userItineraryService myUserItineraryService;

    @InjectMocks
    private packingListService packingListService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveList_InsertNew() {
        PackingList packingList = new PackingList();
        packingList.setTripID("123");

        when(myPackingListRepo.getByTripId("123")).thenReturn(Optional.empty());
        when(myUserItineraryService.getUserItinerary("123")).thenReturn(Optional.of(new UserItinerary()));

        packingListService.saveList(packingList);

        verify(myPackingListRepo, times(1)).insert(packingList);
        verify(myUserItineraryService, times(1)).saveItinerary(any(UserItinerary.class));
    }

    @Test
    public void testGetList_Success() {
        PackingList packingList = new PackingList();
        packingList.setTripID("123");

        when(myPackingListRepo.getByTripId("123")).thenReturn(Optional.of(packingList));

        PackingList result = packingListService.getList("123");

        assertThat(result).isEqualTo(packingList);
    }

    @Test
    public void testGetList_Failure() {
        when(myPackingListRepo.getByTripId("123")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> packingListService.getList("123"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("Packing list not found for TripID: 123");
    }
}
