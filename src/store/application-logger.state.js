const applicationLoggerState = {
  tableColumns: [
    { dataField: "logId", text: "Log ID", sort : true },
    { dataField: "applicationType", text: "Application Type", sort : true },
    { dataField: "applicationId", text: "Application ID", sort : true },
    { dataField: "actionType", text: "Action", sort : true },
    { dataField: "userAgent", text: "Action Details", sort : true },
    { dataField: "creationTimestamp", text: "Date : Time", sort : true }
  ],
  pagination: {
     page:1,
     sizePerPage:5,
     lastPageText: ">>",
     firstPageText: "<<",
     nextPageText: ">",
     prePageText: "<",
     showTotal: true
  },
  tableData: []
};

export default applicationLoggerState;
