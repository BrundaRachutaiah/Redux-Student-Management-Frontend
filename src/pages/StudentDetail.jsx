import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { deleteStudentAsync } from "../features/students/studentsSlice";

const StudentDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const student = useSelector((state) =>
    state.students.students.find((student) => student._id === id)
  );

  if (!student) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Student Not Found.
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (confirmDelete) {
      dispatch(deleteStudentAsync(student._id));
      navigate("/");
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">
          <h2>{student.name}</h2>
        </div>

        <div className="card-body">

          <p>
            <strong>Age:</strong> {student.age}
          </p>

          <p>
            <strong>Gender:</strong> {student.gender}
          </p>

          <p>
            <strong>Grade:</strong> {student.grade}
          </p>

          <p>
            <strong>Attendance:</strong> {student.attendance}%
          </p>

          <p>
            <strong>Marks:</strong> {student.marks}
          </p>

          <div className="mt-4">

            <Link
              to={`/editStudent/${student._id}`}
              state={student}
              className="btn btn-warning me-2"
            >
              Edit Details
            </Link>

            <button
              className="btn btn-danger me-2"
              onClick={handleDelete}
            >
              Delete
            </button>

            <Link
              to="/"
              className="btn btn-secondary"
            >
              Back
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default StudentDetail;