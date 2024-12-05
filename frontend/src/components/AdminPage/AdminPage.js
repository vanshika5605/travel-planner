import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import backend from "../Utils/backend";
import { 
    Users, 
    Plus, 
    Plane, 
    Calendar,
    Map,
    Globe 
  } from 'lucide-react';

import { Bar } from 'react-chartjs-2';
import { WorldMap } from "react-svg-worldmap";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// TopoJSON file for world map data
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const userData = [
    { country: "cn", value: 100 },
    { country: "in", value: 80 },
    { country: "us", value: 120 },
    { country: "id", value: 60 },
    { country: "br", value: 70 },  
    { country: "bd", value: 16 },  
    { country: "ru", value: 176 },  
    { country: "mx", value: 12 },
  ];

const AdminPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 5234,
    newUsers: 456,
    upcomingTrips: 342,
    pastTrips: 1245,
    popularMonths: [
      { name: 'January', count: 210 },
      { name: 'February', count: 180 },
      { name: 'March', count: 250 },
      { name: 'April', count: 300 },
      { name: 'May', count: 275 },
      { name: 'June', count: 320 }
    ],
    popularDestinations: [
      { name: 'Paris', trips: 842, country: 'France' },
      { name: 'Tokyo', trips: 723, country: 'Japan' },
      { name: 'New York', trips: 651, country: 'USA' },
      { name: 'London', trips: 589, country: 'UK' },
      { name: 'Sydney', trips: 412, country: 'Australia' }
    ],
    usersByCountry: [
      { code: 'US', name: 'United States', users: 1500 },
      { code: 'CA', name: 'Canada', users: 800 },
      { code: 'UK', name: 'United Kingdom', users: 650 },
      { code: 'AU', name: 'Australia', users: 450 },
      { code: 'DE', name: 'Germany', users: 350 },
      { code: 'FR', name: 'France', users: 300 },
      { code: 'JP', name: 'Japan', users: 250 },
      { code: 'IT', name: 'Italy', users: 200 },
      { code: 'BR', name: 'Brazil', users: 150 },
      { code: 'IN', name: 'India', users: 100 }
    ]
  });

  // Simulated data fetching
  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const fetchUserStatistics = async () => {
            const response = await backend.getUserStatistics(); 
            const data = await response.json();
            setStats(data);
        };
      } catch (error) {
        console.error('Failed to fetch admin statistics', error);
      }
    };

    fetchAdminStats();
  }, []);

  return (
    <div className="admin-dashboard">
      {/* Background Image */}
      <div 
        className="world-map-background" 
      />

      {/* Dashboard Container */}
      <div className="dashboard-container">
        {/* Total Users */}
        <div className="stat-card">
          <Users className="mb-4 text-blue-500" size={40} />
          <div className="stat-value">{stats.totalUsers}</div>
          <div className="stat-label">Total Users</div>
        </div>

        {/* New Users */}
        <div className="stat-card">
          <Plus className="mb-4 text-green-500" size={40} />
          <div className="stat-value">{stats.newUsers}</div>
          <div className="stat-label">New Users This Month</div>
        </div>

        {/* Upcoming Trips */}
        <div className="stat-card">
          <Plane className="mb-4 text-purple-500" size={40} />
          <div className="stat-value">{stats.upcomingTrips}</div>
          <div className="stat-label">Upcoming Trips</div>
        </div>

        {/* Past Trips */}
        <div className="stat-card">
          <Calendar className="mb-4 text-red-500" size={40} />
          <div className="stat-value">{stats.pastTrips}</div>
          <div className="stat-label">Past Trips</div>
        </div>

        {/* Popular Travel Months */}
        <div className="stat-card stat-card-large bar-chart">
        <Map className="mb-4 text-blue-500" size={40} />
          <h3 className="text-xl font-bold mb-4">Popular Travel Months</h3>
          <Bar data={{
            labels: stats.popularMonths.map((month) => month.name),
            datasets: [
              {
                label: "Best time to Travel",
                data: stats.popularMonths.map((month) => month.count),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
            }} />
        </div>

        {/* Popular Destinations */}
        <div className="stat-card stat-card-large">
          <Globe className="mb-4 text-green-500" size={40} />
          <h3 className="text-xl font-bold mb-4">Popular Destinations</h3>
          <table className="destinations-table">
            <thead>
              <tr>
                <th>Destination</th>
                <th>Country</th>
                <th>Trips</th>
              </tr>
            </thead>
            <tbody>
              {stats.popularDestinations.map((dest) => (
                <tr key={dest.name}>
                  <td>{dest.name}</td>
                  <td>{dest.country}</td>
                  <td>{dest.trips}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="world-map">
            <h3>Users Per Country</h3>
            <WorldMap color="teal" 
            value-suffix="people" 
            size="lg"
            tooltipBgColor="teal"
            data={userData}
            onHover={(country) => {
                const countryInfo = userData.find(item => item.country === country.id);
                console.log(countryInfo); // Access the data for the hovered country
              }}/>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;