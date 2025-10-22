import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// add new  applications
export const addApplication = createAsyncThunk("/application/add", async (application) => {
  try {
    const response = await axios.post("http://localhost:5000/applications/add", application);
    return await response.data;
  } catch (error) {
    console.log(error);
  }
});

// get all applications
export const getApplication = createAsyncThunk("/application/get", async (_,{rejectWithValue}) => {
  try {
    const response = await axios.get("http://localhost:5000/applications");
    return await response.data;
  } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
  }
});

// update application
export const updateApplication = createAsyncThunk(
  "/application/update",
  async ( {id, editApp  }, {rejectWithValue}) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/applications/${id}`,
        editApp 
      );
      return await response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
    }
  }
);
// delete application
export const deleteApplication = createAsyncThunk(
  "/application/delete",
  async (id, {rejectWithValue}) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/applications/${id}`
      );
      return await response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || error.message);
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
      state.application.push(action.payload);
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
      state.application = action.payload || [];
    });
    builder.addCase(getApplication.rejected, (state) => {
      state.status = "failed";
    });

    // update the application
    builder.addCase(updateApplication.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateApplication.fulfilled, (state, action) => {
      state.status= "success"
      // state.application=action.payload;
      const updatedApp = action.paylod;
      const index = state.application.findIndex(app =>app === updatedApp);
      if(index !== -1 ){
        state.application[index ]= updatedApp;
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
      const deletedApp = action.payload._id;
      state.application =state.application.filter(app=>app._id !== deletedApp);
    });
    builder.addCase(deleteApplication.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default applicationSlice.reducer;
