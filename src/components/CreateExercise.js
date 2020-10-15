import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import {BaseUrl} from '../Config';
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class CreateExercise extends Component {
    constructor(props) {
        super(props);
        this.state ={users:[],message:''}
        
    }
    componentDidMount(){
        //console.log(BaseUrl)
        axios.get(BaseUrl+'user')
        .then(res => {
            if (res.data.length > 0) {
                this.setState({
                    users: res.data.map( data => data.username)                  
                });
                //console.log(this.state.users)
            }
        });
        // console.log('------------- mount-------------')
        // console.log(this.state.users)
    }
    
 onsubmitHandler = (fields,{ setSubmitting, setErrors, resetForm  }) => {    
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
    axios.post(BaseUrl+'exercise/add', fields)
        .then(res => { this.setState({message:res.data}) });
    resetForm({});
    //setTimeout(()=>{ this.setState({message:''}) }, 1000);
    this.props.history.push('/')
}
   
    render() {
        return (
         
            <div>
              
                <Formik initialValues={{
                    username: '',
                    description: '',
                    duration: 0,
                    date:new Date()                   
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string()                       
                        .required('username is required'),
                        description: Yup.string()
                        .required('description is required'),
                        duration: Yup.number() 
                        .moreThan(0)                     
                        .required('duration is required'),
                        date: Yup.date()                       
                        .required('date is required')
                })} 
                onSubmit={this.onsubmitHandler}
                render={({ errors, status, touched ,values,setFieldValue}) => (
                  
                    <Form>
                          <p>{JSON.stringify(values)}</p>
                          <h3>create new exercise </h3>
                          <div className="form-group">
                            <label htmlFor="username">user Name</label>
                            <Field as="select" name="username"   selected={values.username}  className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')}>
                                <option value="" >Choose a User Name</option>
                                {this.state.users.map(user => (<option key={user} value={user}>{user}</option>))}
                                </Field>
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                        </div>
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
                        {/* <input type="text" name="date"  className="form-control" value={this.state.date} onChange={this.oninputChange}/>                                        */}
                        
                        <div className="d-flex">
                        <DatePicker  
                            className="form-control"
                            name="date"
                            selected={values.date}                                    
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

               
              
              
                {/* <form onSubmit={this.onSubmitHandler}>
                    <div className="form-group">
                        <label>User name</label>
                        <select name="username" className="form-control" value={this.state.username} onChange={this.oninputChange}>
                            {this.state.users.map(users => <option key={users} value={users}>{users}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description"  className="form-control" value={this.state.description} onChange={this.oninputChange}></textarea>                        
                    </div>
                    <div className="form-group">
                        <label>Duration</label>
                        <input  type="number" name="duration"  className="form-control" value={this.state.duration} onChange={this.oninputChange}/>                                       
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        {/* <input type="text" name="date"  className="form-control" value={this.state.date} onChange={this.oninputChange}/>                                        */}
                          {/* <div className="d-flex">
                        <DatePicker  className="form-control"
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                        </div>
                       
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button> 
                    </div>
                </form> */}
            </div>
        );
    }
}
export default CreateExercise;