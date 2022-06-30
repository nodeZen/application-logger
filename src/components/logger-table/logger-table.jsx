import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import "./logger-table.css";
import { removeDuplicateArray } from "../../utils";
import PaginationFactory from "react-bootstrap-table2-paginator";
const LoggerTable = () => {
  const { tableData: data, tableColumns, pagination } = useSelector(
    state => state.applicationLogger
  );

  const [actionTypes, setActionTypes] = useState([]);
  const [applicationTypes, setApplicationTypes] = useState([]);
  const [selectedAgentName, setSelectedAgentName] = useState("");
  const [selectedActionType, setSelectedActionType] = useState("");
  const [selectedApplicationType, setSelectedApplicationType] = useState("");
  const [selectedApplicationId, setSelectedApplicationId] = useState("");
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedTodate, setSelectedTodate] = useState("");

  const paginationProps = PaginationFactory(pagination);
  const tableData = useMemo(
    () =>
      data.filter(datum => {
        const textFilters =
          String(datum.userAgent)
            .toLowerCase()
            .includes(String(selectedAgentName).toLowerCase()) &&
          String(datum.actionType)
            .toLowerCase()
            .includes(String(selectedActionType).toLowerCase()) &&
          String(datum.applicationType)
            .toLowerCase()
            .includes(String(selectedApplicationType).toLowerCase()) &&
          String(datum.logId)
            .toLowerCase()
            .includes(String(selectedApplicationId).toLowerCase());
        if (selectedFromDate && !selectedTodate) {
          return (
            new Date(datum.creationTimestamp).getTime() >=
              new Date(selectedFromDate).getTime() &&
            new Date(datum.creationTimestamp).getTime() <=
              new Date().getTime() &&
            textFilters
          );
        }
        if (selectedFromDate && selectedTodate) {
          return (
            new Date(datum.creationTimestamp).getTime() >=
              new Date(selectedFromDate).getTime() &&
            new Date(datum.creationTimestamp).getTime() <=
              new Date(selectedTodate).getTime() &&
            textFilters
          );
        }
        return textFilters;
      }),
    [
      data,
      selectedAgentName,
      selectedActionType,
      selectedApplicationType,
      selectedApplicationId,
      selectedFromDate,
      selectedTodate
    ]
  );

  useEffect(() => {
    if (Array.isArray(data) && data.length) {
      const allActionTypes = removeDuplicateArray(
        tableData.map(datum => datum.actionType).filter(type => type)
      );
      const allApplicationTypes = removeDuplicateArray(
        tableData.map(datum => datum.applicationType).filter(type => type)
      );
      setActionTypes(allActionTypes);
      setApplicationTypes(allApplicationTypes);
    }
  }, [data, tableData]);

  const selectedAgentNameChangeHandler = event =>
    setSelectedAgentName(event.target.value);

  const selectedActionTypeChangeHandler = event =>
    setSelectedActionType(event.target.value);

  const selectedApplicationTypeChangeHandler = event =>
    setSelectedApplicationType(event.target.value);

  const selectedApplicationIdChangeHandler = event =>
    setSelectedApplicationId(event.target.value);

  const selectedFromDateChangeHandler = event =>
    setSelectedFromDate(event.target.value);

  const selectedTodateChangeHandler = event =>
    setSelectedTodate(event.target.value);

  const clearFiltersHandler = () => {
    setSelectedAgentName("");
    setSelectedActionType("");
    setSelectedApplicationType("");
    setSelectedApplicationId("");
    setSelectedFromDate("");
    setSelectedTodate("");
  }
  
  return (
    <div>
      <div className="px-5 my-3 row">
        <div className="col-md-2 text-start">
          <label htmlFor="employee-name">Employee Name</label>
          <input
            type="text"
            className="form-control"
            id="employee-name"
            value={selectedAgentName}
            onChange={selectedAgentNameChangeHandler}
            placeholder=""
          />
        </div>
        <div className="col-md-2 text-start">
          <label>Action Name</label>
          <select
            className="form-control"
            onChange={selectedActionTypeChangeHandler}
            value={selectedActionType}
          >
            <option selected value="">
              All
            </option>
            {actionTypes.map(type => (
              <option>{type}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2 text-start">
          <label>Application Type</label>
          <select
            className="form-control"
            onChange={selectedApplicationTypeChangeHandler}
            value={selectedApplicationType}
          >
            <option selected value="">
              All
            </option>
            {applicationTypes.map(type => (
              <option>{type}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2 text-start">
          <label htmlFor="from-date">From Date</label>
          <input
            type="date"
            className="form-control"
            id="from-date"
            value={selectedFromDate}
            onChange={selectedFromDateChangeHandler}
            placeholder=""
          />
        </div>
        <div className="col-md-2 text-start">
          <label htmlFor="to-date">To Date</label>
          <input
            type="date"
            className="form-control"
            id="to-date"
            value={selectedTodate}
            onChange={selectedTodateChangeHandler}
            placeholder=""
          />
        </div>
        <div className="col-md-2 text-start">
          <label htmlFor="employee-name">Application ID</label>
          <input
            type="text"
            className="form-control"
            id="application-id"
            value={selectedApplicationId}
            onChange={selectedApplicationIdChangeHandler}
            placeholder=""
          />
        </div>
      </div>
      <div className="p-5">
        {Array.isArray(tableData) && tableData.length > 0 ? (
          <BootstrapTable
            className="bootstrap-table"
            bootstrap4
            keyField="id"
            columns={tableColumns}
            data={tableData}
            pagination={paginationProps}
          />
        ) : (
          <h1>No Data...!!</h1>
        )}
      </div>
    </div>
  );
};

export default LoggerTable;
