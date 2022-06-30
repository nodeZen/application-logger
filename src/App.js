import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import LoggerTable from "./components/logger-table/logger-table";
import getTableData from "./services/logger-table.service";
import './App.css';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getTableData());
  }, [dispatch])
  return (
    <div className="App">
      <LoggerTable />
    </div>
  );
}

export default App;
