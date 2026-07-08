import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  updateSchoolStats,
  setTopStudent,
} from "../features/school/schoolSlice";

const SchoolView = () => {
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.students);

  const {
    totalStudents,
    averageAttendance,
    averageMarks,
    topStudent,
  } = useSelector((state) => state.school);

  useEffect(() => {
    if (students.length > 0) {
      const totalStudents = students.length;

      const totalAttendance = students.reduce(
        (sum, student) => sum + student.attendance,
        0
      );

      const totalMarks = students.reduce(
        (sum, student) => sum + student.marks,
        0
      );

      const averageAttendance =
        totalAttendance / totalStudents;

      const averageMarks =
        totalMarks / totalStudents;

      const topStudent = students.reduce((top, student) =>
        student.marks > top.marks ? student : top
      );

      dispatch(
        updateSchoolStats({
          totalStudents,
          averageAttendance,
          averageMarks,
        })
      );

      dispatch(setTopStudent(topStudent));
    }
  }, [students, dispatch]);

  return (
    <div className="container mt-4">

      <h2 className="mb-4">School View</h2>

      <div className="row">

        <div className="col-md-3">

          <div className="card bg-primary text-white">

            <div className="card-body">

              <h5>Total Students</h5>

              <h2>{totalStudents}</h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card bg-success text-white">

            <div className="card-body">

              <h5>Average Attendance</h5>

              <h2>
                {averageAttendance.toFixed(2)}%
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card bg-warning">

            <div className="card-body">

              <h5>Average Marks</h5>

              <h2>
                {averageMarks.toFixed(2)}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card bg-info text-white">

            <div className="card-body">

              <h5>Top Student</h5>

              <h5>
                {topStudent ? topStudent.name : "-"}
              </h5>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SchoolView;