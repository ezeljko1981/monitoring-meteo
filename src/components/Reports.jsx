import React, {useCallback} from 'react'
import Button from "react-bootstrap/Button";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

var endPoint = "https://vtszr-9e108.firebaseio.com/meteoarchive3.json";

function Reports(){

  function Get(targetUrl){
      var Httpreq = new XMLHttpRequest();
      Httpreq.open("GET",targetUrl,false);
      Httpreq.send(null);
      return Httpreq.responseText;
  }

  //report 1 - json
  const onGetJsonData = useCallback(() => {
    var rawData = Get(endPoint);
    var e = document.getElementById("mydiv");
    e.innerText = rawData;
  }, [])

  //report 2 - csv
  function JsonToCSV() {
      var JsonFields = ["atmpressure", "dayofweek", "relhumidity", "temperature", "time"]
      var csvStr = JsonFields.join(",") + "<br/>";
      var JsonArray  = JSON.parse(Get(endPoint));
      JsonArray.forEach(element => {
          let F1 = element.atmpressure;
          let F2 = element.dayofweek;
          let F3 = element.relhumidity;
          let F4 = element.temperature;
          let F5 = element.time;
          csvStr += F1 + ',' + F2 + ',' + F3 + ',' + F4 + ',' + F5 + "<br/>";
      })
      return csvStr;
  }

  const onGetCSVData = useCallback(() => {
    var e = document.getElementById("mydiv");
    e.innerHTML = JsonToCSV();
  }, [])

  //report 3 - excel format
  const downloadExcelFile = () => {
    var apiData  = JSON.parse(Get(endPoint));
    const fileType ="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const fileName = Date().toLocaleString();
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return(
    <div>
      <br/>
      <Button variant="info" onClick={() => {onGetJsonData()}}>Report in JSON format</Button>&nbsp;
      <Button variant="info" button onClick={() => {onGetCSVData()}}>Report in CSV format</Button>&nbsp;
      <Button variant="info" button onClick={() => {downloadExcelFile()}}>Export to Excel</Button>
      <br/>
      <div id="mydiv" />
    </div>
  );
}

export default Reports;
