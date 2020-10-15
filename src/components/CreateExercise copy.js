import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class CreateExercise extends Component {
    constructor(props) {
        super(props);
        this.state ={
                username:'',
                description:'',
                duration:0,
                date:new Date(),
                users:[]
                        }
        this.oninputChange = this.oninputChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }
    componentDidMount(){
        axios.get('http://localhost:5000/user')
        .then(res => {
            if (res.data.length > 0) {
                this.setState({
                    users: res.data.map( data => data.username),
                    username:res.data[0].username
                })
            }
        })
    }
    oninputChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    onChangeDate(date) {
        console.log(date)
        this.setState({
          date: date
        })
      }
    onSubmitHandler(e){
        e.preventDefault();
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <p> state {JSON.stringify(this.state)}</p>
                <h3>create new exercise</h3>
                <form onSubmit={this.onSubmitHandler}>
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
                        <div className="d-flex">
                        <DatePicker  className="form-control"
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                        />
                        </div>
                       
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button> 
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateExercise;