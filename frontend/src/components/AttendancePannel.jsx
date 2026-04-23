"use client";

// src/components/Teacher/AttendancePanel.js
import { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";

const AttendancePanel = ({ sessionActive, onStartSession, onStopSession }) => {
  // Mock list of students
  const students = [
    { id: "CS2024001", name: "John Doe" },
    { id: "CS2024002", name: "Jane Smith" },
    { id: "CS2024003", name: "Alice Johnson" },
    { id: "CS2024004", name: "Bob Williams" },
    { id: "CS2024005", name: "Charlie Brown" },
    { id: "CS2024006", name: "Diana Prince" },
    { id: "CS2024007", name: "Peter Parker" },
    { id: "CS2024008", name: "Bruce Wayne" },
    { id: "CS2024009", name: "Clark Kent" },
    { id: "CS2024010", name: "Lois Lane" }
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-[30%] p-6 border-2 border-gray-300 rounded-lg shadow-md mt-10 ml-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
        STUDENTS
      </h2>

      <>
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-gray-700"
        />

        <div className="border border-gray-200 rounded-lg shadow-inner">
          {filteredStudents.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No students found.</p>
          ) : (
            <ul>
              {filteredStudents.map((student) => (
                <li
                  key={student.id}
                  className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center py-3 px-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <span className="font-medium text-gray-900">
                    {student.name}
                  </span>
                  <span className="text-gray-600 text-sm mt-1 sm:mt-0">
                    ID: {student.id}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </>
    </Card>
  );
};

export default AttendancePanel;
