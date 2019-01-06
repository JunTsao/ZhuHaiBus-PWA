import axios from 'axios';

axios.interceptors.response.use(response => response.data);

const prefix = 'https://api.clive.site';
function _RequestData(urlPath) {
  return axios.get(urlPath);
}
function getStationsList({ id }) {
  return _RequestData(`${prefix}/stations/${id}`).then(response => response.map(station => ({
    ...station,
    driveInBusNumber: [],
    driveOutBusNumber: [],
  })));
}

function getRealTimeData({ id, lineNumber, originStation }) {
  return _RequestData(
    `${prefix}/realtime/${id}&${encodeURI(lineNumber)}&${encodeURI(originStation)}`,
  );
}
function getLineDetails({ id, lineNumber }) {
  return _RequestData(`${prefix}/details/${id}&${encodeURI(lineNumber)}`);
}

export default {
  getStationsList,
  getRealTimeData,
  getLineDetails,
};
