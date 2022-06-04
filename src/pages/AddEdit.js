import React, {useEffect, useState,} from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import './AddEdit.css';
import fireDb from '../firebase';
import {toast} from 'react-toastify';



const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const [data, setData] = useState({});

    const {name, email, phone, password} = state;

    const navigate = useNavigate();

    const {id} = useParams();

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
      },[id]);

      useEffect(() => {
        if (id) {
           setState({...data[id]}) 
        }
        else {
            setState({...initialState})
        }

        return () => {
            setState({...initialState})
        }
      },[id, data])

    const handleInputChange = (event) => {
        const {name,value} = event.target;
        setState({...state, [name]: value})
    };

    const handleSubmit = (e)=> {
        e.preventDefault();
        if (!name || !email || !phone || !password) {
            toast.error("The input fields cannot be empty")
        }
        else {
            if(!id) {
                fireDb.child("users").push(state, (err) => {
                    if (err) {
                        toast.error(err);
                    }
                    else {
                        toast.success("User added sucessfully");
                    }
                });
            }
            else {
                fireDb.child(`users/${id}`).set(state, (err) => {
                    if (err) {
                        toast.error(err);
                    }
                    else {
                        toast.success("User updated sucessfully");
                    }
                });

            }
            
            setTimeout(() => navigate.push ("/"),300);
            navigate("/")  
        }

    };
  return (
    <div className="Container">
        <form
            className="form"
            onSubmit={handleSubmit}
            >
            <label htmlFor='name'>Name</label>
            <input
            type="text"
            id="name"
            name="name"
            placeholder= "Your Name..."
            value={name || ""}
            onChange={handleInputChange}
            />

            <label htmlFor='email'>Email</label>
            <input
            type="email"
            id="email"
            name="email"
            placeholder= "Your Eamil..."
            value={email || ""}
            onChange={handleInputChange}
            />
            <label htmlFor='phone'>Phone</label>
            <input
            type="number"
            id="phone"
            name="phone"
            placeholder= "Your 8 digits phone No..."
            value={phone || ""}
            onChange={handleInputChange}
            />
            <label htmlFor='password'>Password</label>
            <input
            type="password"
            id="password"
            name="password"
            placeholder= "Password..."
            value={password || ""}
            onChange={handleInputChange}
            />
            <input
            type="Submit"
            value={id ? "Update" : "Save"}
            
            />
        </form>
    </div>
   
  )
}

export default AddEdit