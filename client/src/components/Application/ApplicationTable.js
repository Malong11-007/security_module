import React, { useEffect, useState } from "react";
import { MDBDataTable, MDBBtn } from "mdbreact";
import API from "../../baseURL";

const ApplicationTable = () => {
  const [Application, setApplication] = useState();

  const getApplications = () => {
    API.get("/application/get", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(responce => {
        console.log(responce.data);
        if (responce.data !== Application) {
          setApplication(responce.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getApplications();
  }, []) // eslint-disable-line

  const data = {
    columns: [
      {
        label: "Application Name",
        field: "Application_Name",
        sort: "asc",
        width: 150
      },
      {
        label: "Application Short Name ",
        field: "Application_Short_Name",
        sort: "asc",
        width: 270
      },
      {
        label: "Application Description",
        field: "Application_Desc",
        sort: "asc",
        width: 200
      },
      {
        label: "Enabled Flag",
        field: "Enabled_Flag",
        sort: "asc",
        width: 100
      },
      {
        label: "Creation Date",
        field: "Creation_Date",
        sort: "asc",
        width: 150
      },
      {
        label: "Created By",
        field: "Created_By",
        sort: "asc",
        width: 100
      },
      {
        label: "Updated Date",
        field: "Last_Updated_Date",
        sort: "asc",
        width: 100
      },
      {
        label: "Updated By",
        field: "Last_Updated_By",
        sort: "asc",
        width: 100
      },
      {
        label: "Edit",
        id: "edit_record",
        Cell: props => {
          return (
            <MDBBtn 
              onClick={() => console.log(props)}
              color="cyan"
              type="submit"
            >Edit</MDBBtn>
          )
        },
        maxWidth: 150
      }
    ],
    rows: Application
  };

  return (
    <MDBDataTable 
      striped 
      key="reactTable"
      bordered 
      hover 
      data={data}
    />
  )
};

export default ApplicationTable;
