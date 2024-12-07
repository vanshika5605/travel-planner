// // App.test.js
// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import App from "../App";
// import backend from "../components/Utils/backend";

// // Mock the backend API calls
// jest.mock("../components/Utils/backend");

// describe("App Component Tests", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test("renders the Loader initially", () => {
//     render(
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     );

//     expect(screen.getByText(/loading/i)).toBeInTheDocument();
//   });

//   test("fetches holidays and exchange rates on mount", async () => {
//     backend.getHolidays.mockResolvedValueOnce({ data: [{ date: "2024-01-01" }] });
//     backend.getExchangeRates.mockResolvedValueOnce({
//       data: { rates: { USD: 1, EUR: 0.85 } },
//     });

//     render(
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     );

//     await waitFor(() => {
//       expect(backend.getHolidays).toHaveBeenCalledTimes(2); // For 2024 and 2025
//       expect(backend.getExchangeRates).toHaveBeenCalled();
//     });
//   });

//   test("renders the Home page at root route `/`", async () => {
//     render(
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     );

//     await waitFor(() => {
//       expect(screen.getByText(/welcome/i)).toBeInTheDocument(); // Assuming "Welcome" text exists in Home.js
//     });
//   });

//   test("navigates to the SignUp page when clicking the signup link", async () => {
//     render(
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     );

//     fireEvent.click(screen.getByText(/Sign Up/i)); // Assuming "Sign Up" link exists

//     await waitFor(() => {
//       expect(screen.getByText(/create your account/i)).toBeInTheDocument(); // Assuming the text in SignUp.js
//     });
//   });

//   test("renders AdminPage if logged in as an admin", async () => {
//     backend.getHolidays.mockResolvedValueOnce({ data: [] });
//     backend.getExchangeRates.mockResolvedValueOnce({ data: { rates: {} } });

//     render(
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     );

//     fireEvent.click(screen.getByText(/login/i)); // Assuming there's a login link/button

//     await waitFor(() => {
//       expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument(); // Assuming AdminPage has this text
//     });
//   });

//   test("redirects to Home on unknown routes", async () => {
//     window.history.pushState({}, "Test page", "/unknown");

//     render(
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     );

//     await waitFor(() => {
//       expect(screen.getByText(/welcome/i)).toBeInTheDocument(); // Redirected to Home
//     });
//   });
// });
