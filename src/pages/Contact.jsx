import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiFile,
  FiMessageSquare,
  FiPhone,
} from "react-icons/fi";

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSubmitting(true);
    formData.append("access_key", "7059166b-c9d1-48c3-a26c-197a90008ddf");
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        console.log("Success", res);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="absolute w-full bg-gray-800 h-[85px] top-0"></div>
      <div className="min-h-screen flex items-center justify-center bg-slate-300 p-4 pt-24 sm:pt-40 pb-20">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div
            className="w-full md:w-1/2 bg-cover bg-center p-12 hidden md:block text-white bg-gray-800"
            // style={{
            //   backgroundImage:
            //     "url('https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1240&q=80')",
            // }}
          >
            <h1 className="text-4xl font-bold  mb-4">Contact Us</h1>
            <p className="font-semibold text-lg">
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
          </div>
          <div className="w-full md:w-1/2 p-8">
            {isSubmitted ? (
              <div className="flex justify-center items-center flex-col h-full text-center">
                <h2 className="text-3xl font-bold text-green-600 mb-4">
                  Thank You!
                </h2>
                <p className="text-gray-700 font-semibold px-2">
                  Your message has been successfully submitted. We'll get back
                  to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser
                        className="h-5 w-5 text-gray-400 focus:text-emerald-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      required
                      type="text"
                      name="name"
                      id="name"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 sm:text-sm"
                      placeholder="Your Name"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300
                      rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400  sm:text-sm"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>

                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      required
                      type="phone"
                      name="number"
                      id="number"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300
                      rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400  sm:text-sm"
                      placeholder="Your Phone"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiFile
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      required
                      type="text"
                      name="subject"
                      id="subject"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300
                       rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400  sm:text-sm"
                      placeholder="Your Subject"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-2 flex items-start pointer-events-none">
                      <FiMessageSquare
                        className="h-5 w-5 text-gray-400 mt-[3px]"
                        aria-hidden="true"
                      />
                    </div>
                    <textarea
                      name="message"
                      id="message"
                      rows="4"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300
                      rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400  sm:text-sm resize-none"
                      placeholder="Your Message..."
                    ></textarea>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition duration-150 ease-in-out"
                  >
                    <span className="text-lg">
                      {submitting ? "Submitting" : "Submit"}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
