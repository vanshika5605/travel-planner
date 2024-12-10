package com.dgoil.travelPlanner.Model;

import com.dgoil.travelPlanner.Model.DAO.UserDetails;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test class for UserDetails DAO.
 * Tests initialization and behavior of the UserDetails object.
 */
public class UserDetailsTest {

    private UserDetails user;

    @BeforeEach
    public void setUp() {
        user = new UserDetails();
        user.setEmail("test@example.com");
        user.setName("Test User");
        user.setPassword("password123");
        user.setLocation("Test Location");
        user.setRole("user");
        user.setGender("Male");
        user.setUpdatedAt(LocalDateTime.now());
        user.setDefaultCurrency("USD");
    }

    @Test
    public void testUserDetailsInitialization() {
        // Verify that the user is correctly initialized
        assertNotNull(user);
        assertEquals("test@example.com", user.getEmail());
        assertEquals("Test User", user.getName());
        assertEquals("password123", user.getPassword());
        assertEquals("Test Location", user.getLocation());
        assertEquals("user", user.getRole());
        assertEquals("Male", user.getGender());
        assertNotNull(user.getUpdatedAt());
        assertEquals("USD", user.getDefaultCurrency());
    }

    @Test
    public void testSettersAndGetters() {
        // Verify that setters and getters work correctly
        user.setEmail("newemail@example.com");
        user.setName("New User");
        user.setPassword("newpassword123");
        user.setLocation("New Location");
        user.setRole("admin");
        user.setGender("Female");
        user.setUpdatedAt(LocalDateTime.now().minusDays(1));
        user.setDefaultCurrency("EUR");

        // Verify the updated values
        assertEquals("newemail@example.com", user.getEmail());
        assertEquals("New User", user.getName());
        assertEquals("newpassword123", user.getPassword());
        assertEquals("New Location", user.getLocation());
        assertEquals("admin", user.getRole());
        assertEquals("Female", user.getGender());
        assertNotNull(user.getUpdatedAt());
        assertEquals("EUR", user.getDefaultCurrency());
    }

    @Test
    public void testRoleEnum() {
        // Validate the role property (string-based role, could be adjusted if the enum is used)
        user.setRole("admin");
        assertEquals("admin", user.getRole());

        user.setRole("user");
        assertEquals("user", user.getRole());
    }

    @Test
    public void testDefaultValues() {
        // Test the default values when a new UserDetails object is created
        UserDetails newUser = new UserDetails();
        assertNull(newUser.getEmail());
        assertNull(newUser.getName());
        assertNull(newUser.getPassword());
        assertNull(newUser.getLocation());
        assertNull(newUser.getRole());
        assertNull(newUser.getGender());
        assertNull(newUser.getUpdatedAt());
        assertNull(newUser.getDefaultCurrency());
    }

    @Test
    public void testEqualsAndHashCode() {
        // Create another user with the same email and check equality
        UserDetails anotherUser = new UserDetails();
        anotherUser.setEmail("test@example.com");
        anotherUser.setName("Test User");
        anotherUser.setPassword("password123");
        anotherUser.setLocation("Test Location");
        anotherUser.setRole("user");
        anotherUser.setGender("Male");
        anotherUser.setUpdatedAt(LocalDateTime.now());
        anotherUser.setDefaultCurrency("USD");

        assertEquals(user, anotherUser); // Assuming equals() is overridden properly
        assertEquals(user.hashCode(), anotherUser.hashCode());
    }

    @Test
    public void testToString() {
        // Verify the toString method if implemented
        String userString = user.toString();
        assertNotNull(userString);
        assertTrue(userString.contains("test@example.com"));
        assertTrue(userString.contains("Test User"));
    }
}
