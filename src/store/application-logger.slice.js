import applicationLoggerState from "./application-logger.state";
import { createSlice } from "@reduxjs/toolkit";

export const applicationLogger = createSlice({
    name: 'applicationLogger',
    initialState: applicationLoggerState,
    reducers: {
      setTableData : (state, action) => {
        state.tableData = action.payload;
      }
    },
  });
  
  export const { setTableData } = applicationLogger.actions;
  
  export default applicationLogger.reducer;