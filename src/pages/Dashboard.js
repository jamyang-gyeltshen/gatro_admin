import React, {useState, useEffect} from 'react'
import fireDb from '../firebase';
import { Link } from 'react-router-dom';
import './Dashboard.css'
import { toast } from 'react-toastify';


const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect (()=> {
    fireDb.child("users").on("value", (snapshot) => {
      if (snapshot.val() !== null){
        setData({...snapshot.val() });
      }
      else {
        setData({});
      }
    });

    return () => {
      setData({});
    }; 
  },[]);

  const onDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this user ?")) {
          fireDb.child(`users/${id}`).remove((err) => {
            if(err) {
              toast.error(err)
            }
            else {
              toast.success("User deleted successfully.")
            }
          })
      }
  }

  return (
   <div style={{marginTop: "80px",}}
   className="container" >
     <table className='styled-table'>
          <thead>
            <tr>
              <th style={{textAlign: "center"}}>No.</th>
              <th style={{textAlign: "center"}}>Name</th>
              <th style={{textAlign: "center"}}>Email</th>
              <th style={{textAlign: "center"}}>Contact</th>
              <th style={{textAlign: "center"}}>Password</th>
              <th style={{textAlign: "center"}}>Action</th>
            </tr>
          </thead>
          <tbody>
              {Object.keys(data).map((id, index) => {
                return (
                  <tr key={id}>
                      <th scope='row'>{index + 1}</th>
                      <td>{data[id].name}</td>
                      <td>{data[id].email}</td>
                      <td>{data[id].phone}</td>
                      <td>{data[id].password}</td>
                      <td>
                          <Link to={`/update/${id}`}>
                          <button className='btn btn-edit'>Edit</button>
                          </Link>
                          <button className='btn btn-delete' onClick={()=> onDelete(id)}>Delete</button>
                          <Link to={`/view/${id}`}>
                          <button className='btn btn-view'>View</button>
                          </Link>
                      </td>
                  </tr>
                );
              })}
          </tbody>   
     </table>
   </div>
  )
}

export default Dashboard
