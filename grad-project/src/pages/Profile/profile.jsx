"use client"

import { useState, useEffect, useRef } from "react"
import { Pencil, Camera } from "lucide-react"
import { X } from "lucide-react"

export default function HomePage() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    dateOfBirth: "",
    bio: "",
    jobTitle: "",
    location: "",
    avatar: null,
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingProfile, setEditingProfile] = useState(false)
  const [editingPersonalInfo, setEditingPersonalInfo] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const fileInputRef = useRef(null)

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning !"
    if (hour < 18) return "Good Afternoon !"
    return "Good Evening !"
  }

  useEffect(() => {
    try {
      setLoading(true)

      // Get user data from localStorage
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

      if (!currentUser || !currentUser.id) {
        setError("User data not found. Please log in again.")
        return
      }

      // Set user data with defaults for missing fields
      setUserData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        country: currentUser.country || "",
        dateOfBirth: currentUser.dateOfBirth || "",
        bio: currentUser.bio || "",
        jobTitle: currentUser.jobTitle || "Product Designer",
        location: currentUser.location || "Cairo",
        avatar: currentUser.avatar || null,
      })
    } catch (err) {
      console.error("Error fetching user data:", err)
      window.location.href = "/dashboard"
    } finally {
      setLoading(false)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setHasChanges(true)
  }

  const handleAvatarClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result
        console.log("Avatar loaded, size:", result.length)
        setUserData((prev) => ({
          ...prev,
          avatar: result,
        }))
        setHasChanges(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const saveChanges = () => {
    try {
      // Get current user data from localStorage
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

      if (!currentUser || !currentUser.id) {
        setError("User data not found. Please log in again.")
        return
      }

      // Create updated user object by merging current user data with edited fields
      // This ensures we only update fields that were actually edited
      const updatedUser = {
        ...currentUser,
        // Only update fields that are in the form
        ...(editingProfile && {
          jobTitle: userData.jobTitle || currentUser.jobTitle || "",
          location: userData.location || currentUser.location || "",
        }),
        ...(editingPersonalInfo && {
          firstName: userData.firstName || currentUser.firstName || "",
          lastName: userData.lastName || currentUser.lastName || "",
          email: userData.email || currentUser.email || "",
          phone: userData.phone || currentUser.phone || "",
          country: userData.country || currentUser.country || "",
          dateOfBirth: userData.dateOfBirth || currentUser.dateOfBirth || "",
          bio: userData.bio || currentUser.bio || "",
        }),
        // Only update avatar if it was changed
        ...(userData.avatar !== currentUser.avatar && { avatar: userData.avatar }),
      }

      // Update name if first or last name was changed
      if (
        editingPersonalInfo &&
        (userData.firstName !== currentUser.firstName || userData.lastName !== currentUser.lastName)
      ) {
        updatedUser.name = `${updatedUser.firstName} ${updatedUser.lastName}`
      }

      // Save back to localStorage
      localStorage.setItem("currentUser", JSON.stringify(updatedUser))
      console.log(
        "Updated currentUser in localStorage with avatar:",
        updatedUser.avatar ? "Avatar present" : "No avatar",
      )

      // Update users array to ensure data persistence across logins
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const userIndex = users.findIndex((user) => user.id === currentUser.id)

      if (userIndex !== -1) {
        // Update user in the users array, preserving any fields not in the form
        users[userIndex] = {
          ...users[userIndex],
          ...updatedUser,
        }
        localStorage.setItem("users", JSON.stringify(users))
        console.log(
          "Updated user in users array with avatar:",
          users[userIndex].avatar ? "Avatar present" : "No avatar",
        )
      } else {
        console.warn("User not found in users array. This may cause issues with data persistence.")
      }

      // Update avatar in all tickets submitted by this user
      // Only if the avatar was changed
      if (userData.avatar !== currentUser.avatar) {
        const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]")
        let ticketsUpdated = false

        const updatedTickets = allTickets.map((ticket) => {
          // Check if this ticket belongs to the current user
          if (ticket.userId === currentUser.id) {
            ticketsUpdated = true
            // Update the user info in the ticket
            return {
              ...ticket,
              user: {
                ...ticket.user,
                name: updatedUser.name,
                avatar: updatedUser.avatar,
              },
            }
          }
          return ticket
        })

        if (ticketsUpdated) {
          localStorage.setItem("tickets", JSON.stringify(updatedTickets))
          console.log("Updated avatar in user's tickets")
        }
      }

      // Reset state
      setHasChanges(false)
      setEditingProfile(false)
      setEditingPersonalInfo(false)

      // Update the local userData state to reflect the changes
      setUserData({
        firstName: updatedUser.firstName || "",
        lastName: updatedUser.lastName || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        country: updatedUser.country || "",
        dateOfBirth: updatedUser.dateOfBirth || "",
        bio: updatedUser.bio || "",
        jobTitle: updatedUser.jobTitle || "",
        location: updatedUser.location || "",
        avatar: updatedUser.avatar || null,
      })

      alert("Profile updated successfully!")
    } catch (err) {
      console.error("Error saving changes:", err)
      setError("Failed to save changes. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-teal-600 border-gray-200 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{getGreeting()}</h1>
          <p className="text-gray-600">Create and modify my profile.</p>
        </div>

        {hasChanges && (
          <button
            onClick={saveChanges}
            className="px-6 py-2.5 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Save Changes
          </button>
        )}
        <a href="/dashboard" className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X className="h-5 w-5" />
        </a>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {/* Profile Section */}
      <div className="bg-white text-black rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Profile</h2>

          <button
            onClick={() => setEditingProfile(!editingProfile)}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 bg-gray-100 px-4 py-2 rounded-md"
          >
            <Pencil size={16} className="mr-2" />
            Edit
          </button>
        </div>

        {!editingProfile ? (
          <div className="flex items-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-md">
                {userData.avatar ? (
                  <img
                    src={userData.avatar || "/placeholder.svg"}
                    alt={`${userData.firstName} ${userData.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-teal-600 flex items-center justify-center text-white text-xl">
                    {userData.firstName.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            <div className="ml-6">
              <h3 className="font-medium text-xl">
                {userData.firstName} {userData.lastName}
              </h3>
              <p className="text-gray-600">{userData.jobTitle}</p>
              <p className="text-gray-500 text-sm">{userData.location}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4 flex flex-col items-center">
              <div
                className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden cursor-pointer relative border-2 border-white shadow-md"
                onClick={handleAvatarClick}
              >
                {userData.avatar ? (
                  <img
                    src={userData.avatar || "/placeholder.svg"}
                    alt={`${userData.firstName} ${userData.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-teal-600 flex items-center justify-center text-white text-xl">
                    {userData.firstName.charAt(0)}
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity">
                  <Camera size={24} className="text-white" />
                </div>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              <p className="text-xs text-gray-500 mt-2">Click to change photo</p>
            </div>

            <div className="md:w-3/4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={userData.jobTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Job Title"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={userData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Personal Information Section */}
      <div className="  text-black bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Personal Informations</h2>

          <button
            onClick={() => setEditingPersonalInfo(!editingPersonalInfo)}
            className="flex items-center text-sm text-gray-500 hover:text-gray-700 bg-gray-100 px-4 py-2 rounded-md"
          >
            <Pencil size={16} className="mr-2" />
            Edit
          </button>
        </div>

        {!editingPersonalInfo ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">First Name</p>
              <p className="font-medium">{userData.firstName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Last Name</p>
              <p className="font-medium">{userData.lastName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium">{userData.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <p className="font-medium">{userData.phone || "Not provided"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Country</p>
              <p className="font-medium">{userData.country || "Not provided"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Date of birth</p>
              <p className="font-medium">{userData.dateOfBirth || "Not provided"}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 mb-1">Bio</p>
              <p className="font-medium">{userData.bio || userData.jobTitle}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={userData.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter your country"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">Date of birth</label>
              <input
                type="text"
                name="dateOfBirth"
                value={userData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="MM/DD/YYYY"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-500 mb-1">Bio</label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Tell us about yourself"
              ></textarea>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
