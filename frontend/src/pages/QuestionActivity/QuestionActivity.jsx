import React, { useEffect } from 'react'
import {Link, useParams} from 'react-router-dom'
import './QuestionActivity.styles.css'
import axios from "axios"
import config from "../../config"
import { connect } from 'react-redux';

const QuestionActivity = ({post}) => {

  const {id} = useParams();
  const [logs, setLogs] = React.useState([]);

  async function fetchData() {
    try {
      const res = await axios.get(config.BASE_URL + `/logs/${id}`)
      console.log("question logs", res)
      setLogs(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log("QuestionActivity");
    fetchData();
  },[id])

  return (
    <div style={{ marginLeft: "30px" }}>
      <h1>Activity for <Link to={`/questions/${id}`}>{post?.title}</Link></h1>
      <h2><b> {logs?.length} events</b></h2>
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
          {logs?.map((log, index) => {
            return (
              <tr key={index}>
                <td>{log.createdOn}</td>
                <td>{log.what}</td>
                <td>
                  <Link to={`/users/${log.createdBy?._id}`}>
                    {log.createdBy?.name}
                  </Link>
                </td>
                <td>CC BY-SA 4.0</td>
                <td>{log.comment}</td>
              </tr>
            )
          })}
  
    {/* </tr>
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
    </tr> */}
  </tbody>
</table>
    </div>
  )
}

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, null)(QuestionActivity);