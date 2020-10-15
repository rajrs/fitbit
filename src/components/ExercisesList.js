import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BaseUrl} from '../Config';
import {DateFormat} from'./helper';
 const DataTable = (props)=>{
    console.log(props)

    return (<><table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">username</th>
        <th scope="col">description</th>
        <th scope="col">Time (min)</th>
        <th scope="col">date</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>{props.exercises.map((data,i) => { return (<tr key={i}><td>{i+1}</td><td>{data.username}</td><td>{data.description}</td><td>{data.duration}</td><td>{DateFormat(data.date)}</td><td><Link to={"/edit/"+data._id} className="btn btn-link mr-1"> edit</Link><div className="btn btn-danger" onClick={()=> props.delete(data._id)}>delete</div></td></tr>)})}
    </tbody>
  </table></>)
}
 class ExercisesList extends Component {
        constructor(props) {
            super(props);
            this.state= {exercises:[]}
        }
        componentDidMount(){            
              this.getExercise()      
        }
        getExercise= ()=>{
            console.log('init getExercise')
            axios.get(BaseUrl+'exercise')
            .then(res => {
                console.log(res)
                if (res.data.length > 0) {
                    this.setState({
                        exercises: res.data                
                    });
                   
                }
            }).catch(err =>{  console.log(err)}) 
        }
        onDelete=(id) =>{
            console.log(id)
            axios.delete(BaseUrl+'exercise/'+id)
            .then(res =>{console.log(res.data); this.getExercise() } )
            .catch(err=> console.log(err))
        }
  
    render(){
        return (<><DataTable exercises={this.state.exercises} delete={this.onDelete}/></>)
    }
  
}
export default ExercisesList