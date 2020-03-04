import React from "react";
import { useForm } from 'react-hook-form'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import API from "../../baseURL"; 


const ApplicationForm = (props) => {

  
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let CompletDate = year+'-'+month+'-'+date;

  const { register, errors,  handleSubmit } = useForm()
  const onSubmit = data => {
    console.log(props);
    if(props.type === "insert" )
    {
    OnInsert(data);
    }
    else
    {
      OnUpdate(data);
      
    }
    console.log(errors)
 }
 //ForInsert
const OnInsert =(data)=>
{

  data["Created_By"] = 1
  data["Creation_Date"] = CompletDate
  data["Last_Updated_Date"] = CompletDate
  data["Last_Updated_By"] = 1
  console.log(data)

  //Post
  API.post('/application/post', data, {
    header: {
      "Content-Type" : "application/json"
    }
  })

  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

//forUpdate
const OnUpdate = (data)=>
{

  const {Application_ID, Application_Desc,Application_Name,Application_Short_Name,Enabled_Flag} = props.record
  if(data.Application_Name === Application_Name && data.Application_Short_Name === Application_Short_Name && data.Application_Desc === Application_Desc && data.Enabled_Flag == Enabled_Flag){
    alert('No Data Change To Be Noted')
    return;
  }
  
  data["Last_Updated_Date"] = CompletDate
  data["Last_Updated_By"] = 1
 
  //Update
  API.put(`/application/update/${Application_ID}`, data, {
    header: {
      "Content-Type" : "application/json"
    }
  })

  .then(function (response) {
    console.log(response);
    props.onClose(false);
    props.getApplications();
  })
  .catch(function (error) {
    console.log(error);
  });
}

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol>
         
              <form  onSubmit={handleSubmit(onSubmit)}>
                <p style = {{color : "#007bff"}} className="h4 text-center py-4">APPLICATION</p>
                
                  <MDBInput style = {{marginBottom:"5px" }} name="Application_Name" valueDefault = {props.type === "update" ? props.record.Application_Name : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Application Name"  group type="text"  validate error="wrong" success="right" />
                  {errors.Application_Name && errors.Application_Name.type === "required" &&  <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
                  {errors.Application_Name && errors.Application_Name.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 250 </p>}

            
               
                  <MDBInput style = {{marginBottom:"5px" }} name ="Application_Short_Name" valueDefault = {props.type === "update" ? props.record.Application_Short_Name : ""} inputRef={register({ required: true, maxLength: 255 })   }  label="Application Short Name"  group type="text"  validate error="wrong" success="right" />
                  {errors.Application_Short_Name && errors.Application_Short_Name.type === "required" && <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
                  {errors.Application_Short_Name && errors.Application_Short_Name.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 250 </p>}

                  
                 
                  <MDBInput style = {{marginBottom:"5px" }} name="Application_Desc" valueDefault = {props.type === "update" ? props.record.Application_Desc : ""} inputRef={register({ required: true, maxLength: 500 })   }  label="Application Description"  group type="text"  validate error="wrong" success="right" />
                  {errors.Application_Desc && errors.Application_Desc.type === "required" && <p className = "form_error"> <i className="fas fa-exclamation-triangle"></i> This field is required</p>}
                  {errors.Application_Desc && errors.Application_Desc.type === "maxLength" && <p className = "form_error"> Maximum Length Allowed is 500 </p>}

                  <br/>
                  <div class="checkbox">
                    <input name = "Enabled_Flag" defaultChecked = {props.type === "update" ? (props.record.Enabled_Flag === "1" ? true : false ) : false  } type="checkbox" id="checkbox1" className ="checkbox__input" ref={register} />
                    <label for="checkbox1" className ="checkbox__label"  >Enabled Flag</label>
                  </div>

                  <div className="text-center py-4 mt-3">
                    <MDBBtn color="cyan"  type="submit">
                    {
                      props.type === "insert" ? "Register" : "Update"
                    }
                    </MDBBtn>
                  </div>
             </form>
           
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ApplicationForm;