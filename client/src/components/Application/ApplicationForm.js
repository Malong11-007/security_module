import React from "react";
import { useForm } from "react-hook-form";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput
} from "mdbreact";
import API from "../../baseURL";

const FormPage = props => {
  const { register, errors, handleSubmit } = useForm();

  // temporarily used to get Date
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let CompletDate = year + "-" + month + "-" + date;
  
  const onSubmit = data => {

    console.log(props);
    if (props.type === "insert") {
      OnInsert(data);
    } else if(props.type === 'update') {
      OnUpdate(data);
    }
    console.log(errors);
  };

  // In case of Insert new record this function will run
  const OnInsert = data => {
    data["Created_By"] = 1;
    data["Creation_Date"] = CompletDate;
    data["Last_Updated_Date"] = CompletDate;
    data["Last_Updated_By"] = 1;
    console.log(data);

    //Post
    API.post("/application/post", data, {
      header: {
        "Content-Type": "application/json"
      }
    })

      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // In case of Update The form will be fill through props
  const OnUpdate = data => {
    data["Last_Updated_Date"] = newDate;
    data["Last_Updated_By"] = 1;
    console.log(data);

    API.post(`/application/update/${props.record.id}`, data, {
      header: {
        "Content-Type": "application/json"
      }
    })

      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <p style={{ color: "#007bff" }} className="h4 text-center py-4">
                  APPLICATION
                </p>

                <MDBInput
                  style={{ marginBottom: "5px" }}
                  name="Application_Name"
                  inputRef={register({ required: true, maxLength: 250 })}
                  label="Application Name"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
                {errors.Application_Name &&
                  errors.Application_Name.type === "required" && (
                    <p className="form_error">
                      <i className="fas fa-exclamation-triangle"></i> This field
                      is required
                    </p>
                  )}
                {errors.Application_Name &&
                  errors.Application_Name.type === "maxLength" && (
                    <p className="form_error"><i className="fas fa-exclamation-triangle"></i> This field can have a maximum length of 250 </p>
                  )}

                <MDBInput
                  style={{ marginBottom: "5px" }}
                  name="Application_Short_Name"
                  inputRef={register({ required: true, maxLength: 250 })}
                  label="Application Short Name"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
                {errors.Application_Short_Name &&
                  errors.Application_Short_Name.type ===
                    "required" && (
                    <p className="form_error">
                      <i className="fas fa-exclamation-triangle"></i> This field
                      is required
                    </p>
                  )}
                {errors.Application_Short_Name &&
                  errors.Application_Short_Name.type ===
                    "maxLength" && (
                    <p className="form_error"><i className="fas fa-exclamation-triangle"></i> This field can have a maximum length of 250 </p>
                  )}

                <MDBInput
                  style={{ marginBottom: "5px" }}
                  name="Application_Desc"
                  inputRef={register({ required: true, maxLength: 500 })}
                  label="Application Description"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                />
                {errors.Application_Desc &&
                  errors.Application_Desc.type ===
                    "required" && (
                    <p className="form_error">
                      <i className="fas fa-exclamation-triangle"></i> This field
                      is required
                    </p>
                  )}
                {errors.Application_Desc &&
                  errors.Application_Desc.type ===
                    "maxLength" && (
                    <p className="form_error"><i className="fas fa-exclamation-triangle"></i> This field can have a maximum length of 500 </p>
                  )}

                <br />
                <div className="checkbox">
                  <input
                    name="Enabled_Flag"
                    type="checkbox"
                    id="checkbox1"
                    className="checkbox__input"
                    ref={register}
                  />
                  <label htmlFor="checkbox1" className="checkbox__label">
                    Enabled Flag
                  </label>
                </div>

                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Register
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default FormPage;
