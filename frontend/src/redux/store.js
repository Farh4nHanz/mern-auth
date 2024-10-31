import { configureStore } from "@reduxjs/toolkit";

// reducers
import authReducer from "@/redux/slices/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
