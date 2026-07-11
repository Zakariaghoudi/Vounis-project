import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// add new  applications
export const addApplication = createAsyncThunk(
  "/application/add",
  async (application, { rejectWithValue }) => {
    try {
      const response = await api.post("/applications/add", application);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);

// get all applications
export const getApplication = createAsyncThunk("/application/get", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/applications");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.msg || error.message);
  }
});

// update application
export const updateApplication = createAsyncThunk(
  "/application/update",
  async ({ id, editApp }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/applications/${id}`, editApp);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);
// delete application
export const deleteApplication = createAsyncThunk(
  "/application/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/applications/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);

const initialState = {
  application: [],
  status: null,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add new application
    builder.addCase(addApplication.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addApplication.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.application.push(action.payload.application);
    });
    builder.addCase(addApplication.rejected, (state) => {
      state.status = "failed";
    });

    //get all applications
    builder.addCase(getApplication.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getApplication.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.application = action.payload.applications || [];
    });
    builder.addCase(getApplication.rejected, (state) => {
      state.status = "failed";
    });

    // update the application
    builder.addCase(updateApplication.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateApplication.fulfilled, (state, action) => {
      state.status = "success";
      const updatedApp = action.payload.application;
      const index = state.application.findIndex((app) => app._id === updatedApp._id);
      if (index !== -1) {
        state.application[index] = updatedApp;
      }
    });
    builder.addCase(updateApplication.rejected, (state) => {
      state.status = "failed";
    });

    // delete the application
    builder.addCase(deleteApplication.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteApplication.fulfilled, (state, action) => {
      state.status = "fulfilled";
      const deletedApp = action.payload.application?._id;
      state.application = state.application.filter((app) => app._id !== deletedApp);
    });
    builder.addCase(deleteApplication.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default applicationSlice.reducer;
