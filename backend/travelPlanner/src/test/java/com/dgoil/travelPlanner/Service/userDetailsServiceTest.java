package com.dgoil.travelPlanner.Service;

import com.dgoil.travelPlanner.Model.DAO.UserDetails;
import com.dgoil.travelPlanner.Model.DTO.AdminStatistics;
import com.dgoil.travelPlanner.Repository.userDetailsRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class userDetailsServiceTest {

    @Mock
    private userDetailsRepo mockUserDetailsRepo;

    @Mock
    private userItineraryService mockUserItineraryService;

    @InjectMocks
    private userDetailsService userDetailsService;

    private UserDetails testUser;
    private static final String TEST_EMAIL = "test@example.com";
    private static final String TEST_PASSWORD = "password123";

    @BeforeEach
    void setUp() {
        testUser = new UserDetails();
        testUser.setEmail(TEST_EMAIL);
        testUser.setPassword(TEST_PASSWORD);
    }

    @Test
    void validateUser_ValidCredentials_ShouldReturnUser() {
        // Arrange
        when(mockUserDetailsRepo.findByEmail(TEST_EMAIL))
                .thenReturn(Optional.of(testUser));

        // Act
        UserDetails validatedUser = userDetailsService.validateUser(TEST_EMAIL, TEST_PASSWORD);

        // Assert
        assertNotNull(validatedUser);
        assertEquals(TEST_EMAIL, validatedUser.getEmail());
    }

    @Test
    void validateUser_InvalidCredentials_ShouldThrowException() {
        // Arrange
        when(mockUserDetailsRepo.findByEmail(TEST_EMAIL))
                .thenReturn(Optional.of(testUser));

        // Act & Assert
        assertThrows(IllegalArgumentException.class,
                () -> userDetailsService.validateUser(TEST_EMAIL, "wrongPassword")
        );
    }

    @Test
    void checkDuplicate_NewUser_ShouldSaveUser() {
        // Arrange
        when(mockUserDetailsRepo.findByEmail(TEST_EMAIL))
                .thenReturn(Optional.empty());

        // Act
        userDetailsService.checkDuplicate(testUser);

        // Assert
        verify(mockUserDetailsRepo).save(testUser);
        assertNotNull(testUser.getUpdatedAt());
    }

    @Test
    void checkDuplicate_ExistingEmail_ShouldThrowException() {
        // Arrange
        when(mockUserDetailsRepo.findByEmail(TEST_EMAIL))
                .thenReturn(Optional.of(testUser));

        // Act & Assert
        assertThrows(IllegalArgumentException.class,
                () -> userDetailsService.checkDuplicate(testUser)
        );
    }

    @Test
    void getAllUsers_ShouldReturnUserList() {
        // Arrange
        List<UserDetails> expectedUsers = Arrays.asList(testUser);
        when(mockUserDetailsRepo.findAll()).thenReturn(expectedUsers);

        // Act
        List<UserDetails> actualUsers = userDetailsService.getAllUsers();

        // Assert
        assertEquals(expectedUsers.size(), actualUsers.size());
        assertEquals(expectedUsers.get(0).getEmail(), actualUsers.get(0).getEmail());
    }

    @Test
    void getUser_ExistingEmail_ShouldReturnUser() {
        // Arrange
        when(mockUserDetailsRepo.findByEmail(TEST_EMAIL))
                .thenReturn(Optional.of(testUser));

        // Act
        Optional<UserDetails> user = userDetailsService.getUser(TEST_EMAIL);

        // Assert
        assertTrue(user.isPresent());
        assertEquals(TEST_EMAIL, user.get().getEmail());
    }

    @Test
    void getUser_NullEmail_ShouldThrowException() {
        // Act & Assert
        assertThrows(IllegalArgumentException.class,
                () -> userDetailsService.getUser(null)
        );
    }

    @Test
    void getAdminDetails_ShouldReturnStatistics() {
        // Arrange
        when(mockUserDetailsRepo.count()).thenReturn(10L);

        List<UserDetails> recentUsers = Arrays.asList(testUser);
        when(mockUserDetailsRepo.getRecentUsers(any(LocalDateTime.class)))
                .thenReturn(recentUsers);

        when(mockUserItineraryService.pastTrips()).thenReturn(5);
        when(mockUserItineraryService.upcomingTrips()).thenReturn(3);

        List<AdminStatistics.PopularDestinations> popularDestinations = Arrays.asList(
                new AdminStatistics.PopularDestinations(2, "Paris")
        );
        when(mockUserItineraryService.getPopularDestination())
                .thenReturn(popularDestinations);

        // Act
        AdminStatistics adminStatistics = userDetailsService.getAdminDetails();

        // Assert
        assertEquals(10, adminStatistics.getTotalUsers());
        assertEquals(1, adminStatistics.getNewUsers());
        assertEquals(5, adminStatistics.getPastTrips());
        assertEquals(3, adminStatistics.getUpcomingTrips());
        assertEquals(1, adminStatistics.getPopularDestinations().size());
        assertEquals("Paris", adminStatistics.getPopularDestinations().get(0).getDestination());
    }
}