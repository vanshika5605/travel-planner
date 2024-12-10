package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.DAO.UserDetails;
import com.dgoil.travelPlanner.Repository.userDetailsRepo;
import com.dgoil.travelPlanner.Model.DTO.AdminStatistics;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class userDetailsServiceTest {

    @Mock
    private userDetailsRepo myUserDetailsRepo;

    @Mock
    private userItineraryService userItineraryService;

    @InjectMocks
    private userDetailsService myUserDetailsService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testValidateUser_Successful() {
        // Arrange
        String email = "test@example.com";
        String password = "password123";
        UserDetails mockUser = new UserDetails();
        mockUser.setEmail(email);
        mockUser.setPassword(password);

        when(myUserDetailsRepo.findByEmail(email)).thenReturn(Optional.of(mockUser));

        // Act
        UserDetails result = myUserDetailsService.validateUser(email, password);

        // Assert
        assertNotNull(result);
        assertEquals(email, result.getEmail());
        verify(myUserDetailsRepo).findByEmail(email);
    }

    @Test
    void testValidateUser_UserNotFound() {
        // Arrange
        String email = "test@example.com";
        String password = "password123";

        when(myUserDetailsRepo.findByEmail(email)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () ->
                myUserDetailsService.validateUser(email, password)
        );
        verify(myUserDetailsRepo).findByEmail(email);
    }

    @Test
    void testCheckDuplicate_Successful() {
        // Arrange
        UserDetails newUser = new UserDetails();
        newUser.setEmail("newuser@example.com");

        when(myUserDetailsRepo.findByEmail("newuser@example.com")).thenReturn(Optional.empty());

        // Act
        myUserDetailsService.checkDuplicate(newUser);

        // Assert
        verify(myUserDetailsRepo).findByEmail("newuser@example.com");
        verify(myUserDetailsRepo).save(newUser);
    }

    @Test
    void testCheckDuplicate_UserExists() {
        // Arrange
        UserDetails newUser = new UserDetails();
        newUser.setEmail("existing@example.com");
        UserDetails existingUser = new UserDetails();
        existingUser.setEmail("existing@example.com");

        when(myUserDetailsRepo.findByEmail("existing@example.com")).thenReturn(Optional.of(existingUser));

        // Act & Assert
        assertThrows(IllegalArgumentException.class, () -> myUserDetailsService.checkDuplicate(newUser));
        verify(myUserDetailsRepo).findByEmail("existing@example.com");
        verify(myUserDetailsRepo, never()).save(newUser);
    }

    @Test
    void testGetAllUsers_Successful() {
        // Arrange
        List<UserDetails> mockUsers = List.of(
                new UserDetails("id1", "user1@example.com", "Test User 1", "password1", "Location 1", "user", "Male", LocalDateTime.now(), "USD"),
                new UserDetails("id2", "user2@example.com", "Test User 2", "password2", "Location 2", "user", "Female", LocalDateTime.now(), "EUR")
        );
        when(myUserDetailsRepo.findAll()).thenReturn(mockUsers);

        // Act
        List<UserDetails> result = myUserDetailsService.getAllUsers();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        verify(myUserDetailsRepo).findAll();
    }

    @Test
    void testGetAdminDetails_Successful() {
        // Arrange
        AdminStatistics mockAdminStats = new AdminStatistics();
        mockAdminStats.setTotalUsers(100);
        mockAdminStats.setNewUsers(20);
        mockAdminStats.setUpcomingTrips(5);
        mockAdminStats.setPastTrips(10);

        when(myUserDetailsRepo.count()).thenReturn(100L);
        when(myUserDetailsRepo.getRecentUsers(any())).thenReturn(List.of(new UserDetails()));
        when(userItineraryService.pastTrips()).thenReturn(10);
        when(userItineraryService.upcomingTrips()).thenReturn(5);
        when(userItineraryService.getPopularDestination()).thenReturn(List.of(new AdminStatistics.PopularDestinations(5, "Paris")));

        // Act
        AdminStatistics result = myUserDetailsService.getAdminDetails();

        // Assert
        assertNotNull(result);
        assertEquals(100, result.getTotalUsers());
        assertEquals(20, result.getNewUsers());
        assertEquals(10, result.getPastTrips());
        assertEquals(5, result.getUpcomingTrips());
        assertNotNull(result.getPopularDestinations());
        verify(myUserDetailsRepo).count();
        verify(myUserDetailsRepo).getRecentUsers(any());
    }
}
