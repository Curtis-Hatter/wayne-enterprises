import React, { Component } from "react";
import "./List.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fonts/batmfa__.ttf";
import Comparison from "./Comparison";

// import "./fonts/thumb-1920-790645.jpg"

// Whenever we try to render an array containing JSX, React knows to render each JSX element separately
// function List(props) {
//   return (
//     <ul className="list-group">
//       {props.groceries.map(item => (
//         <li className="list-group-item" key={item.id}>
//           {item.name}
//         </li>
//       ))}
//     </ul>
//   );
// }


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

//   searchMovies = query => {
//    API.search(query)
//    //   .then(res => this.setState({ result: res.data }))
//       .then(res => {console.log(res)})
//      .catch(err => console.log(err));
//  };

  componentDidMount(){
   alert("WELCOME TO WAYNE ENTERPRISES");
   alert("To Sort your Employees by column, click on the column headers. There are also footers that you can click on to fire the employees that want benefits.");
   alert("And after firing those pesky freeloaders, you can simply add more employees by clicking on the 'ADD EMPLOYEES' button.")
     for(let i =0; i<11; i++){
     fetch("https://randomuser.me/api/")
      .then(res => res.json())
      .then(result =>{
         let newEmployees = this.state.employees;
      // this.setState({
      //    students: [{id: result.info.seed, name: result.results[0].name.first, age: result.results[0].dob.age, email:result.results[0].email}]
      // })
      // console.log(state.students)
      // employees = (this.state.students);
         newEmployees.push({id: result.info.seed, name: result.results[0].name.first, age: result.results[0].dob.age, email:result.results[0].email, Want_Benefits: Math.floor(Math.random()*2)});
      
         this.setState({
            employees: newEmployees
         })
         // console.log(result.results[0].name.first);
         // console.log(result.results[0].dob.age);
         // console.log(result.results[0].email);
      });
   }
  }

  AddEmployee(){
   // console.log(this.state.students)
   fetch("https://randomuser.me/api/")
   .then(res => res.json())
   .then(result =>{
      let newEmployees = this.state.employees;
      // this.setState({
      //    students: [{id: result.info.seed, name: result.results[0].name.first, age: result.results[0].dob.age, email:result.results[0].email}]
      // })
      // console.log(state.students)
      // employees = (this.state.students);
      newEmployees.push({id: result.info.seed, name: result.results[0].name.first, age: result.results[0].dob.age, email:result.results[0].email, Want_Benefits: Math.floor(Math.random()*2)});
      
      this.setState({
         employees: newEmployees
      })
      // console.log(result);
      // console.log(result.results[0].cell);
      // console.log(employees);
      // this.setState({
      //    students: employees
      // })
      // console.log(result.results[0].name.first);
      // console.log(result.results[0].dob.age);
      // console.log(result.results[0].email);
      });
   }

   //SORT INFORMATION
   SortInfo(value){
      // console.log(value.currentTarget.innerHTML);
      let sortedEmployees = this.state.employees;
      switch(value.currentTarget.innerHTML) {
         case "ID":
            // console.log(sortedEmployees.sort(Comparison("id")));
            this.setState({
               employees: sortedEmployees.sort(Comparison("id"))
            })
           break;
         case "NAME":  
            // console.log(sortedEmployees.sort(Comparison("name")));
            this.setState({
               employees: sortedEmployees.sort(Comparison("name"))
            })
           break;
         case "AGE":
            // console.log(sortedEmployees.sort(Comparison("age")));
            this.setState({
               employees: sortedEmployees.sort(Comparison("age"))
            })
           break;
           case "EMAIL":
            // console.log(sortedEmployees.sort(Comparison("age")));
            this.setState({
               employees: sortedEmployees.sort(Comparison("email"))
            })
           break;  
         default:
         //   console.log(sortedEmployees.sort(Comparison("email")));
           this.setState({
            employees: sortedEmployees.sort(Comparison("Want_Benefits"))
         })
       }
   }
   //FILTER THE EMPLOYEES ON STRIKE
   FilterInfo(value){
      // console.log("clicked");
      // console.log(value.currentTarget.innerHTML);
      let filteredEmployees = [];
      if(value.currentTarget.innerHTML === "WANT_BENEFITS"){
         // console.log(value.currentTarget.innerHTML);
         this.state.employees.forEach(employee => {
            if(!employee.Want_Benefits)
            {
               filteredEmployees.push(employee);
            }
         });
         // console.log(filteredEmployees);
         this.setState({
            employees: filteredEmployees
         })
      }
      else{
         alert("Bruce, you know this one.");
         alert("Fire the troublesome Employees that are on strike by CLICKING on the 'WANT_BENEFITS' tab on the bottom right.");
      }
      // let sortedEmployees = this.state.employees;
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
   //  console.log("clicked")
  let header = Object.keys(this.state.employees[0])
  return header.map((key, index) => {
     return <th key={index} onClick={this.SortInfo.bind(this)}>{key.toUpperCase()}</th>
  })
}

renderTableFooter() {
   //  console.log("clicked")
  let header = Object.keys(this.state.employees[0])
  return header.map((key, index) => {
     return <th key={index} onClick={this.FilterInfo.bind(this)}>{key.toUpperCase()}</th>
  })
}

  render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
   
     return (
       
        <div className="container margin" >
           <h1>Here are your employees Mister Wayne</h1>
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

            </div>
        </div>

     )
  }
}

export default List;
