package com.dgoil.travelPlanner.Repository;

import com.dgoil.travelPlanner.Model.DAO.UserDetails;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class userDetailsRepoTest {

    @Mock
    private MongoTemplate mongoTemplate;

    @InjectMocks
    private userDetailsRepo myUserDetailsRepo;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testFindByEmail_Successful() {
        // Arrange
        String email = "test@example.com";
        UserDetails mockUser = new UserDetails();
        mockUser.setEmail(email);

        when(mongoTemplate.findOne(any(), eq(UserDetails.class))).thenReturn(mockUser);

        // Act
        Optional<UserDetails> result = myUserDetailsRepo.findByEmail(email);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(email, result.get().getEmail());
        verify(mongoTemplate).findOne(any(), eq(UserDetails.class));
    }

    @Test
    void testFindByEmail_UserNotFound() {
        // Arrange
        String email = "nonexistent@example.com";
        when(mongoTemplate.findOne(any(), eq(UserDetails.class))).thenReturn(null);

        // Act
        Optional<UserDetails> result = myUserDetailsRepo.findByEmail(email);

        // Assert
        assertFalse(result.isPresent());
        verify(mongoTemplate).findOne(any(), eq(UserDetails.class));
    }

    @Test
    void testGetRecentUsers_Successful() {
        // Arrange
        LocalDateTime date = LocalDateTime.now().minusDays(30);
        UserDetails mockUser = new UserDetails();
        mockUser.setEmail("user@example.com");

        when(mongoTemplate.find(any(), eq(UserDetails.class))).thenReturn(List.of(mockUser));

        // Act
        List<UserDetails> result = myUserDetailsRepo.getRecentUsers(date);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("user@example.com", result.get(0).getEmail());
        verify(mongoTemplate).find(any(), eq(UserDetails.class));
    }
}
