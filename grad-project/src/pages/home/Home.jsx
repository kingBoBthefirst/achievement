
import React from "react";
import Navbar from '../../components/navbar/Navbar';

const SmartServePage = () => {
  return <>
     <Navbar/>
    <div className=" md:px-24 pt-15  flex flex-col gap-24">
      {/* Hero Section */}
      <div className="flex flex-col   lg:flex-row justify-between items-center">
        <div className=" text-center lg:text-left">
          <h1 className="text-6xl lg:text-7xl font-semibold">Transform Support with AI Automation</h1>
          <div className="pt-10">
            <p>Enhance support with automated ticketing, smart prioritization</p>
            <div className="my-2 mx-auto lg:mx-0 w-[100px] h-[5px] rounded bg-gradient-to-r from-[#0085e3] via-[#0194FE] to-[#00355b]"></div>
            <p>and quick, AI-driven team assignments.</p>
          </div>
        </div>

        <div className="flex flex-col  lg:max-w-sm max-w-sm items-center ">
          <div className="animate-vibrate ">
            <img src="src\assets\phone_main.png" alt="Phone" className="w-auto" />
          </div>
          <img src="src\assets\Ellipse 60.png" alt="Ellipse" className="w-auto" />
        </div>
      </div>

      {/* Features Section */}
      <div name="features" id="features" className="py-10 px-4 md:px-10">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Top Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              img: "src/assets/1.png",
              title: "Team Assignment",
              desc: "Dynamic ticket assignment based on employee workload and expertise."
            },
            {
              img: "src/assets/2.png",
              title: "Custom SLA Policies",
              desc: "Define unique SLA timelines based on ticket type or customer tier."
            },
            {
              img: "src/assets/3.png",
              title: "Priority Assignment",
              desc: "Smart prioritization as Low, Medium, or High."
            },
            {
              img: "src/assets/4.png",
              title: "Automated Classification",
              desc: "AI-powered classification into 'Request' or 'Incident.'"
            },
            {
              img: "src/assets/5.png",
              title: "Form-Channel Support",
              desc: "Form submission for seamless customer interaction."
            },
            {
              img: "src/assets/6.png",
              title: "AI-Powered Auto-Reply",
              desc: "Instant, context-aware replies ensuring quick responses."
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="text-center rounded-xl p-6 transition duration-500 hover:bg-white/10"
            >
              <div className="w-[60px] h-[60px] mx-auto mb-4 flex items-center justify-center rounded-xl">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="transition duration-500 hover:scale-110"
                />
              </div>
              <h5 className="text-lg font-semibold transition duration-500 hover:scale-110">
                {feature.title}
              </h5>
              <p className="text-sm mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

    <div name="how" id="howitworks" className="w-full py-10 px-4 text-white  overflow-x-hidden">
      <h1 className="text-4xl font-bold text-center mb-10">How It Works</h1>

      {/* Step 1 */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2 px-6" data-aos="fade-left" data-aos-duration="1500">
          <h2 className="text-2xl font-bold mb-4">Customer Submits A Request</h2>
          <p className="text-base max-w-md">
            The form is designed to streamline the process by allowing customers to describe their issue in detail, select the category or priority of the request, and include relevant documents or screenshots as attachments for context. Once the form is submitted, the system automatically generates a confirmation message, notifying customers that their request has been successfully received and is now being processed.
          </p>
        </div>
        <div className="md:w-1/2 text-center">
          <img src="src\assets\21.png" alt="Customer Request" className="rounded-lg w-full max-w-md mx-auto" />
        </div>
      </div>

      {/* Step 2 */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2 text-center">
          <img src="src\assets\22 (2).png" alt="AI Analysis" className="rounded-lg w-full max-w-md mx-auto" />
        </div> 
        <div className="md:w-1/2 px-6" data-aos="fade-right" data-aos-duration="1500">
          <h2 className="text-2xl font-bold mb-4">AI Classifies And Prioritizes</h2>
          <p className="text-base max-w-md">
            Once the request is submitted, our AI system quickly analyzes the content to classify the issue as either an incident or request. The AI then assigns a priority to the ticket based on the severity of the issue—whether it is low, medium, or high.
          </p>
        </div>
      </div>

      {/* Step 3 */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2 px-6" data-aos="fade-left" data-aos-duration="1500">
          <h2 className="text-2xl font-bold mb-4">Automated Ticket Creation</h2>
          <p className="text-base max-w-md">
            After classification and prioritization, the system automatically creates a ticket with a unique tracking number. The ticket is instantly assigned to a support team member.
          </p>
        </div>
        <div className="md:w-1/2 text-center">
          <img src="src\assets\233.png" alt="Ticket Creation" className="rounded-lg w-full max-w-md mx-auto" />
        </div>
      </div>

      {/* Step 4 */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <div className="md:w-1/2 text-center">
          <img src="src\assets\24.png" alt="SLA Monitoring" className="rounded-lg w-full max-w-md mx-auto" />
        </div>
        <div className="md:w-1/2 px-6" data-aos="fade-right" data-aos-duration="1500">
          <h2 className="text-2xl font-bold mb-4">Automated Response & SLA Monitoring</h2>
          <p className="text-base max-w-md">
            Once the ticket is created, an automated response is sent to the customer. SLAs, including response and resolution times, are tracked to ensure timely support.
          </p>
        </div>
      </div>

      {/* About Us */}
      <div name="about" className="flex flex-col md:flex-row items-center gap-10 pt-40">
        <div className="relative md:w-1/2 flex justify-center">
          <div data-aos="fade-right" data-aos-duration="1500">
            <div className="absolute">
              <img src="src\assets\pictop.png" alt="Top" />
            </div>
            <div className="relative sm:top-10 lg:top-24 left-20">
              <img src="src\assets\picbase.png" alt="Base" />
            </div>
          </div>
        </div>
        <div className="md:w-1/2 px-6" data-aos="fade-left" data-aos-duration="1500">
          <h1 className="text-3xl font-bold mb-6 -mt-10">ABOUT US</h1>
          <p className="text-base leading-7 mb-4">
            At Smart Serve, we understand the challenges faced by support teams in managing customer inquiries efficiently. Many teams spend valuable time manually monitoring and classifying incoming requests...
          </p>
          <p className="text-base leading-7 mb-4">
            Our mission is to revolutionize customer support with an automated AI-driven ticketing system...
          </p>
          <p className="text-base leading-7">
            We aim to reduce the burden on support teams while ensuring fast, accurate, and reliable responses to customer inquiries.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-20">
        <div className="flex flex-col md:flex-row justify-around items-center mb-6">
          <h4 className="text-xl font-semibold">Smart Serve</h4>
          <ul className="flex gap-10 list-none">
            <li>Features</li>
            <li>How it works</li>
            <li>About us</li>
          </ul>
        </div>
        <div className="w-full h-px bg-white/50 mb-6"></div>
        <p className="text-center text-sm">© Copyright 2024, All Rights Reserved by Logo</p>
      </div>
    </div>
    </div>
    </>
};

export default SmartServePage;




