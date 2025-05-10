"use client"

import { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { X } from "lucide-react"
import { useNavigate } from 'react-router-dom';


// Validation schema using Yup
const TicketSchema = Yup.object().shape({
  ticketSubject: Yup.string().required("Ticket subject is required"),
  ticketDescription: Yup.string().required("Ticket description is required"),
})

export default function CustomerForm({ onSubmitSuccess }) {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard'); // this will navigate to the AboutPage
  };

  // Fetch user data when component mounts
  useEffect(() => {
    try {
      setLoading(true)
      // Get user data from localStorage
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

      if (currentUser && currentUser.email) {
        setUserData({
          name: `${currentUser.firstName} ${currentUser.lastName}`,
          email: currentUser.email,
          userId: currentUser.id,
        })
      } else {
        setError("User data not found. Please log in again.")
      }
    } catch (err) {
      console.error("Error fetching user data:", err)
      setError("Failed to load user data. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Get current user
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

      if (!currentUser || !currentUser.id) {
        throw new Error("User not found")
      }

      // Create new ticket
      const newTicket = {
        id: Date.now().toString(),
        ticketNumber: `2023-C${Math.floor(Math.random() * 1000)}`,
        subject: values.ticketSubject,
        description: values.ticketDescription,
        status: "opened",
        createdAt: new Date().toISOString(), // Use current time
        updatedAt: new Date().toISOString(), // Use current time
        userId: currentUser.id,
        customerName: values.customerName,
        customerEmail: values.customerEmail,
        user: {
          name: `${currentUser.firstName} ${currentUser.lastName}`,
          avatar: currentUser.avatar || null, // Include avatar in the ticket
        },
      }

      // Get existing tickets or initialize empty array
      const tickets = JSON.parse(localStorage.getItem("tickets") || "[]")

      // Add new ticket
      tickets.push(newTicket)

      // Save back to localStorage
      localStorage.setItem("tickets", JSON.stringify(tickets))

      console.log("Ticket submitted successfully, navigating to dashboard...")

      // Navigate to dashboard
      if (onSubmitSuccess) {
        onSubmitSuccess()
         window.location.href = "/dashboard"
      } else {
        console.error("onSubmitSuccess callback is not defined")
        // Fallback navigation
        localStorage.setItem("currentView", "dashboard")
         window.location.href = "/dashboard"
      }
    } catch (err) {
      console.error("Error submitting ticket:", err)
      setError("Failed to submit ticket. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentView")
    window.location.reload()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <img src="/images/smart-serve-logo.png" alt="Smart Serve Logo" className="h-8 w-auto" />
          </div>
          <p className="text-gray-600">Loading your information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl relative">
        <button
          onClick={handleClick}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-transparent border-none p-0 cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex justify-center mb-6">
          <img src="src\assets\Frame 1000005373.png" alt="Smart Serve Logo" className="h-8 w-auto" />
        </div>

        <h2 className="text-xl font-bold text-center mb-6">Submit a New Ticket</h2>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <Formik
          initialValues={{
            customerName: userData?.name || "",
            customerEmail: userData?.email || "",
            ticketSubject: "",
            ticketDescription: "",
          }}
          enableReinitialize={true}
          validationSchema={TicketSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="flex flex-col md:flex-row md:space-x-4">
                {/* Left column (for desktop) - stacked on mobile */}
                <div className="md:w-1/2 space-y-4">
                  <div>
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Name
                    </label>
                    <Field
                      name="customerName"
                      type="text"
                      disabled
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700"
                    />
                  </div>

                  <div>
                    <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Customer Email
                    </label>
                    <Field
                      name="customerEmail"
                      type="email"
                      disabled
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700"
                    />
                  </div>

                  <div>
                    <label htmlFor="ticketSubject" className="block text-sm font-medium text-gray-700 mb-1">
                      Ticket Subject
                    </label>
                    <Field
                      name="ticketSubject"
                      type="text"
                      className={`w-full text-black px-3 py-2 border rounded-md ${
                        errors.ticketSubject && touched.ticketSubject ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter ticket subject"
                    />
                    <ErrorMessage name="ticketSubject" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                {/* Right column (for desktop) - stacked on mobile */}
                <div className="md:w-1/2 mt-4 md:mt-0">
                  <div>
                    <label htmlFor="ticketDescription" className="block text-sm font-medium text-gray-700 mb-1">
                      Ticket Description
                    </label>
                    <Field
                      as="textarea"
                      name="ticketDescription"
                      rows={11}
                      className={`w-full px-3 text-black py-2 border rounded-md h-full ${
                        errors.ticketDescription && touched.ticketDescription ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Please describe your issue in detail"
                      style={{ minHeight: "230px" }}
                    />
                    <ErrorMessage name="ticketDescription" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-white font-medium rounded-md transition duration-300"
                  style={{ background: "linear-gradient(to right, #005e70, #007d8a)" }}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
                          {/* fady romany - 192000065 */}
        </Formik>
      </div>
    </div>
  )
}
