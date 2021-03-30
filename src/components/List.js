import React, { Component } from "react";
import "./List.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fonts/batmfa__.ttf";
import Comparison from "./Comparison";


class List extends Component{
  constructor(props) {
     super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
     this.state = { //state is by default an object
        employees: [
           { id: "008f319e3c636b8e", name: 'Wasif', age: 21, email: 'wasif.asmil@example.com', Want_Benefits: 0},
           { id: "6bd0cab9d7a9c057", name: 'Ol Mama', age: 49, email: 'simplywants.tofeedchildren@example.com', Want_Benefits: 1},
           { id: "8e0d36e61ce3fc7a", name: 'Sad', age: 16, email: 'sad.greatpain@example.com', Want_Benefits: 0},
           { id: "177bb39f3ee245bd", name: 'Wubba', age: 25, email: 'wubba.lubba@example.com', Want_Benefits: 1}
        ]
     }
  }

  reset(){
   let newEmployees = [];
   newEmployees.push(
      { id: "008f319e3c636b8e", name: 'Wasif', age: 21, email: 'wasif.asmil@example.com', Want_Benefits: 0},
      { id: "6bd0cab9d7a9c057", name: 'Ol Mama', age: 49, email: 'simplywants.tofeedchildren@example.com', Want_Benefits: 1},
      { id: "8e0d36e61ce3fc7a", name: 'Sad', age: 16, email: 'sad.greatpain@example.com', Want_Benefits: 0},
      { id: "177bb39f3ee245bd", name: 'Wubba', age: 25, email: 'wubba.lubba@example.com', Want_Benefits: 1}
   )
     for(let i =0; i<11; i++){
      fetch("https://randomuser.me/api/")
       .then(res => res.json())
       .then(result =>{
          
          newEmployees.push({id: result.info.seed, name: result.results[0].name.first, age: result.results[0].dob.age, email:result.results[0].email, Want_Benefits: Math.floor(Math.random()*2)});

          this.setState({
             employees: newEmployees
          })
       });
   }
  }
  componentDidMount(){
   alert("WELCOME TO WAYNE ENTERPRISES");
   alert("To Sort your Employees by column, click on the column headers. There are also footers that you can click on to fire the employees that want benefits.");
   alert("And after firing those pesky freeloaders, you can simply add more employees by clicking on the 'ADD EMPLOYEES' button.")
   alert("Finally, to filter an employee out: type in the name in the input field and the employee containing that name will display. You can reset your employees by clicking on 'EMPLOYEES' in the header.")
     for(let i =0; i<11; i++){
     fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(result =>{
         let newEmployees = this.state.employees;
         newEmployees.push({id: result.info.seed, name: result.results[0].name.first, age: result.results[0].dob.age, email:result.results[0].email, Want_Benefits: Math.floor(Math.random()*2)});
      
         this.setState({
            employees: newEmployees
         })
      });
   }
  }

  AddEmployee(){
   fetch("https://randomuser.me/api/")
   .then(res => res.json())
   .then(result =>{
      let newEmployees = this.state.employees;
      newEmployees.push({id: result.info.seed, name: result.results[0].name.first, age: result.results[0].dob.age, email:result.results[0].email, Want_Benefits: Math.floor(Math.random()*2)});
      
      this.setState({
         employees: newEmployees
      })
      });
   }

   //SORT INFORMATION
   SortInfo(value){
      let sortedEmployees = this.state.employees;
      switch(value.currentTarget.innerHTML) {
         case "ID":
            this.setState({
               employees: sortedEmployees.sort(Comparison("id"))
            })
           break;
         case "NAME":  
            this.setState({
               employees: sortedEmployees.sort(Comparison("name"))
            })
           break;
         case "AGE":
            this.setState({
               employees: sortedEmployees.sort(Comparison("age"))
            })
           break;
           case "EMAIL":
            this.setState({
               employees: sortedEmployees.sort(Comparison("email"))
            })
           break;  
         default:
           this.setState({
            employees: sortedEmployees.sort(Comparison("Want_Benefits"))
         })
       }
   }
   //FILTER THE EMPLOYEES ON STRIKE
   FilterInfo(value){
      let filteredEmployees = [];
      if(value.currentTarget.innerHTML === "WANT_BENEFITS"){
         this.state.employees.forEach(employee => {
            if(!employee.Want_Benefits)
            {
               filteredEmployees.push(employee);
            }
         });
         this.setState({
            employees: filteredEmployees
         })
      }
      else{
         alert("Bruce, you know this one.");
         alert("Fire the troublesome Employees that are on strike by CLICKING on the 'WANT_BENEFITS' tab on the bottom right.");
      }
   }

   //RENDER DATA ONTO FANCY TABLE
  renderTableData() {
    return this.state.employees.map((employee, index) => {
       const { id, name, age, email, Want_Benefits } = employee //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{name}</td>
             <td>{age}</td>
             <td>{email}</td>
             <td>{Want_Benefits}</td>
          </tr>
       )
    })
 }

 renderTableHeader() {
  let header = Object.keys(this.state.employees[0])
  return header.map((key, index) => {
     return <th key={index} onClick={this.SortInfo.bind(this)}>{key.toUpperCase()}</th>
  })
}

 renderTableFooter() {
  let header = Object.keys(this.state.employees[0])
  return header.map((key, index) => {
     return <th key={index} onClick={this.FilterInfo.bind(this)}>{key.toUpperCase()}</th>
  })
}

   handleInputChange = event => {
      // Getting the value and name of the input which triggered the change
      const { value } = event.target;
      // console.log(value);
      // Updating the input's state
      const filteredEmployees = this.state.employees.filter((employee) => {
         // console.log(employee.name);
         return employee.name.includes(value);
      })
      
      if(filteredEmployees.length !== 0)
      {
         // console.log(filteredEmployees);
         this.setState({employees: filteredEmployees});
      }
      
   };

  render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
     return (
        <div className="container margin" >
           <h1>Here are your <span onClick={this.reset.bind(this)}>employees </span> Mister Wayne</h1>
           <input className="form-control " aria-label="Small" aria-describedby="inputGroup-sizing-sm" 
           value={this.state.name}
           name="name"
           onChange={this.handleInputChange}
           type="text"
           placeholder="Name"
           />
           <table id='list'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
                  <tr>{this.renderTableFooter()}</tr>
               </tbody>
            </table>
            <div className="row text-center">
               <div className="col-md-4"></div>
               <button className="batman col-md-4" onClick={this.AddEmployee.bind(this)}>Add Employee</button>
               <div className="col-md-4"></div>
            </div>
        </div>
     )
  }
}

export default List;
