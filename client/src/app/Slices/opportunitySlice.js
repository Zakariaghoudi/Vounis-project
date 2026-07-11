import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// add new  opportunities
export const addOpportunity = createAsyncThunk(
  "/opportunity/add",
  async (opportunity, { rejectWithValue }) => {
    try {
      const response = await api.post("/opportunities/add", opportunity);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);
// get all opportunities
export const getOpportunity = createAsyncThunk(
  "/opportunity/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/opportunities");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);
// update opportunity
export const updateOpportunity = createAsyncThunk(
  "/opportunity/update",
  async ({ id, editOpportunity }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/opportunities/${id}`, editOpportunity);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);
// delete opportunity
export const deleteOpportunity = createAsyncThunk(
  "/opportunity/delete",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.delete(`/opportunities/${id}`);
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);
const initialState = {
  opportunity: [],
  status: null,
};

export const opportunitySlice = createSlice({
  name: "opportunity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add new opportunity
    builder.addCase(addOpportunity.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(addOpportunity.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(addOpportunity.rejected, (state) => {
      state.status = "failed";
    });

    //get all opportunities
    builder.addCase(getOpportunity.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getOpportunity.fulfilled, (state, action) => {
      state.opportunity = action.payload.opportunities;
      state.status = "fulfilled";
    });
    builder.addCase(getOpportunity.rejected, (state) => {
      state.status = "failed";
    });

    // update the opportunity
    builder.addCase(updateOpportunity.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(updateOpportunity.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(updateOpportunity.rejected, (state) => {
      state.status = "failed";
    });

    // delete the opportunity
    builder.addCase(deleteOpportunity.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteOpportunity.fulfilled, (state, action) => {
      state.status = "fulfilled";
    });
    builder.addCase(deleteOpportunity.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default opportunitySlice.reducer;
