import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
const Users=()=>{
    const [users , setUsers]=useState([])
    useEffect(()=>{
       axios.get('https://my-first-project-1-0wve.onrender.com')
       .then((result)=>setUsers(result.data))
       .catch(error => console.log(error))
    },[])
    const handledelete = (id) => {
       axios.delete('https://my-first-project-1-0wve.onrender.com/deleteUser/'+id)
       .then(result => {
        console.log(result)
        window.location.reload()
       })
       .catch(error => console.log(error))
    }
    return(
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
             <div className='w-50 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success'>Add+</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Age</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                      {
                        users.map((user)=>{
                        return (<tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>
                                <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link>
                                <button className='btn btn-danger' 
                                onClick={(e) => handledelete(user._id)}>Delete</button>
                            </td>
                        </tr>)
                        })
                      }
                    </tbody>
                </table>
             </div>
        </div>
    )
}
export default Users;