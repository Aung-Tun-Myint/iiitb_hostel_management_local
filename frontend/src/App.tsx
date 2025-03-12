import React, { useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginContext } from './context/loginContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/containers/Login/LoginContainer';
import RoomAllotment from './components/containers/RoomAllotment/RoomAllotmentContainer';
import { isUserLoggedIn } from './apis/login_backend';
import AddRoomDataScreen from './screens/AddRoomData/AddRoomDataScreen';


// Protected route wrapper
const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
  useEffect(() => {
    // Check if user has a session stored but context isn't updated
    if (!isLoggedIn && isUserLoggedIn()) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, setIsLoggedIn]);
  
  return isLoggedIn ? element : <Navigate to="/" />;
};

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
  
  // Check if user has valid session on app load
  useEffect(() => {
    if (isUserLoggedIn()) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);
  
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/room-allotment" /> : <Login />} />
        
        {/* Protected Routes - Using RoomAllotment as home page */}
        <Route path="/room-allotment" element={<ProtectedRoute element={<RoomAllotment />} />} />
        
        {/* Other protected routes */}
        <Route path="/occupancy-view" element={<ProtectedRoute element={<div>Occupancy View</div>} />} />
        <Route path="/occupancy-manage" element={<ProtectedRoute element={<div>Manage Occupancy</div>} />} />
        <Route path="/hostel-view" element={<ProtectedRoute element={<div>View Hostels</div>} />} />
        <Route path="/hostel-manage" element={<ProtectedRoute element={<div>Manage Hostels</div>} />} />
        <Route path="/room-view" element={<ProtectedRoute element={<div>View Rooms</div>} />} />
        <Route path="/check-in" element={<ProtectedRoute element={<div>New Check In</div>} />} />
        <Route path="/check-in-history" element={<ProtectedRoute element={<div>Check In History</div>} />} />
        <Route path="/process-checkout" element={<ProtectedRoute element={<div>Process Checkout</div>} />} />
        <Route path="/checkout-history" element={<ProtectedRoute element={<div>Checkout History</div>} />} />
        <Route path="/add-resident-data" element={<ProtectedRoute element={<div>Add Resident Data</div>} />} />
        <Route path="/add-room-data" element={<ProtectedRoute element={<AddRoomDataScreen />} />} />
        <Route path="/present-occupancy" element={<ProtectedRoute element={<div>Present Occupancy</div>} />} />
        <Route path="/vacated-list" element={<ProtectedRoute element={<div>Vacated List</div>} />} />

        
        {/* 404 Route */}
        <Route path="*" element={isLoggedIn ? <Navigate to="/room-allotment" /> : <Navigate to="/" />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
