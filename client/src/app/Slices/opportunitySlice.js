import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  opportunity: [],
  status: null,
};

// add new  opportunities
export const addOpportunity = createAsyncThunk("/opportunity/add", async () =>{
  try {
    const response = await axios.post("http://localhost:5000/opportunities/add");
    return await response.data;
  } catch (error) {
    console.log(error);
  }
});
// get all opportunities
export const getOpportunity = createAsyncThunk("/opportunity/get", async () =>{
  try {
    const response = await axios.get("http://localhost:5000/opportunities");
    return await response.data.opportunities;
  } catch (error) {
    console.log(error);
  }
});
// update opportunity
export const updateOpportunity = createAsyncThunk("/opportunity/update", async ({id, editOpportunity}) =>{
  try {
    const response = await axios.put(`http://localhost:5000/opportunities/${id}`,
      editOpportunity
    );
    return await response.data;
  } catch (error) {
    console.log(error);
  }
});
// delete opportunity
export const deleteOpportunity = createAsyncThunk("/opportunity/delete", async (id) =>{
  try {
    const response = await axios.delete(`http://localhost:5000/opportunities/${id}`);
    return await response.data;
  } catch (error) {
    console.log(error);
  }
});

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
    state.opportunity = action.payload;
  });
  builder.addCase(addOpportunity.rejected, (state) => {
    state.status = "failed";
  });

  //get all opportunities 
  builder.addCase(getOpportunity.pending, (state) => {
    state.status = "pending";
  })
  builder.addCase(getOpportunity.fulfilled, (state, action) => {
    state.status = "fulfilled";
    state.opportunity = action.payload;
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
    state.opportunity = action.payload;
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
      state.opportunity = action.payload;
    });
    builder.addCase(deleteOpportunity.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default opportunitySlice.reducer;
