package com.dgoil.travelPlanner.Controller;

import com.dgoil.travelPlanner.Model.DAO.UserDetails;
import com.dgoil.travelPlanner.Model.DTO.AdminStatistics;
import com.dgoil.travelPlanner.Model.DTO.ApiResponse;
import com.dgoil.travelPlanner.Model.DTO.LoginDetails;
import com.dgoil.travelPlanner.Service.userDetailsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class userDetailsControllerTest {

    @Mock
    private userDetailsService myUserDetailsService;

    @InjectMocks
    private userDetailsController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLogin_Successful() {
        // Arrange
        LoginDetails loginDetails = new LoginDetails("test@example.com", "password");
        UserDetails mockUser = new UserDetails();
        mockUser.setEmail("test@example.com");

        when(myUserDetailsService.validateUser("test@example.com", "password"))
                .thenReturn(mockUser);

        // Act
        ResponseEntity<ApiResponse<UserDetails>> response = userController.login(loginDetails);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isSuccess());
        assertEquals(mockUser, response.getBody().getData());
        verify(myUserDetailsService).validateUser("test@example.com", "password");
    }

    @Test
    void testLogin_Unauthorized() {
        // Arrange
        LoginDetails loginDetails = new LoginDetails("test@example.com", "wrongpassword");

        when(myUserDetailsService.validateUser("test@example.com", "wrongpassword"))
                .thenThrow(new IllegalArgumentException("Invalid credentials"));

        // Act
        ResponseEntity<ApiResponse<UserDetails>> response = userController.login(loginDetails);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertFalse(response.getBody().isSuccess());
        assertEquals("Invalid credentials", response.getBody().getErrorMessage());
        verify(myUserDetailsService).validateUser("test@example.com", "wrongpassword");
    }

    @Test
    void testAddUser_Successful() {
        // Arrange
        UserDetails newUser = new UserDetails();
        newUser.setEmail("newuser@example.com");
        newUser.setPassword("password");

        doNothing().when(myUserDetailsService).checkDuplicate(newUser);

        // Act
        ResponseEntity<ApiResponse<String>> response = userController.addUser(newUser);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isSuccess());
        assertEquals("User Signed Up", response.getBody().getData());
        verify(myUserDetailsService).checkDuplicate(newUser);
    }

    @Test
    void testAddUser_DuplicateUser() {
        // Arrange
        UserDetails duplicateUser = new UserDetails();
        duplicateUser.setEmail("existing@example.com");

        doThrow(new IllegalArgumentException("User already exists"))
                .when(myUserDetailsService).checkDuplicate(duplicateUser);

        // Act
        ResponseEntity<ApiResponse<String>> response = userController.addUser(duplicateUser);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertFalse(response.getBody().isSuccess());
        assertEquals("User already exists", response.getBody().getErrorMessage());
        verify(myUserDetailsService).checkDuplicate(duplicateUser);
    }

    @Test
    void testGetAllUsers_Successful() {
        // Arrange
        List<UserDetails> mockUserList = new ArrayList<>();
        UserDetails user1 = new UserDetails();
        user1.setEmail("user1@example.com");
        UserDetails user2 = new UserDetails();
        user2.setEmail("user2@example.com");
        mockUserList.add(user1);
        mockUserList.add(user2);

        when(myUserDetailsService.getAllUsers()).thenReturn(mockUserList);

        // Act
        ResponseEntity<ApiResponse<List<UserDetails>>> response = userController.getAllUsers();

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isSuccess());
        assertEquals(2, response.getBody().getData().size());
        verify(myUserDetailsService).getAllUsers();
    }

    @Test
    void testGetAllUsers_EmptyList() {
        // Arrange
        when(myUserDetailsService.getAllUsers()).thenReturn(new ArrayList<>());

        // Act
        ResponseEntity<ApiResponse<List<UserDetails>>> response = userController.getAllUsers();

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isSuccess());
        assertTrue(response.getBody().getData().isEmpty());
        verify(myUserDetailsService).getAllUsers();
    }

    @Test
    void testGetAdminDetails_Successful() {
        // Arrange
        AdminStatistics mockAdminStats = new AdminStatistics();
        mockAdminStats.setTotalUsers(100);

        when(myUserDetailsService.getAdminDetails()).thenReturn(mockAdminStats);

        // Act
        ResponseEntity<ApiResponse<AdminStatistics>> response = userController.getAdminDetails();

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isSuccess());
        assertEquals(100, response.getBody().getData().getTotalUsers());
        verify(myUserDetailsService).getAdminDetails();
    }

    @Test
    void testGetUser_Successful() {
        // Arrange
        String emailId = "existing@example.com";
        UserDetails existingUser = new UserDetails();
        existingUser.setEmail(emailId);

        when(myUserDetailsService.getUser(emailId)).thenReturn(Optional.of(existingUser));

        // Act
        ResponseEntity<ApiResponse<Optional<UserDetails>>> response = userController.getUser(emailId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().isSuccess());
        assertTrue(response.getBody().getData().isPresent());
        assertEquals(emailId, response.getBody().getData().get().getEmail());
        verify(myUserDetailsService).getUser(emailId);
    }

    @Test
    void testGetUser_NotFound() {
        // Arrange
        String emailId = "nonexistent@example.com";

        when(myUserDetailsService.getUser(emailId)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<ApiResponse<Optional<UserDetails>>> response = userController.getUser(emailId);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertFalse(response.getBody().isSuccess());
        assertEquals("No records found for the given emailId: " + emailId,
                response.getBody().getErrorMessage());
        verify(myUserDetailsService).getUser(emailId);
    }
}