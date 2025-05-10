"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Eye, EyeOff, Check, X } from "lucide-react"

// Validation schema using Yup
const SignupSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Too short").max(50, "Too long").required("First name is required"),
  lastName: Yup.string().min(2, "Too short").max(50, "Too long").required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  termsAccepted: Yup.boolean()
    .oneOf([true], "You must accept the terms and policies")
    .required("You must accept the terms and policies"),
})

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [signupError, setSignupError] = useState("")

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      setSignupError("")

      // Check if user already exists in localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")
      const userExists = existingUsers.some((user) => user.email === values.email)

      if (userExists) {
        setSignupError("A user with this email already exists.")
        setSubmitting(false)
        return
      }

      // Create new user object
      const newUser = {
        id: Date.now().toString(),
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password, // In a real app, you would hash this password
        createdAt: new Date().toISOString(),
      }

      // Add user to localStorage
      existingUsers.push(newUser)
      localStorage.setItem("users", JSON.stringify(existingUsers))

      // Set current user
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          name: `${newUser.firstName} ${newUser.lastName}`,
        }),
      )

      // Set auth token (simulated)
      localStorage.setItem("authToken", `simulated-token-${Date.now()}`)

      console.log("User registered successfully:", newUser)
      setSignupSuccess(true)
    } catch (error) {
      console.error("Registration error:", error)
      setSignupError("Registration failed. Please try again. " + (error.message || ""))
    } finally {
      setSubmitting(false)
    }
  }

  if (signupSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-12">
            <img src="/images/smart-serve-logo.png" alt="Smart Serve Logo" className="h-8 w-auto" />
          </div>

          <div className="flex flex-col items-center justify-center mt-10 mb-10">
            <div className="w-20 h-20 rounded-full border-4 border-teal-600 flex items-center justify-center mb-6">
              <Check className="h-10 w-10 text-teal-600" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Created Successfully</h2>
            <p className="text-gray-600 text-center">Your account has been created successfully.</p>
          </div>

          <div className="flex justify-center mt-8">
            <a
              href="/login"
              className="px-6 py-2.5 text-white font-medium rounded-md transition duration-300"
              style={{ background: "linear-gradient(to right, #005e70, #007d8a)" }}
            >
              Let's Start!
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Left side - Background and welcome text (hidden on small screens) */}
      <div
        className="hidden md:flex md:w-1/2 text-white p-10 flex-col justify-center"
        style={{ background: "linear-gradient(to bottom right, #001625, #013e51, #0193a6)" }}
      >
        <div className="mb-auto">
          <div className="flex items-center">
            <img src="/images/smart-serve-logo.png" alt="Smart Serve Logo" className="h-10 w-auto" />
          </div>
        </div>
        <div className="mt-auto">
          <h1 className="text-4xl font-bold mb-2">Welcome.</h1>
          <p className="text-3xl font-medium">Start your journey now with our management system!</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-10 flex items-center justify-center relative h-screen overflow-auto">
        <a href="/home" className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X className="h-5 w-5" />
        </a>
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Create an account</h2>
            <p className="text-gray-600 mt-1">Let's get you all set up so you can access your personal account.</p>
          </div>

          {signupError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{signupError}</div>
          )}

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              termsAccepted: false,
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
          >
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <Field
                      name="firstName"
                      type="text"
                      className={`w-full text-black  px-3 py-2 border rounded-md ${
                        errors.firstName && touched.firstName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your first name"
                    />
                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <Field
                      name="lastName"
                      type="text"
                      className={`w-full px-3 py-2 text-black border rounded-md ${
                        errors.lastName && touched.lastName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your last name"
                    />
                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className={`w-full px-3 py-2 text-black  border rounded-md ${
                      errors.email && touched.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className={`w-full text-black px-3 py-2 border rounded-md ${
                        errors.password && touched.password ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="••••••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-xs text-gray-500 mt-1 cursor-pointer hover:text-teal-700">
                      Hide password (A-Z)
                    </span>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Field
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className={`w-full text-black px-3 py-2 border rounded-md ${
                        errors.confirmPassword && touched.confirmPassword ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="••••••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="flex items-center">
                  <Field
                    type="checkbox"
                    name="termsAccepted"
                    id="termsAccepted"
                    className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-700">
                    I agree to all the{" "}
                    <a href="#" className="text-teal-600 hover:text-teal-500">
                      Terms
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-teal-600 hover:text-teal-500">
                      Privacy Policies
                    </a>
                  </label>
                </div>
                <ErrorMessage name="termsAccepted" component="div" className="text-red-500 text-xs mt-1" />

                <button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  className={`w-full text-white font-medium py-2 px-4 rounded-md transition duration-300 ${
                    !isValid || !dirty ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  style={{ background: "linear-gradient(to bottom right, #001625, #013e51, #0193a6)" }}
                >
                  {isSubmitting ? "Submitting..." : "Create Account"}
                </button>

                <div className="text-center text-sm text-gray-600">
                  Already Have An Account?{" "}
                  <a href="/login" className="text-teal-600 hover:text-teal-500 font-medium">
                    Sign In
                  </a>
                </div>
              </Form>
            )}
            {/* fady romany - 192000065 */}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default SignupForm
