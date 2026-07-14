import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastName: "",
    mobile: "",
    course: "Web Developer",
    gender: "",
  });
  const [studentData, setStudentData] = useState(()=>{
    const savedData = localStorage.getItem("studentData");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [toast, setToast] = useState("");
  const [editId, setEditId] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(formData.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (editId) {
      setStudentData(
        studentData.map((student) => {
          if (student.id !== editId) return student;
          const updated = { ...student };

          Object.keys(formData).forEach((key) => {
            if (formData[key] !== student[key]) {
              updated[key] = formData[key];
            }
          });
          return updated;
        }),
      );
      setEditId(null);
      showToast("Record updated successfully!");
    } else {
      setStudentData((prev)=>[
        ...prev,
        {
          id: Date.now(),
          ...formData,
        },
      ]);
      showToast("Record Created successfully!");
    }
    setFormData({
      firstname: "",
      lastName: "",
      mobile: "",
      course: "",
      gender: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("studentData")) || [];
    setStudentData(storedData);
  }, []);
  useEffect(() => {
    localStorage.setItem("studentData", JSON.stringify(studentData));
  }, [studentData]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      setStudentData(studentData.filter((student) => student.id !== id));

      showToast("Record deleted successfully!");
    }
  };

  const handleEdit = (student) => {
    setEditId(student.id);
    setFormData({
      firstname: student.firstname,
      lastName: student.lastName,
      mobile: student.mobile,
      course: student.course,
      gender: student.gender,
    });
  };

  return (
    <>
      <div className="hero">
        <div className="glass-card">
          <h1 className="counter gradient-text">Student Form</h1>

          <form onSubmit={handleSubmit} className="form-data app-container">
            <div className="form-group">
              <label>
                First Name:
                <input
                  className="form-field"
                  name="firstname"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Last Name:
                <input
                  className="form-field"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Mobile Number:
                <input
                  className=""
                  name="mobile"
                  maxLength={10}
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                Course:
                <select
                  className="hero"
                  name="course"
                  id="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Course</option>
                  <option value="Web Developer">Web Developer</option>
                  <option value="App Developer">App Developer</option>
                  <option value="Data Scientist">Data Scientist</option>
                  <option value="AI Engineer">AI Engineer</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            <div className="radio-group">
              <label>
              <h3>Gender:</h3>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>

            <button type="submit" className="btn">
              {editId ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        <div className="glass-card">
          <h2>Student List</h2>
          {studentData.map((student) => (
            <div key={student.id} className="student-card">
              <h3>
                Name: {student.firstname} {student.lastName}
              </h3>
              <p>Mobile Number: {student.mobile}</p>
              <p>Course: {student.course}</p>
              <p>Gender: {student.gender}</p>

              <button className="btn" onClick={() => handleDelete(student.id)}>
                Delete
              </button>
              <button className="btn" onClick={() => handleEdit(student)}>
                Edit
              </button>
            </div>
          ))}
          {toast && (
            <div className="toast" aria-live="assertive">
              {toast}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
