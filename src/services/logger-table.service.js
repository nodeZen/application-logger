import axios from "axios";
import { setTableData } from "../store/application-logger.slice";
import { textFormatter } from "../utils";

const getTableData = () => dispatch => {
  return axios
    .get("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f")
    .then(res => {
      if (
        res.data.success === true &&
        res.data.result &&
        Array.isArray(res.data.result.auditLog)
      ) {
        const modifiedAuditLogData = res.data.result.auditLog.map(audit => ({
          ...audit,
          actionType: textFormatter(audit.actionType),
          applicationType: textFormatter(audit.applicationType),
        }));
        dispatch(setTableData(modifiedAuditLogData));
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export default getTableData;


// applicationType