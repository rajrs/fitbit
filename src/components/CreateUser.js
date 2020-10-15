import React, { Component } from 'react';
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {BaseUrl} from '../Config';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state ={success:'',showSuccess:false,error:"" ,showError:false,}        
    }
    onsubmitHandler = (fields,{ setSubmitting, setErrors, resetForm  }) => {    
        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
        axios.post(BaseUrl+'user/add', fields)
            .then(res => {  
                console.log(res);
                this.setState({success:res.data,showSuccess:true});
                setTimeout(()=>{ this.setState({showSuccess:false}) }, 2000);
             })               
            .catch((err) => {
                console.log(err.response)
                if (err.response) {
                    this.setState({error:err.response.data.errorMsg ,showError:true})
                    setTimeout(()=>{ this.setState({showError:false}) }, 2000);
                  } 
            })
            resetForm({});
           
        
    }
    render() {
        return (
            <div>
                <p>{JSON.stringify(this.state)}</p>
                {(this.state.showSuccess)? (<div className="alert alert-success mt-2" role="alert">{this.state.success}</div>): null}                
                {(this.state.showError)? (<div className="alert alert-danger mt-2" role="alert">{this.state.error}</div>): null } 
              
               <Formik initialValues={{
                    username: ''                                
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string()                       
                        .required('username is required')
                        .min(3),
                      
                })} 
                onSubmit={this.onsubmitHandler}
                render={({ errors, status, touched ,values,setFieldValue}) => (
                  
                    <Form>
                          <p>{JSON.stringify(values)}</p>
                          <h3>create new exercise </h3>
                          <div className="form-group">
                            <label htmlFor="username">user Name</label>
                            <Field  name="username"   selected={values.username}  className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}>                               
                                </Field>
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Submit</button>
                            <button type="reset" className="btn btn-secondary">Reset</button>
                        </div>
                    </Form>
                )}

                />
            </div>
        );
    }
}

export default CreateUser;