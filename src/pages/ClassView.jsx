import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSortBy } from "../features/students/studentsSlice";

const ClassView = () => {
  const dispatch = useDispatch();

  const { students, filter, sortBy } = useSelector(
    (state) => state.students
  );

  // Filter Students
  const filteredStudents = students.filter((student) => {
    if (filter === "All") return true;
    if (filter === "Boys") return student.gender === "Male";
    if (filter === "Girls") return student.gender === "Female";
    return true;
  });

  // Sort Students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case "Marks":
        return b.marks - a.marks;

      case "Attendance":
        return b.attendance - a.attendance;

      case "Name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Class View</h2>

      <div className="row mb-4">

        <div className="col-md-6">

          <label className="form-label">
            Filter Students
          </label>

          <select
            className="form-select"
            value={filter}
            onChange={(e) =>
              dispatch(setFilter(e.target.value))
            }
          >
            <option value="All">All</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>

        </div>

        <div className="col-md-6">

          <label className="form-label">
            Sort Students
          </label>

          <select
            className="form-select"
            value={sortBy}
            onChange={(e) =>
              dispatch(setSortBy(e.target.value))
            }
          >
            <option value="Name">Name</option>
            <option value="Marks">Marks</option>
            <option value="Attendance">Attendance</option>
          </select>

        </div>

      </div>

      <table className="table table-bordered table-striped">

        <thead className="table-dark">

          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Grade</th>
            <th>Marks</th>
            <th>Attendance</th>
          </tr>

        </thead>

        <tbody>

          {sortedStudents.map((student) => (

            <tr key={student._id}>

              <td>{student.name}</td>

              <td>{student.gender}</td>

              <td>{student.grade}</td>

              <td>{student.marks}</td>

              <td>{student.attendance}%</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ClassView;