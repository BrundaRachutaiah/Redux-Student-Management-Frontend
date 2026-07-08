import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import {
  addStudentAsync,
  updateStudentAsync,
} from "../features/students/studentsSlice";

const StudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Existing student data (for Edit)
  const student = location.state;

  const [name, setName] = useState(student?.name || "");
  const [age, setAge] = useState(student?.age || "");
  const [grade, setGrade] = useState(student?.grade || "");
  const [gender, setGender] = useState(student?.gender || "Male");
  const [attendance, setAttendance] = useState(
    student?.attendance || ""
  );
  const [marks, setMarks] = useState(student?.marks || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name ||
      !age ||
      !grade ||
      !gender ||
      attendance === "" ||
      marks === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    const studentData = {
      name,
      age: Number(age),
      grade,
      gender,
      attendance: Number(attendance),
      marks: Number(marks),
    };

    if (student) {
      dispatch(
        updateStudentAsync({
          id: student._id,
          updatedStudent: studentData,
        })
      );
    } else {
      dispatch(addStudentAsync(studentData));
    }

    navigate("/");
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h3>
            {student ? "Edit Student" : "Add Student"}
          </h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Name
              </label>

              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Age
              </label>

              <input
                type="number"
                className="form-control"
                value={age}
                onChange={(e) =>
                  setAge(e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Grade
              </label>

              <input
                type="text"
                className="form-control"
                value={grade}
                onChange={(e) =>
                  setGrade(e.target.value)
                }
              />
            </div>

            <div className="mb-3">

              <label className="form-label">
                Gender
              </label>

              <br />

              <input
                type="radio"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) =>
                  setGender(e.target.value)
                }
              />

              Male

              <input
                className="ms-3"
                type="radio"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) =>
                  setGender(e.target.value)
                }
              />

              Female

            </div>

            <div className="mb-3">
              <label className="form-label">
                Attendance
              </label>

              <input
                type="number"
                className="form-control"
                value={attendance}
                onChange={(e) =>
                  setAttendance(e.target.value)
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Marks
              </label>

              <input
                type="number"
                className="form-control"
                value={marks}
                onChange={(e) =>
                  setMarks(e.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="btn btn-success"
            >
              {student
                ? "Update Student"
                : "Add Student"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default StudentForm;