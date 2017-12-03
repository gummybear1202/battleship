import React from "react";

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicked: false};
    this.handleClick = this.handleClick.bind(this);
  }

  // handling attributes to:
  // https://reactjs.org/docs/handling-events.html
  handleClick() {
    this.setState({clicked: true});
    console.log("clicked ", this);
  }

  // attribute to this stackoverflow answer:
  // https://stackoverflow.com/questions/33612883/loop-and-return-through-2d-array-in-react


  initGrid() {

    let x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let y = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    var rows = x.map(function (item, i){
      var entry = y.map(function (element, j) {
        return (
          <td width="10%" onClick={(e) => console.log("col" + j)} key={j} > {element} </td>
        );
      });
      return (
        <tr onClick={(e) => console.log("row" + i)} key={i}> {entry} </tr>
      );
    });

    return rows;
  }

  render() {

    return (
      <table className="table-hover table-striped table-bordered">
           <tbody>
               {this.initGrid()}
           </tbody>
       </table>

    );
  }
};
