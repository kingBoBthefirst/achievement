"use client"

import { useState, useEffect } from "react"
import {
  Bell,
  PlusCircle,
  Search,
  Home,
  Activity,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
} from "lucide-react"

import { useNavigate } from 'react-router-dom';




export default function CustomerDashboard({ onNewTicket }) {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Submitform'); // this will navigate to the AboutPage
  };
  const [userData, setUserData] = useState(null)
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeSection, setActiveSection] = useState("submissions")
  const [expandedItems, setExpandedItems] = useState(["activity"])
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    try {
      setLoading(true)
      // Update current time on component mount
      setCurrentTime(new Date())

      // Get user data from localStorage
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

      if (!currentUser || !currentUser.id) {
        setError("User data not found. Please log in again.")
        return
      }

      setUserData({
        id: currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        avatar: currentUser.avatar || null,
        // Include all profile fields
        phone: currentUser.phone,
        country: currentUser.country,
        dateOfBirth: currentUser.dateOfBirth,
        bio: currentUser.bio,
        jobTitle: currentUser.jobTitle,
        location: currentUser.location,
      })

      // Get all tickets from localStorage
      const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]")

      // Filter tickets for current user
      const userTickets = allTickets.filter((ticket) => ticket.userId === currentUser.id)

      // Sort tickets by creation date (newest first)
      userTickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

      setTickets(userTickets)
    } catch (err) {
      console.error("Error loading dashboard data:", err)
      setError("Failed to load your dashboard. Please try again.")
    } finally {
      setLoading(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentView")
    window.location.reload()
    window.location.href="/home"
  }
   const isActivityActive = activeSection === "submissions" || activeSection === "responses"

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleTimeString(undefined, options)
  }

  const getStatusText = (status) => {
    switch (status) {
      case "opened":
        return <span className="text-blue-600">Opened</span>
      case "closed":
        return <span className="text-green-600">Closed</span>
      case "pending":
        return <span className="text-orange-500">pending</span>
      default:
        return <span className="text-gray-600">{status}</span>
    }
  }
  const renderContent = () => {
    if (activeSection === "home") {
      return <Profile/>
    } else if (activeSection === "submissions") {
      return (
        <div className="p-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{getGreeting()}</h1>
            <p className="text-gray-600">Summary of your Request Tickets.</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <div className="space-y-4 mt-6">
            {tickets.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-500">You haven't submitted any tickets yet.</p>
                <button
                  onClick={onNewTicket}
                  className="mt-4 px-4 py-2 text-white font-medium rounded-md transition duration-300"
                  style={{ background: "linear-gradient(to right, #005e70, #007d8a)" }}
                >
                  Submit Your First Ticket
                </button>
              </div>
            ) : (
              tickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-yellow-200 mr-2"></div>
                      <h3 className="font-medium text-black">Ticket# {ticket.ticketNumber}</h3>
                    </div>
                    <div className="text-gray-500 text-xs">{formatDate(ticket.createdAt)}</div>
                  </div>

                  <h4 className="font-lg font-bold mb-1 text-black">{ticket.subject}</h4>
                  <p className="text-sm text-black mb-3 line-clamp-2">{ticket.description}</p>
                  <hr />
                  <div className="flex pt-5 justify-between items-center">
                    <div className="flex items-center">
                      {ticket.user && ticket.user.avatar ? (
                        <img
                          src={ticket.user.avatar || "/placeholder.svg"}
                          alt={ticket.user.name}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs mr-2">
                          {ticket.user?.name?.charAt(0) || userData?.name?.charAt(0)}
                        </div>
                      )}
                      <span className="text-sm text-black">{ticket.user?.name || userData?.name}</span>
                    </div>

                    <div className="text-sm">{getStatusText(ticket.status)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <p className="text-gray-600">This section is under development.</p>
          </div>
        </div>
      )
    }
  }
  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning!"
    if (hour < 18) return "Good Afternoon!"
    return "Good Evening!"
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <img src="/images/smart-serve-logo.png" alt="Smart Serve Logo" className="h-8 w-auto" />
          </div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-md z-20 flex flex-col h-full transition-all duration-300 ${
          isSidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          {!isSidebarCollapsed && (
            <>
              <img src="src\assets\Frame 1000005373.png" alt="Smart Serve" className="h-6 w-auto" />
              <span className="ml-2 text-teal-600 font-semibold"></span>
            </>
          )}
          {isSidebarCollapsed && (
            <img src="src\assets\LOGO.png" alt="Smart Serve" className="h-6 w-auto mx-auto" />
          )}
          <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            {isSidebarCollapsed ? <ChevronRight size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {!isSidebarCollapsed && (
          <div className="px-4 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>
        )}


        <nav className="flex-1 px-2 py-4 space-y-1">
          <a
            href="/dashboard/Profile"
            className={`flex item-center px-4 py-3 text-sm rounded-md ${
              activeSection === "home" ? "bg-[linear-gradient(to_bottom_right,_#001625,_#013e51,_#0193a6)]" : "text-gray-600 hover:bg-gray-100"
            }`}
             onClick={() => setActiveSection("home")}
          >
            <Home size={18} className={isSidebarCollapsed ? "mx-auto" : "mr-3"} />
            {!isSidebarCollapsed && <span>Home</span>}
          </a>

          <div className="space-y-1">
            <button
              onClick={() => {
                if (!isSidebarCollapsed) {
                  setExpandedItems((prev) =>
                    prev.includes("activity") ? prev.filter((item) => item !== "activity") : [...prev, "activity"],
                  )
                }
              }}
              className={`flex items-center px-4 py-2 text-sm rounded-md w-full ${
                isActivityActive
                  ? "bg-[linear-gradient(to_bottom_right,_#001625,_#013e51,_#0193a6)] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}>
              <Activity size={18} className={isSidebarCollapsed ? "mx-auto" : "mr-3"} />
              {!isSidebarCollapsed && (
                <div className="flex items-center justify-between w-full">
                  <span>My activity</span>
                  {expandedItems.includes("activity") ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronDown size={16} className="transform -rotate-90" />
                  )}
                </div>
              )}
            </button>

            {/* Submenu items */}
            {!isSidebarCollapsed && expandedItems.includes("activity") && (
              <div className="pl-9 space-y-1">
                <a
                  href="#"
                  className={`block px-4 py-3 text-sm rounded-md ${
                    activeSection === "responses"
                      ? "bg-[linear-gradient(to_bottom_right,_#001625,_#013e51,_#0193a6)] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveSection("responses")}
                >
                  Responses
                </a>
                <a
                  href="#"
                  className={`block px-4 py-3 text-sm rounded-md ${
                    activeSection === "submissions"
                      ? "bg-[linear-gradient(to_bottom_right,_#001625,_#013e51,_#0193a6)] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveSection("submissions")}
                >
                  Submissions
                </a>
              </div>
            )}
          </div>


          <a
            href="#"
            className={`flex items-center px-4 py-2 text-sm rounded-md ${
              activeSection === "form" ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveSection("form")}
          >
            <FileText size={18} className={isSidebarCollapsed ? "mx-auto" : "mr-3"} />
            {!isSidebarCollapsed && <span>Form</span>}
          </a>

          <a
            href="#"
            className={`flex items-center px-4 py-2 text-sm rounded-md ${
              activeSection === "settings" ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveSection("settings")}
          >
            <Settings size={18} className={isSidebarCollapsed ? "mx-auto" : "mr-3"} />
            {!isSidebarCollapsed && <span>Settings</span>}
          </a>

          <a
            href="#"
            className={`flex items-center px-4 py-2 text-sm rounded-md ${
              activeSection === "help" ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveSection("help")}
          >
            <HelpCircle size={18} className={isSidebarCollapsed ? "mx-auto" : "mr-3"} />
            {!isSidebarCollapsed && <span>Help</span>}
          </a>
          
        </nav>

        <div className="p-4 ">
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100"
            onClick={handleLogout}
          >
            <LogOut size={18} className={isSidebarCollapsed ? "mx-auto" : "mr-3"} />
            {!isSidebarCollapsed && <span>Logout</span>}
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{getGreeting()}</h1>
            <p className="text-gray-600">Summary of your Request Tickets.</p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleClick}
              className="flex items-center px-3 py-1.5 text-sm text-white font-medium rounded-md transition duration-300"
              style={{ background: "linear-gradient(to right, #005e70, #007d8a)" }}
            >
              <PlusCircle size={16} className="mr-1" />
              New Ticket
            </button>

            <button className="text-gray-600 hover:text-gray-800">
              <Bell size={20} />
            </button>

            

            <div className="flex items-center">
              {userData?.avatar ? (
                             <img
                             src={userData.avatar || "/placeholder.svg"}
                             alt={userData.name}
                             className="w-8 h-8 rounded-full object-cover"
                           /> ) : (
                            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white">
                            {userData?.name?.charAt(0)}
                          </div>
              )}

              <div className="ml-2 hidden md:block">
                <p className="text-sm font-medium text-gray-800">{userData?.name}</p>
                <p className="text-xs text-gray-500">{userData?.email}</p>
              </div>

              <ChevronDown size={16} className="ml-2 text-gray-500" />
            </div>
          </div>
        </header>

        {/* Tickets list */}
        {renderContent()}
      </div>
    </div>
  )
}
