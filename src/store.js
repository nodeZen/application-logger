import { configureStore } from '@reduxjs/toolkit';
import applicationLogger from "./store/application-logger.slice";
const store = configureStore({
  reducer: {
      applicationLogger
  },
});

export default store;