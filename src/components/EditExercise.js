import React, { Component } from 'react';

import axios from 'axios';
import {BaseUrl} from '../Config';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";

class EditExercise extends Component {
constructor(props) {
    super(props);
    this.state ={record:{date:new Date()},message:''}
}

componentDidMount(){
    console.log(this.props.match.params.id);
    let Id = this.props.match.params.id;
    axios.get(BaseUrl+'exercise/'+ Id)
    .then(res =>{ 
        console.log(res.data);
        this.setState({record:res.data}) 
    })
    .catch(err => console.log(err))   
    
}

onsubmitHandler = (fields,{ setSubmitting, setErrors, resetForm  }) => {  
    //console.log(this.state.record._id);
    //console.log(BaseUrl+'exercise/' + this.state.record._id)
    const postUrl = BaseUrl+'exercise/update/' + this.state.record._id
    const username =this.state.record.username;  
    //alert( JSON.stringify({...fields,username }, null, 4));
    //console.log({...fields,username })
    axios.put(postUrl, {...fields,username })
        .then(res => {  console.log(res.data); this.setState({message:res.data}) })
        .catch(err => { console.log(err)})      
        this.props.history.push('/')
     
    // resetForm({});
    
  //return  
  
}
    
    render() {       
        return (
            <div>
                <Formik initialValues={{                                  
                    description:this.state.record.description,
                    duration: this.state.record.duration,
                    date: new Date( this.state.record.date ) 
                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    description: Yup.string().required('description is required'),
                    duration: Yup.number().moreThan(0).required('duration is required'),
                    date: Yup.date().required('date is required')
                    })} 
                onSubmit={this.onsubmitHandler}
                render={({ errors, status, touched ,values,setFieldValue}) => (
                   
                    <Form>
                        <p>{JSON.stringify(this.state.record)}</p>
                          <p>{JSON.stringify(values)}</p>
                          <h3>Edit exercise </h3>                          
                        <div className="form-group">
                            <label htmlFor="description">description</label>
                            <Field name="description" as="textarea" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                            <ErrorMessage name="description" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="duration">Duration</label>
                            <Field name="duration" type="number" className={'form-control' + (errors.duration && touched.duration ? ' is-invalid' : '')} />
                            <ErrorMessage name="duration" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                        <label>Date</label> 
                        <div className="d-flex">
                            <DatePicker  
                                className="form-control"
                                name="date"
                                selected={values.date }                                    
                                onChange={date => setFieldValue('date', date)}
                            />
                         <ErrorMessage name="date" component="div" className="invalid-feedback" />
                        </div>                       
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

export default EditExercise;