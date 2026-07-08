import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStudents } from "../features/students/studentsSlice";
import StudentList from "../components/StudentList";

const StudentView = () => {
  const dispatch = useDispatch();

  const { students, status, error } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [dispatch, status]);

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Student View</h2>

        <Link
          to="/addStudent"
          className="btn btn-primary"
        >
          Add Student
        </Link>

      </div>

      {status === "loading" && (
        <div className="alert alert-info">
          Loading Students...
        </div>
      )}

      {status === "failed" && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {status === "success" && (
        <StudentList students={students} />
      )}

    </div>
  );
};

export default StudentView;