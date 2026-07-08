import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  "https://redux-student-management-backend.vercel.app/students";

// =========================
// GET Students
// =========================

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// =========================
// ADD Student
// =========================

export const addStudentAsync = createAsyncThunk(
  "students/addStudent",
  async (student, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, student);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// =========================
// UPDATE Student
// Backend uses POST instead of PUT
// =========================

export const updateStudentAsync = createAsyncThunk(
  "students/updateStudent",
  async ({ id, updatedStudent }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/${id}`,
        updatedStudent
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// =========================
// DELETE Student
// =========================

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudent",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  students: [],
  status: "idle",
  error: null,
  filter: "All",
  sortBy: "Name",
};

export const studentsSlice = createSlice({
  name: "students",

  initialState,

  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch Students
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })

      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "success";
        state.students = action.payload;
      })

      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Add Student
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })

      // Update Student
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (student) => student._id === action.payload._id
        );

        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })

      // Delete Student
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student._id !== action.payload
        );
      });
  },
});

export const { setFilter, setSortBy } = studentsSlice.actions;

export default studentsSlice.reducer;