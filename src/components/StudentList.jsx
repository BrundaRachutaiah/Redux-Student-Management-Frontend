import { Link } from "react-router-dom";

const StudentList = ({ students }) => {
  if (students.length === 0) {
    return (
      <div className="alert alert-warning">
        No Students Found.
      </div>
    );
  }

  return (
    <div className="row">
      {students.map((student) => (
        <div
          className="col-md-6 col-lg-4 mb-4"
          key={student._id}
        >
          <div className="card shadow-sm h-100">

            <div className="card-body">

              <h5 className="card-title">
                {student.name}
              </h5>

              <p className="card-text">
                <strong>Age:</strong> {student.age}
              </p>

              <p className="card-text">
                <strong>Gender:</strong> {student.gender}
              </p>

              <p className="card-text">
                <strong>Grade:</strong> {student.grade}
              </p>

              <p className="card-text">
                <strong>Marks:</strong> {student.marks}
              </p>

              <p className="card-text">
                <strong>Attendance:</strong>{" "}
                {student.attendance}%
              </p>

            </div>

            <div className="card-footer bg-white border-0">

              <Link
                to={`/student/${student._id}`}
                className="btn btn-primary w-100"
              >
                View Details
              </Link>

            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentList;