import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  for register user : DONE
export const userRegister = createAsyncThunk("/user/register", async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/user/register",
      user
    );
    return  response.data;
  } catch (error) {
    console.log(error);
  }
});

//  for login user : DONE
export const userLogin = createAsyncThunk("/user/login", async (user) => {
  try {
    const response = await axios.post("http://localhost:5000/user/login", user);
    return  response.data;
  } catch (error) {
    console.log(error);
  }
});
// api for current user : DONE
export const currentUser = createAsyncThunk(
  "/user/current",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/user/current", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      return  response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.error.message || error.message);
    }
  }
);
// verification account after register 
export const userVerification = createAsyncThunk("/user/verify", async (user,{rejectWithValue}) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/user/verification",
      user
    );
    return  response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message || error.message);
  }
});

//get users
export const getUser = createAsyncThunk(
  "/get/users",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/user");
      return  response.data.users;
    } catch (error) {
      console.log(error)
    }
  }
);

//update user : edit user Profile 
export const editUser = createAsyncThunk("/edit/user", async ({id, editProfil}) => {  
  try {
    const response = await axios.put(`http://localhost:5000/user/${id}`, editProfil);
    return  response.data;
  } catch (error) {
    console.log(error);
  }
});
// //delete user
export const deleteUser = createAsyncThunk("/delete/user", async (id) => {
  try {
    const result = await axios.delete(`http://localhost:5000/user/${id}`,
     );
    return result ;
  } catch (error) {
    console.log(error);
  }
});


const initialState = {
  user: null,
  status: null,
  error: null,
  userList: [],
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.userList = [];
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {

    // User registration : DONE
    builder.addCase(userRegister.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload.user;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    //  for login : DONE
    builder.addCase(userLogin.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
     builder.addCase(userVerification.pending, (state) => {
      state.status = "pending";
      state.error = null
    });
    builder.addCase(userVerification.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload?.user;
     localStorage.setItem("token", action.payload?.token);

    });
    builder.addCase(userVerification.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    //  for currentUser  : DONE
    builder.addCase(currentUser.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload.user;
    });
    builder.addCase(currentUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    // for get all users : DONE
    builder.addCase(getUser.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.userList = action.payload?.users || [];
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.status = "failed";
      state.userList = [];
      state.error = action.payload;
    });

// update : edit profile of user
 builder.addCase(editUser.pending, (state) => {
      state.status = "pending";
      state.error = null
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

// delete user 
 builder.addCase(deleteUser.pending, (state) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.userList = action.payload.data;
    });
    builder.addCase(deleteUser.rejected, (state,action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
