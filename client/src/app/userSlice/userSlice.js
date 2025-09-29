import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  user: null,
  status: null,
};
// api for register user
export const userRegister = createAsyncThunk("/user/register", async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/user/register",
      user
    );
    return await response.data;
  } catch (error) {
    console.log(error);
  }
});
// api for login user
export const userLogin = createAsyncThunk("/user/login", async (user) => {
  try {
    const response = await axios.post("http://localhost:5000/user/login", user);
    return await response.data;
  } catch (error) {
    console.log(error);
  }
});
// api for current user
export const currentUser = createAsyncThunk("/user/current", async (_, {rejectWithValue}) => {
  try {
       const token = localStorage.getItem('token')
       if(token){
      return rejectWithValue( 'you can not access this page')
      }
       const response = await axios.get("http://localhost:5000/user/current", {
      headers: { Authorization :{token}}      
    });
    return await response.data;
  } catch (error) {
  return  rejectWithValue(error.response?.data?.message || error.message);
}
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state)=>{
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(userRegister.rejected, (state) => {
      state.status = "failed";
    });
    // extraReducers for login
    builder.addCase(userLogin.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.status = "failed";
    });
    // extraReducers for currentUser
    builder.addCase(currentUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      state.user = action.payload
    });
    builder.addCase(currentUser.rejected, (state) => {
      state.status = "failed";
    });
  },
});
export const{logout} = userSlice.actions;
export default userSlice.reducer;
