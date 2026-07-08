import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import StudentView from "./pages/StudentView";
import StudentForm from "./pages/StudentForm";
import StudentDetail from "./pages/StudentDetail";
import ClassView from "./pages/ClassView";
import SchoolView from "./pages/SchoolView";

function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>

        <Route
          path="/"
          element={<StudentView />}
        />

        <Route
          path="/addStudent"
          element={<StudentForm />}
        />

        <Route
          path="/student/:id"
          element={<StudentDetail />}
        />

        <Route
          path="/editStudent/:id"
          element={<StudentForm />}
        />

        <Route
          path="/classes"
          element={<ClassView />}
        />

        <Route
          path="/school"
          element={<SchoolView />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;