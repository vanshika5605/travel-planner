# Travel Planner - Test Cases Documentation

## Overview
This document outlines test cases designed to ensure the smooth functionality of the Travel Planner application. Each test case includes its unique identifier, description, test steps, and expected results.

---

## **1. Signup for Already Existing User**
**Test Case ID:** TC001  
**Description:** Attempt to sign up with an email already registered.  
**Test Steps:**  
1. Navigate to the Signup page.  
2. Enter an already registered email.  
3. Fill in the password and confirm password fields.  
4. Click "Sign Up."  
**Expected Result:** Error message: "User already exists. Please try with a different email."

---

## **2. Signup with Non-matching Passwords**
**Test Case ID:** TC002  
**Description:** Attempt to sign up with different passwords in the password and confirm password fields.  
**Test Steps:**  
1. Navigate to the Signup page.  
2. Enter a valid email.  
3. Enter different values in the password and confirm password fields.  
4. Click "Sign Up."  
**Expected Result:** Error message: "Please fill all fields correctly or ensure passwords match."

---

## **3. Successful Signup**
**Test Case ID:** TC003  
**Description:** Successfully sign up with valid credentials.  
**Test Steps:**  
1. Navigate to the Signup page.  
2. Enter a valid email, matching passwords, and required details.  
3. Click "Sign Up."  
**Expected Result:** User account created successfully, and the user is redirected to the dashboard.

---

## **4. Login with Wrong Password**
**Test Case ID:** TC004  
**Description:** Attempt to log in with a valid email but an incorrect password.  
**Test Steps:**  
1. Navigate to the Login page.  
2. Enter a registered email and an incorrect password.  
3. Click "Login."  
**Expected Result:** Error message: "Invalid credentials. Please check your password."

---

## **5. Login with Correct Password**
**Test Case ID:** TC005  
**Description:** Attempt to log in with valid credentials.  
**Test Steps:**  
1. Navigate to the Login page.  
2. Enter a registered email and the correct password.  
3. Click "Login."  
**Expected Result:** User successfully logs in and is redirected to the dashboard.

---

## **6. Application Unable to Connect to Database**
**Test Case ID:** TC006  
**Description:** Application fails to connect to the database.  
**Test Steps:**  
1. Simulate database downtime.  
2. Attempt to log in or access features requiring the database.  
**Expected Result:** Error message: "Service unavailable. Please try again later."

---

## **7. Spring Application Down**
**Test Case ID:** TC007  
**Description:** Simulate Spring application server downtime.  
**Test Steps:**  
1. Stop the Spring application server.  
2. Attempt to access any Spring-based service.  
**Expected Result:** Application shows "Error: Could not connect to the server."

---

## **8. Flask Application Down**
**Test Case ID:** TC008  
**Description:** Simulate Flask application server downtime.  
**Test Steps:**  
1. Stop the Flask application server.  
2. Attempt to access any Flask-based service.  
**Expected Result:** Application shows "Error: Could not connect to the server."

---

## **9. Itinerary Generate and Save**
**Test Case ID:** TC009  
**Description:** Generate and save an itinerary.  
**Test Steps:**  
1. Log in to the application.  
2. Provide trip details (destination, duration, preferences).  
3. Generate and save the itinerary.  
**Expected Result:** Itinerary successfully generated and saved.

---

## **10. Generate Packing List, Mark as Packed**
**Test Case ID:** TC010  
**Description:** Generate a packing list and mark items as packed.  
**Test Steps:**  
1. Log in to the application.  
2. Provide trip details for packing list generation.  
3. Generate the packing list.  
4. Mark some or all items as packed.  
**Expected Result:** Packing list successfully generated, and items marked as packed are displayed accordingly.

---

## **11. Admin Dashboard**
**Test Case ID:** TC011  
**Description:** Access and view statistics on the admin dashboard.  
**Test Steps:**  
1. Log in as an admin.  
2. Navigate to the admin dashboard.  
**Expected Result:** Dashboard displays user statistics, trip counts, popular destinations, and system health metrics.

---

## **12. Long Weekends**
**Test Case ID:** TC012  
**Description:** Calculate long weekends using the Long Weekend Calculator.  
**Test Steps:**  
1. Open the Long Weekend Calculator.  
2. Select a month and year.  
**Expected Result:** Long weekends are highlighted based on holidays and weekends.

---

**End of Test Cases**