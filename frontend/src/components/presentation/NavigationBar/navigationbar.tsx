import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../../context/loginContext';
import { NavbarContext } from '../../../context/navbarContext';
import iiitLogo from '../../../assets/iiit_logo.png';
import { 
  MdDashboard, 
  MdMeetingRoom, 
  MdLogin, 
  MdLogout, 
  MdPeople, 
  MdAssessment,
  MdKeyboardArrowRight,
  MdMenu,
  MdClose
} from 'react-icons/md';

interface NavBarProps {
  openSection?: string;
}

const ResponsiveNavigationBar: React.FC<NavBarProps> = ({ openSection = '' }) => {
  const navigate = useNavigate();
  const { navitem, setNavItem } = useContext(NavbarContext);
  const { setIsLoggedIn } = useContext(LoginContext);
  const [hoveredItem, setHoveredItem] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  type DropdownState = {
    dashboard: boolean;
    rooms: boolean;
    checkIn: boolean;
    checkOut: boolean;
    viewResidentRoom: boolean;
    reports: boolean;
  };

  const [dropdownOpen, setDropdownOpen] = useState<DropdownState>({
    dashboard: false,
    rooms: false,
    checkIn: false,
    checkOut: false,
    viewResidentRoom: false,
    reports: false
  });

  // Check screen size and update state
  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth < 1024;
      setIsSmallScreen(smallScreen);
      setSidebarOpen(!smallScreen);
    };

    // Initial check
    handleResize();

    // Add listener for window resize
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle initial open section if provided through props
  useEffect(() => {
    if (openSection && Object.keys(dropdownOpen).includes(openSection)) {
      setDropdownOpen(prev => ({
        ...prev,
        [openSection]: true
      }));
      setNavItem(openSection);
    }
  }, [openSection, setNavItem]);

  // Toggle dropdown sections
  const toggleDropdown = (section: keyof DropdownState) => {
    if (isSmallScreen && sidebarOpen) {
      // Don't close the sidebar on small screens when clicking a menu item
      setDropdownOpen({
        ...Object.keys(dropdownOpen).reduce((acc, key) => ({
          ...acc,
          [key]: key === section ? !dropdownOpen[section as keyof DropdownState] : false
        }), {} as DropdownState),
      });
    } else {
      setDropdownOpen({
        ...Object.keys(dropdownOpen).reduce((acc, key) => ({
          ...acc,
          [key]: false
        }), {} as DropdownState),
        [section]: !dropdownOpen[section]
      });
    }
    setNavItem(section);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Menu Toggle Button - Fixed position with better spacing and z-index */}
      <button 
        className={`lg:hidden fixed z-50 bg-[#025492] text-white p-2 rounded-md shadow-md
                   ${sidebarOpen 
                    ? 'top-4 left-[270px]' // Adjusted positioning when sidebar is open
                    : 'top-4 left-4'} // Standard positioning when sidebar is closed
                  transition-all duration-300 ease-in-out`}
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
      >
        {sidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>
      
      {/* Navigation Sidebar */}
      <div 
        className={`fixed h-full bg-[#025492] transition-all duration-300 ease-in-out z-40
                   ${sidebarOpen ? 'w-64 left-0' : 'w-16 -left-0'} 
                   lg:left-0`}
      >
        {/* Logo and Institute Name - Added more top padding for better mobile spacing */}
        <div className={`flex flex-col items-center pt-14 lg:pt-9 ${sidebarOpen ? 'px-4' : 'px-1'}`}>
          <div className="relative mb-2">
            <div className="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
              <img src={iiitLogo} alt="IIIT-B Logo" className="w-9 h-9" />
            </div>
          </div>
          {sidebarOpen && (
            <div className="text-white font-semibold text-center text-sm px-2 mb-6">
              International Institute of Information Technology Bangalore
            </div>
          )}
        </div>

        <div className="border-t border-gray-300 opacity-50 my-2"></div>

        {/* Navigation Items */}
        <nav className={`${sidebarOpen ? 'px-4' : 'px-1'} py-2`}>
          <ul className="space-y-2">
            {/* Dashboard */}
            <li>
              <button 
                onClick={() => toggleDropdown('dashboard')}
                className={`flex items-center w-full text-white text-left py-2 ${sidebarOpen ? 'px-4' : 'px-2 justify-center'} rounded-lg ${navitem === 'dashboard' ? 'bg-[#509CDB]' : ''}`}
                aria-expanded={dropdownOpen.dashboard}
              >
                <MdDashboard className="text-white" size={20} />
                {sidebarOpen && <span className="text-sm ml-2">Dashboard</span>}
              </button>
              {dropdownOpen.dashboard && sidebarOpen && (
                <ul className="ml-6 mt-1 space-y-1">
                  <li className="relative">
                    <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#509CDB]"></div>
                    <button 
                      className={`text-white py-2 pl-5 text-sm hover:bg-[#509CDB] hover:bg-opacity-50 rounded-lg w-full text-left flex items-center ${hoveredItem === 'dashboardView' ? 'bg-[#509CDB] bg-opacity-50' : ''}`}
                      onClick={() => navigate('/dashboard-view')}
                      onMouseEnter={() => setHoveredItem('dashboardView')}
                      onMouseLeave={() => setHoveredItem('')}
                    >
                      <MdKeyboardArrowRight className="mr-1" />
                      View Dashboard
                    </button>
                  </li>
                  <li className="relative">
                    <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#509CDB]"></div>
                    <button 
                      className={`text-white py-2 pl-5 text-sm hover:bg-[#509CDB] hover:bg-opacity-50 rounded-lg w-full text-left flex items-center ${hoveredItem === 'dashboardManage' ? 'bg-[#509CDB] bg-opacity-50' : ''}`}
                      onClick={() => navigate('/dashboard-manage')}
                      onMouseEnter={() => setHoveredItem('dashboardManage')}
                      onMouseLeave={() => setHoveredItem('')}
                    >
                      <MdKeyboardArrowRight className="mr-1" />
                      Manage Dashboard
                    </button>
                  </li>
                </ul>
              )}
            </li>
            
                       
            {/* Rooms */}
            <li>
              <button 
                onClick={() => toggleDropdown('rooms')}
                className={`flex items-center w-full text-white text-left py-2 ${sidebarOpen ? 'px-4' : 'px-2 justify-center'} rounded-lg ${navitem === 'rooms' ? 'bg-[#509CDB]' : ''}`}
              >
                <MdMeetingRoom className="text-white" size={20} />
                {sidebarOpen && <span className="text-sm ml-2">Room Allotment</span>}
              </button>
              {dropdownOpen.rooms && sidebarOpen && (
                <ul className="ml-6 mt-1 space-y-1">
                  <li className="relative">
                    <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#509CDB]"></div>
                    <button 
                      className={`text-white py-2 pl-5 text-sm hover:bg-[#509CDB] hover:bg-opacity-50 rounded-lg w-full text-left flex items-center ${hoveredItem === 'roomView' ? 'bg-[#509CDB] bg-opacity-50' : ''}`}
                      onClick={() => navigate('/room-view')}
                      onMouseEnter={() => setHoveredItem('roomView')}
                      onMouseLeave={() => setHoveredItem('')}
                    >
                      <MdKeyboardArrowRight className="mr-1" />
                      View Room Allotment
                    </button>
                  </li>
                  <li className="relative">
                    <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#509CDB]"></div>
                    <button 
                      className={`text-white py-2 pl-5 text-sm hover:bg-[#509CDB] hover:bg-opacity-50 rounded-lg w-full text-left flex items-center ${hoveredItem === 'roomAllotment' ? 'bg-[#509CDB] bg-opacity-50' : ''}`}
                      onClick={() => navigate('/room-allotment')}
                      onMouseEnter={() => setHoveredItem('roomAllotment')}
                      onMouseLeave={() => setHoveredItem('')}
                    >
                      <MdKeyboardArrowRight className="mr-1" />
                      Room Allotment
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* Check In */}
            <li>
              <button 
                onClick={() => toggleDropdown('checkIn')}
                className={`flex items-center w-full text-white text-left py-2 ${sidebarOpen ? 'px-4' : 'px-2 justify-center'} rounded-lg ${navitem === 'checkIn' ? 'bg-[#509CDB]' : ''}`}
              >
                <MdLogin className="text-white" size={20} />
                {sidebarOpen && <span className="text-sm ml-2">Check In</span>}
              </button>
              {dropdownOpen.checkIn && sidebarOpen && (
                <ul className="ml-6 mt-1 space-y-1">
                  <li className="relative">
                    <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#509CDB]"></div>
                    <button 
                      className={`text-white py-2 pl-5 text-sm hover:bg-[#509CDB] hover:bg-opacity-50 rounded-lg w-full text-left flex items-center ${hoveredItem === 'newCheckIn' ? 'bg-[#509CDB] bg-opacity-50' : ''}`}
                      onClick={() => navigate('/check-in')}
                      onMouseEnter={() => setHoveredItem('newCheckIn')}
                      onMouseLeave={() => setHoveredItem('')}
                    >
                      <MdKeyboardArrowRight className="mr-1" />
                      New Check In
                    </button>
                  </li>
                  <li className="relative">
                    <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#509CDB]"></div>
                    <button 
                      className={`text-white py-2 pl-5 text-sm hover:bg-[#509CDB] hover:bg-opacity-50 rounded-lg w-full text-left flex items-center ${hoveredItem === 'checkInHistory' ? 'bg-[#509CDB] bg-opacity-50' : ''}`}
                      onClick={() => navigate('/check-in-history')}
                      onMouseEnter={() => setHoveredItem('checkInHistory')}
                      onMouseLeave={() => setHoveredItem('')}
                    >
                      <MdKeyboardArrowRight className="mr-1" />
                      Check In History
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* Check Out */}
            <li>
              <button 
                onClick={() => toggleDropdown('checkOut')}
                className={`flex items-center w-full text-white text-left py-2 ${sidebarOpen ? 'px-4' : 'px-2 justify-center'} rounded-lg ${navitem === 'checkOut' ? 'bg-[#509CDB]' : ''}`}
                >
                <MdLogout className="text-white" size={20} />
                {sidebarOpen && <span className="text-sm ml-2">Check out</span>}
              </button>
              {dropdownOpen.checkOut && sidebarOpen && (
                <ul className="ml-6 mt-1 space-y-1">
                  <li className="relative">
                    <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#509CDB]"></div>
                    <button 
                      className={`text-white py-2 pl-5 text-sm hover:bg-[#509CDB] hover:bg-opacity-50 rounded-lg w-full text-left flex items-center ${hoveredItem === 'processCheckOut' ? 'bg-[#509CDB] bg-opacity-50' : ''}`}
                      onClick={() => navigate('/process-checkout')}
                      onMouseEnter={() => setHoveredItem('processCheckOut')}
                      onMouseLeave={() => setHoveredItem('')}
                    >
                      <MdKeyboardArrowRight className="mr-1" />
                      Process Checkout
                    </button>
                  </li>
                  <li className="relative">
                    <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#509CDB]"></div>
                    <button 
                      className={`text-white py-2 pl-5 text-sm hover:bg-[#509CDB] hover:bg-opacity-50 rounded-lg w-full text-left flex items-center ${hoveredItem === 'checkOutHistory' ? 'bg-[#509CDB] bg-opacity-50' : ''}`}
                      onClick={() => navigate('/checkout-history')}
                      onMouseEnter={() => setHoveredItem('checkOutHistory')}
                      onMouseLeave={() => setHoveredItem('')}
                    >
                      <MdKeyboardArrowRight className="mr-1" />
                      Checkout History
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* viewResidentRoom */}
            <li>
              <button 
                onClick={() => toggleDropdown('viewResidentRoom')}
                className={`flex items-center w-full text-white text-left py-2 ${sidebarOpen ? 'px-4' : 'px-2 justify-center'} rounded-lg ${navitem === 'viewResidentRoom' ? 'bg-[rgba(80,156,219,0.5)]' : ''}`}
              >
                <MdPeople className="text-white" size={20} />
                {sidebarOpen && <span className="text-sm ml-2">View Resident/Room</span>}
              </button>
              {dropdownOpen.viewResidentRoom && sidebarOpen && (
                <ul className="ml-6 mt-1 space-y-1">
                  <li className="relative">
                    <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#509CDB]"></div>
                    <button 
                      className={`text-white py-2 pl-5 text-sm hover:bg-[#509CDB] hover:bg-opacity-50 rounded-lg w-full text-left flex items-center ${hoveredItem === 'addResidentData' ? 'bg-[#509CDB] bg-opacity-50' : ''}`}
                      onClick={() => navigate('/add-resident-data')}
                      onMouseEnter={() => setHoveredItem('addResidentData')}
                      onMouseLeave={() => setHoveredItem('')}
                    >
                      <MdKeyboardArrowRight className="mr-1" />
                      Add Resident data
                    </button>
                  </li>
                  <li className="relative">
                    <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#509CDB]"></div>
                    <button 
                      className={`text-white py-2 pl-5 text-sm hover:bg-[#509CDB] hover:bg-opacity-50 rounded-lg w-full text-left flex items-center ${hoveredItem === 'addRoomData' ? 'bg-[#509CDB] bg-opacity-50' : ''}`}
                      onClick={() => navigate('/add-room-data')}
                      onMouseEnter={() => setHoveredItem('addRoomData')}
                      onMouseLeave={() => setHoveredItem('')}
                    >
                      <MdKeyboardArrowRight className="mr-1" />
                      Add Room data
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* Reports */}
            <li>
              <button 
                onClick={() => toggleDropdown('reports')}
                className={`flex items-center w-full text-white text-left py-2 ${sidebarOpen ? 'px-4' : 'px-2 justify-center'} rounded-lg ${navitem === 'reports' ? 'bg-[#509CDB]' : ''}`}
              >
                <MdAssessment className="text-white" size={20} />
                {sidebarOpen && <span className="text-sm ml-2">Reports</span>}
              </button>
              {dropdownOpen.reports && sidebarOpen && (
                <ul className="ml-6 mt-1 space-y-1">
                  <li className="relative">
                    <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#509CDB]"></div>
                    <button 
                      className={`text-white py-2 pl-5 text-sm hover:bg-[#509CDB] hover:bg-opacity-50 rounded-lg w-full text-left flex items-center ${hoveredItem === 'presentdashboard' ? 'bg-[#509CDB] bg-opacity-50' : ''}`}
                      onClick={() => navigate('/present-dashboard')}
                      onMouseEnter={() => setHoveredItem('presentdashboard')}
                      onMouseLeave={() => setHoveredItem('')}
                    >
                      <MdKeyboardArrowRight className="mr-1" />
                      Present Occupancy
                    </button>
                  </li>
                  <li className="relative">
                    <div className="absolute left-0 top-1 bottom-1 w-0.5 bg-[#509CDB]"></div>
                    <button 
                      className={`text-white py-2 pl-5 text-sm hover:bg-[#509CDB] hover:bg-opacity-50 rounded-lg w-full text-left flex items-center ${hoveredItem === 'vacatedList' ? 'bg-[#509CDB] bg-opacity-50' : ''}`}
                      onClick={() => navigate('/vacated-list')}
                      onMouseEnter={() => setHoveredItem('vacatedList')}
                      onMouseLeave={() => setHoveredItem('')}
                    >
                      <MdKeyboardArrowRight className="mr-1" />
                      Vacated list
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Admin Panel at the bottom */}
        <div className={`absolute bottom-0 w-full bg-[#070241] py-4 ${sidebarOpen ? '' : 'px-1 text-center'}`}>
          {sidebarOpen ? (
            <>
              <div className="text-white font-semibold text-center">Application Admin</div>
              <div className="text-white text-xs text-center">application@iiitb.ac.in</div>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={handleLogout}
              >
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L21 12M21 12L15 18M21 12H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          ) : (
            <button 
              className="flex justify-center w-full"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <MdLogout className="text-white" size={20} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ResponsiveNavigationBar;