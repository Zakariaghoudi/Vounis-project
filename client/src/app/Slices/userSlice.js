import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  for register user : DONE
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
//  for login user : DONE
export const userLogin = createAsyncThunk("/user/login", async (user) => {
  try {
    const response = await axios.post("http://localhost:5000/user/login", user);
    return await response.data;
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
      return await response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.error.message || error.message);
    }
  }
);
//get users
export const getUser = createAsyncThunk(
  "/get/users",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/user");
      return await response.data;
    } catch (error) {
      console.log(error)
    }
  }
);

//update user : edit user Profile 
export const editUser = createAsyncThunk("/edit/user", async ({id, editProfil}) => {  
  try {
    const response = await axios.put(`http://localhost:5000/user/${id}`, editProfil);
    return await response.data;
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
  userList: [],
  status: null,
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
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(userRegister.rejected, (state) => {
      state.status = "failed";
    });
    //  for login : DONE
    builder.addCase(userLogin.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.status = "failed";
    });

    //  for currentUser  : DONE
    builder.addCase(currentUser.pending, (state) => {
      state.status = "pending";
      state.user = null;
    });
    builder.addCase(currentUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.user = action.payload;
    });
    builder.addCase(currentUser.rejected, (state) => {
      state.status = "failed";
      state.user = null;
    });

    // for get all users : DONE
    builder.addCase(getUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.userList = action.payload.users;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.status = "failed";
      state.userList = [];
    });

// update : edit profile of user
 builder.addCase(editUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.userList = action.payload;
    });
    builder.addCase(editUser.rejected, (state) => {
      state.status = "failed";
      state.userList = [];
    });

// delete user 
 builder.addCase(deleteUser.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.userList = action.payload.data;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.status = "failed";
      state.userList = [];
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
