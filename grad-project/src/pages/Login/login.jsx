"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Eye, EyeOff, X } from "lucide-react"

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
  rememberMe: Yup.boolean(),
})

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      setLoginError("")

   
      const users = JSON.parse(localStorage.getItem("users") || "[]")


      const user = users.find((u) => u.email === values.email)

      if (!user) {
        setLoginError("No account found with this email address.")
        setSubmitting(false)
        return
      }

      if (user.password !== values.password) {
        setLoginError("Invalid password.")
        setSubmitting(false)
        return
      }

   
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          // Include additional profile fields if they exist
          phone: user.phone || "",
          country: user.country || "",
          dateOfBirth: user.dateOfBirth || "",
          bio: user.bio || "",
          jobTitle: user.jobTitle || "",
          location: user.location || "",
          avatar: user.avatar || null,
        }),
      )


      localStorage.setItem("authToken", `simulated-token-${Date.now()}`)

      console.log("User logged in successfully:", user)

 
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Login error:", error)
      setLoginError("Login failed. Please try again. " + (error.message || ""))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-10 flex items-center justify-center relative h-screen overflow-auto">
        <a href="/home" className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X className="h-5 w-5" />
        </a>
        <div className="w-full max-w-md">
          <div className="mb-10">
            <div className="flex items-center mb-12">
              <img src="src\assets\Frame 1000005373.png" alt="Smart Serve Logo" className="h-8 w-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Login to your account</h2>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{loginError}</div>
          )}

          <Formik
            initialValues={{
              email: "",
              password: "",
              rememberMe: false,
            }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched, isSubmitting, isValid, dirty }) => (
              <Form className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className={`w-full px-3 text-black py-2 border rounded-md ${
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
                      className={`w-full text-black  px-3 py-2 border rounded-md ${
                        errors.password && touched.password ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your password"
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
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      name="rememberMe"
                      id="rememberMe"
                      className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <a href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-500">
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  className={`w-full text-white font-medium py-2.5 px-4 rounded-md transition duration-300 ${
                    !isValid || !dirty ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                  style={{ background: "linear-gradient(to right, #005e70, #007d8a)" }}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>

                <div className="text-center text-sm text-gray-600 mt-4">
                  Don't have an account?{" "}
                  <a href="/signup" className="text-teal-600 hover:text-teal-500 font-medium">
                    Sign Up
                  </a>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Right side - Background and welcome text*/}
      <div
        className="hidden md:flex md:w-1/2 text-white p-10 flex-col justify-between"
        style={{ background: "linear-gradient(to bottom, #003a47, #006d7e)" }}
      >
        <div className="mt-16">
          <h1 className="text-4xl font-bold mb-2">Welcome to Smart Serve</h1>
        </div>
        <div className="mb-16 text-right">
          <h2 className="text-3xl font-bold mb-2">Seamless Collaboration</h2>
          <p className="text-lg max-w-xs ml-auto">Effortlessly work together with your team in real time</p>
        </div>
      </div>
      {/* fady romany - 192000065 */}
    </div>
    
  )
}
