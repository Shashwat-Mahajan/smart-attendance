import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header1";

// Component for the Campus Overview Page
const CampusOverview = () => (
  <>
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-gray-200 mb-6">
      <div className="mb-4 md:mb-0">
        <h1 className="text-3xl font-bold text-gray-900">Campus Overview</h1>
        <p className="mt-1 text-gray-500">
          Welcome back, Admin. Here is an overview of your campus data.
        </p>
      </div>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        <span className="flex items-center space-x-2">
          <span data-lucide="plus"></span>
          <span>Add New</span>
        </span>
      </button>
    </header>

    {/* Stats Section */}
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 font-medium">Total Students</h3>
          <span data-lucide="users" className="text-blue-500"></span>
        </div>
        <div className="mt-4 text-4xl font-bold text-gray-800">2,450</div>
        <p className="mt-1 text-sm text-gray-400">+12% from last semester</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 font-medium">Enrolled Courses</h3>
          <span data-lucide="book-open" className="text-green-500"></span>
        </div>
        <div className="mt-4 text-4xl font-bold text-gray-800">189</div>
        <p className="mt-1 text-sm text-gray-400">+5 new this term</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 font-medium">Total Faculty</h3>
          <span data-lucide="briefcase" className="text-purple-500"></span>
        </div>
        <div className="mt-4 text-4xl font-bold text-gray-800">78</div>
        <p className="mt-1 text-sm text-gray-400">On staff</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-500 font-medium">Active Logins</h3>
          <span data-lucide="activity" className="text-yellow-500"></span>
        </div>
        <div className="mt-4 text-4xl font-bold text-gray-800">45</div>
        <p className="mt-1 text-sm text-gray-400">Live now</p>
      </div>
    </section>

    {/* Recent Students Table */}
    <section className="mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Student Registrations
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="py-2 px-4">Student Name</th>
                <th className="py-2 px-4">Student ID</th>
                <th className="py-2 px-4">Major</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 last:border-b-0">
                <td className="py-3 px-4 text-gray-800">Jane Doe</td>
                <td className="py-3 px-4 text-gray-600">S-1001</td>
                <td className="py-3 px-4 text-gray-600">Computer Science</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full text-green-700 bg-green-100">
                    Enrolled
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100 last:border-b-0">
                <td className="py-3 px-4 text-gray-800">John Smith</td>
                <td className="py-3 px-4 text-gray-600">S-1002</td>
                <td className="py-3 px-4 text-gray-600">Biology</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full text-green-700 bg-green-100">
                    Enrolled
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100 last:border-b-0">
                <td className="py-3 px-4 text-gray-800">Alice Johnson</td>
                <td className="py-3 px-4 text-gray-600">S-1003</td>
                <td className="py-3 px-4 text-gray-600">Business Admin</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full text-red-700 bg-red-100">
                    Pending
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* Recent Campus Announcements Table */}
    <section>
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Campus Announcements
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 border-b border-gray-200">
                <th className="py-2 px-4">Announcement</th>
                <th className="py-2 px-4">Posted By</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 last:border-b-0">
                <td className="py-3 px-4 text-gray-800">
                  Midterm Exam Schedule Available
                </td>
                <td className="py-3 px-4 text-gray-600">Registrar's Office</td>
                <td className="py-3 px-4 text-gray-600">Aug 2, 2023</td>
                <td className="py-3 px-4 flex space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <span data-lucide="pencil"></span>
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <span data-lucide="trash-2"></span>
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100 last:border-b-0">
                <td className="py-3 px-4 text-gray-800">
                  New Career Fair Date
                </td>
                <td className="py-3 px-4 text-gray-600">Student Services</td>
                <td className="py-3 px-4 text-gray-600">Aug 1, 2023</td>
                <td className="py-3 px-4 flex space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <span data-lucide="pencil"></span>
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <span data-lucide="trash-2"></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </>
);

// Component for the Students Page
const StudentsPage = () => (
  <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
    <header className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
      <h3 className="text-xl font-semibold text-gray-800">
        Student Management
      </h3>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        <span className="flex items-center space-x-1">
          <span data-lucide="plus" className="w-4 h-4"></span>
          <span>Add Student</span>
        </span>
      </button>
    </header>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 border-b border-gray-200">
            <th className="py-2 px-4">Student Name</th>
            <th className="py-2 px-4">Student ID</th>
            <th className="py-2 px-4">Major</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100 last:border-b-0">
            <td className="py-3 px-4 text-gray-800">Lisa Reynolds</td>
            <td className="py-3 px-4 text-gray-600">S-1011</td>
            <td className="py-3 px-4 text-gray-600">Physics</td>
            <td className="py-3 px-4">
              <span className="px-2 py-1 text-xs font-semibold rounded-full text-green-700 bg-green-100">
                Enrolled
              </span>
            </td>
            <td className="py-3 px-4 flex space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                title="Edit"
              >
                <span data-lucide="pencil" className="w-5 h-5"></span>
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <span data-lucide="trash-2" className="w-5 h-5"></span>
              </button>
            </td>
          </tr>
          <tr className="border-b border-gray-100 last:border-b-0">
            <td className="py-3 px-4 text-gray-800">Michael Chen</td>
            <td className="py-3 px-4 text-gray-600">S-1012</td>
            <td className="py-3 px-4 text-gray-600">Electrical Engineering</td>
            <td className="py-3 px-4">
              <span className="px-2 py-1 text-xs font-semibold rounded-full text-red-700 bg-red-100">
                Suspended
              </span>
            </td>
            <td className="py-3 px-4 flex space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                title="Edit"
              >
                <span data-lucide="pencil" className="w-5 h-5"></span>
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <span data-lucide="trash-2" className="w-5 h-5"></span>
              </button>
            </td>
          </tr>
          <tr className="border-b border-gray-100 last:border-b-0">
            <td className="py-3 px-4 text-gray-800">Sarah Brown</td>
            <td className="py-3 px-4 text-gray-600">Art History</td>
            <td className="py-3 px-4">
              <span className="px-2 py-1 text-xs font-semibold rounded-full text-green-700 bg-green-100">
                Enrolled
              </span>
            </td>
            <td className="py-3 px-4 flex space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                title="Edit"
              >
                <span data-lucide="pencil" className="w-5 h-5"></span>
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <span data-lucide="trash-2" className="w-5 h-5"></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// Component for the Courses Page
const CoursesPage = () => (
  <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
    <header className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
      <h3 className="text-xl font-semibold text-gray-800">Course Catalog</h3>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        <span className="flex items-center space-x-1">
          <span data-lucide="plus" className="w-4 h-4"></span>
          <span>Add Course</span>
        </span>
      </button>
    </header>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 border-b border-gray-200">
            <th className="py-2 px-4">Course Code</th>
            <th className="py-2 px-4">Course Title</th>
            <th className="py-2 px-4">Department</th>
            <th className="py-2 px-4">Instructor</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100 last:border-b-0">
            <td className="py-3 px-4 text-gray-800">CS101</td>
            <td className="py-3 px-4 text-gray-600">
              Introduction to Programming
            </td>
            <td className="py-3 px-4 text-gray-600">Computer Science</td>
            <td className="py-3 px-4 text-gray-600">Dr. Emily White</td>
            <td className="py-3 px-4 flex space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                title="Edit"
              >
                <span data-lucide="pencil" className="w-5 h-5"></span>
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <span data-lucide="trash-2" className="w-5 h-5"></span>
              </button>
            </td>
          </tr>
          <tr className="border-b border-gray-100 last:border-b-0">
            <td className="py-3 px-4 text-gray-800">BIO205</td>
            <td className="py-3 px-4 text-gray-600">Cellular Biology</td>
            <td className="py-3 px-4 text-gray-600">Biology</td>
            <td className="py-3 px-4 text-gray-600">Prof. Alan Turing</td>
            <td className="py-3 px-4 flex space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                title="Edit"
              >
                <span data-lucide="pencil" className="w-5 h-5"></span>
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <span data-lucide="trash-2" className="w-5 h-5"></span>
              </button>
            </td>
          </tr>
          <tr className="border-b border-gray-100 last:border-b-0">
            <td className="py-3 px-4 text-gray-800">PSY310</td>
            <td className="py-3 px-4 text-gray-600">Cognitive Psychology</td>
            <td className="py-3 px-4 text-gray-600">Psychology</td>
            <td className="py-3 px-4 text-gray-600">Dr. Sarah Lee</td>
            <td className="py-3 px-4 flex space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                title="Edit"
              >
                <span data-lucide="pencil" className="w-5 h-5"></span>
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <span data-lucide="trash-2" className="w-5 h-5"></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// Component for the Faculty Page
const FacultyPage = () => (
  <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
    <header className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
      <h3 className="text-xl font-semibold text-gray-800">Faculty Directory</h3>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        <span className="flex items-center space-x-1">
          <span data-lucide="plus" className="w-4 h-4"></span>
          <span>Add Faculty</span>
        </span>
      </button>
    </header>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 border-b border-gray-200">
            <th className="py-2 px-4">Faculty Name</th>
            <th className="py-2 px-4">Department</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100 last:border-b-0">
            <td className="py-3 px-4 text-gray-800">Dr. Emily White</td>
            <td className="py-3 px-4 text-gray-600">Computer Science</td>
            <td className="py-3 px-4 text-gray-600">e.white@college.edu</td>
            <td className="py-3 px-4 flex space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                title="Edit"
              >
                <span data-lucide="pencil" className="w-5 h-5"></span>
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <span data-lucide="trash-2" className="w-5 h-5"></span>
              </button>
            </td>
          </tr>
          <tr className="border-b border-gray-100 last:border-b-0">
            <td className="py-3 px-4 text-gray-800">Prof. Alan Turing</td>
            <td className="py-3 px-4 text-gray-600">Biology</td>
            <td className="py-3 px-4 text-gray-600">a.turing@college.edu</td>
            <td className="py-3 px-4 flex space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                title="Edit"
              >
                <span data-lucide="pencil" className="w-5 h-5"></span>
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <span data-lucide="trash-2" className="w-5 h-5"></span>
              </button>
            </td>
          </tr>
          <tr className="border-b border-gray-100 last:border-b-0">
            <td className="py-3 px-4 text-gray-800">Dr. Sarah Lee</td>
            <td className="py-3 px-4 text-gray-600">Psychology</td>
            <td className="py-3 px-4 text-gray-600">s.lee@college.edu</td>
            <td className="py-3 px-4 flex space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                title="Edit"
              >
                <span data-lucide="pencil" className="w-5 h-5"></span>
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <span data-lucide="trash-2" className="w-5 h-5"></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// Component for the Campus News Page
const CampusNewsPage = () => (
  <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
    <header className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
      <h3 className="text-xl font-semibold text-gray-800">Announcements</h3>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        <span className="flex items-center space-x-1">
          <span data-lucide="plus" className="w-4 h-4"></span>
          <span>New Announcement</span>
        </span>
      </button>
    </header>
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800">
          Important: Final Exam Schedule
        </h4>
        <p className="text-sm text-gray-500 mt-1">
          Posted by Registrar's Office on August 20, 2023
        </p>
        <p className="mt-2 text-gray-600">
          The final exam schedule for the fall semester has been released.
          Please check the portal for your specific exam dates and times.
        </p>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800">
          Campus-Wide Internet Maintenance
        </h4>
        <p className="text-sm text-gray-500 mt-1">
          Posted by IT Department on August 18, 2023
        </p>
        <p className="mt-2 text-gray-600">
          Scheduled maintenance for the campus network will occur on August 25th
          from 1 AM to 5 AM. Internet access may be intermittently unavailable
          during this period.
        </p>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800">
          Student Club Fair on Friday!
        </h4>
        <p className="text-sm text-gray-500 mt-1">
          Posted by Student Life on August 15, 2023
        </p>
        <p className="mt-2 text-gray-600">
          Join us this Friday at the main quad for the annual Student Club Fair.
          Discover new clubs, meet new people, and get involved on campus!
        </p>
      </div>
    </div>
  </div>
);

function Admin() {
  const [activeComponent, setActiveComponent] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    // This effect will run on every component re-render
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [activeComponent]);

  const renderContent = () => {
    switch (activeComponent) {
      case "overview":
        return <CampusOverview />;
      case "students":
        return <StudentsPage />;
      case "courses":
        return <CoursesPage />;
      case "faculty":
        return <FacultyPage />;
      case "news":
        return <CampusNewsPage />;
      default:
        return <CampusOverview />;
    }
  };

  const getSidebarItemClasses = (componentName) => {
    const baseClasses =
      "flex items-center space-x-3 p-3 rounded-lg transition-colors hover:bg-gray-200 cursor-pointer";
    const activeClasses = "text-gray-700 bg-gray-100 font-semibold";
    const inactiveClasses = "text-gray-500 hover:text-gray-700";
    return `${baseClasses} ${
      activeComponent === componentName ? activeClasses : inactiveClasses
    }`;
  };

  // New Logout Function
  const handleLogout = () => {
    // Clear the logged-in user data from localStorage
    localStorage.removeItem("loggedInUser");
    sessionStorage.clear(); // Good practice to clear session data too

    // Redirect the user to the login page
    navigate("/", { replace: true });
  };

  return (
    <>
      <Header userName="ravi" department="cse" className="mb-100" />
      <div className="flex min-h-screen font-inter">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-4 flex flex-col items-center shadow-lg rounded-r-2xl h-screen sticky top-0 mt-30">
          <div className="text-2xl font-bold text-gray-800 mb-8 mt-2">
            College Admin
          </div>
          <nav className="w-full space-y-2">
            <div
              onClick={() => setActiveComponent("overview")}
              className={getSidebarItemClasses("overview")}
            >
              <span data-lucide="layout-dashboard"></span>
              <span>Campus Overview</span>
            </div>
            <div
              onClick={() => setActiveComponent("students")}
              className={getSidebarItemClasses("students")}
            >
              <span data-lucide="graduation-cap"></span>
              <span>Students</span>
            </div>
            <div
              onClick={() => setActiveComponent("courses")}
              className={getSidebarItemClasses("courses")}
            >
              <span data-lucide="book"></span>
              <span>Courses</span>
            </div>
            <div
              onClick={() => setActiveComponent("faculty")}
              className={getSidebarItemClasses("faculty")}
            >
              <span data-lucide="briefcase"></span>
              <span>Faculty</span>
            </div>
            <div
              onClick={() => setActiveComponent("news")}
              className={getSidebarItemClasses("news")}
            >
              <span data-lucide="bell"></span>
              <span>Campus News</span>
            </div>
          </nav>
          <div className="mt-auto w-full">
            {/* Logout button with onClick handler */}
            {/* <button
                    onClick={handleLogout}
                    className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-gray-200 text-gray-800 font-semibold w-full transition-colors hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    title="Logout"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-log-out"
                    >
                        <path d="m16 17 5-5-5-5" />
                        <path d="M21 12H9" />
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    </svg>
                    <span>Logout</span>
                </button> */}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto mt-25">
          {renderContent()}
        </main>
      </div>
    </>
  );
}

export default Admin;
