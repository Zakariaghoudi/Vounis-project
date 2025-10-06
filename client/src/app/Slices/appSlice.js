import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  application: [],
  status: null,
};

// add new  applications
export const addApplication = createAsyncThunk("/application/add", async () => {
  try {
    const response = await axios.post("http://localhost:5000/applications/add");
    return await response.data;
  } catch (error) {
    console.log(error);
  }
});

// get all applications
export const getApplication = createAsyncThunk("/application/get", async () => {
  try {
    const response = await axios.get("http://localhost:5000/applications");
    return await response.data;
  } catch (error) {
    console.log(error);
  }
});

// update application
export const updateApplication = createAsyncThunk(
  "/application/update",
  async ({ id, editApp }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/applications/${id}`,
        editApp
      );
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
// delete application
export const deleteApplication = createAsyncThunk(
  "/application/delete",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/applications/${id}`
      );
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
      state.application = action.payload;
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
      state.application = action.payload;
    });
    builder.addCase(getApplication.rejected, (state) => {
      state.status = "failed";
    });

    // update the application
    builder.addCase(updateApplication.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateApplication.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.application = action.payload;
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
      state.application = action.payload;
    });
    builder.addCase(deleteApplication.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default applicationSlice.reducer;
