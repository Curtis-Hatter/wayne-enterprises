import React, { Component } from "react";
import "./List.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fonts/batmfa__.ttf";

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
           { id: "008f319e3c636b8e", name: 'Wasif', age: 21, email: 'wasif.asmil@example.com' },
           { id: "6bd0cab9d7a9c057", name: 'Rudder', age: 19, email: 'rudder.rudd@example.com' },
           { id: "8e0d36e61ce3fc7a", name: 'Sad', age: 16, email: 'sad.greatpain@example.com' },
           { id: "177bb39f3ee245bd", name: 'Wubba', age: 25, email: 'wubba.lubba@example.com' }
        ]
     }
  }

//   searchMovies = query => {
//    API.search(query)
//    //   .then(res => this.setState({ result: res.data }))
//       .then(res => {console.log(res)})
//      .catch(err => console.log(err));
//  };

//   componentDidMount(){
//      fetch("https://randomuser.me/api/")
//       .then(res => res.json())
//       .then(result =>{
//          // this.setState({
//          // })
//          // console.log(result);
//          // console.log(result.results[0].cell);
//          this.setState({
//             employees: [{id: result.info.seed, name: result.results[0].name.first, age: result.results[0].dob.age, email:result.results[0].email}]
//          })
//          // console.log(result.results[0].name.first);
//          // console.log(result.results[0].dob.age);
//          // console.log(result.results[0].email);
//       });
//   }

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
      newEmployees.push({id: result.info.seed, name: result.results[0].name.first, age: result.results[0].dob.age, email:result.results[0].email});
      
      this.setState({
         students: newEmployees
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

   SortInfo(value){
      console.log(value.currentTarget.innerHTML);
   }

  renderTableData() {
    return this.state.employees.map((employee, index) => {
       const { id, name, age, email } = employee //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{name}</td>
             <td>{age}</td>
             <td>{email}</td>
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

  render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
     return (
       
        <div className="container margin" >
           <h1>Here are your employees Mister Wayne</h1>
           <table id='list'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
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
