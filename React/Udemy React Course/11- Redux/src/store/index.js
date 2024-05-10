import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import authReducer from "./auth";

// Redux store
const store = configureStore({
  // Hokus pokus!  (counterSlice -> counterReducer & authSlice -> authReducer)
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;
