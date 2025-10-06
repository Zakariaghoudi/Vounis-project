import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../Slices/userSlice";
import opportunitySlice from "../Slices/opportunitySlice";
import applicationSlice from "../Slices/appSlice";


const store = configureStore({
  reducer: {
    user: userSlice,
    opportunity: opportunitySlice,
    application: applicationSlice,
  },
});
export default store;
