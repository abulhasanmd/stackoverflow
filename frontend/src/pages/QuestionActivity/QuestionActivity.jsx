import React from 'react'
import {Link} from 'react-router-dom'
import './QuestionActivity.styles.css'

const QuestionActivity = () => {
  return (
    <div style={{ marginLeft: "30px" }}>
      <h1>Activity for <Link to={`/questions/:id`}> </Link></h1>
      <h2><b> 6 events</b></h2>
          <table className="table table-bordered table-striped table-sm">
  <thead>
    <tr>
      <th style={{textAlign: "center"}}> <b>when</b> </th>
      <th style={{textAlign: "center"}}> <b>what</b> </th>
      <th style={{textAlign: "center"}}> <b>by</b> </th>
      <th style={{textAlign: "center"}}> <b>license</b> </th>
      <th style={{textAlign: "center"}}> <b>comment</b> </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>May 5 at 6:20</td>
      <td>answer</td>
      <td>
        <Link to={`/user/userId`}>
              Krishna
        </Link>
        </td>
        <td>CC BY-SA 4.0</td>
        <td>Draw attention</td>
    </tr>
    <tr>
      <td>May 5 at 6:20</td>
      <td>answer</td>
      <td>
        <Link to={`/user/userId`}>
              Akhil
        </Link>
        </td>
        <td>CC BY-SA 4.0</td>
        <td>Draw attention</td>
    </tr>
  </tbody>
</table>
    </div>
  )
}

export default QuestionActivity