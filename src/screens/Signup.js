import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    let [address, setAddress] = useState("");
    let navigate = useNavigate()

    // const handleClick = async (e) => {
    //     e.preventDefault();
    //     let navLocation = () => {
    //         return new Promise((res, rej) => {
    //             navigator.geolocation.getCurrentPosition(res, rej);
    //         });
    //     }
    //     let latlong = await navLocation().then(res => {
    //         let latitude = res.coords.latitude;
    //         let longitude = res.coords.longitude;
    //         return [latitude, longitude]
    //     })
    //     // console.log(latlong)
    //     let [lat, long] = latlong
    //     console.log(lat, long)
    //     const response = await fetch("http://localhost:5000/api/auth/getlocation", {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ latlong: { lat, long } })

    //     });
    //     const { location } = await response.json()
    //     console.log(location);
    //     setAddress(location);
    //     setCredentials({ ...credentials, [e.target.name]: location })
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Laodu")
        const response = await fetch("http://localhost:5000/api/createuser", {
            //credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password})

        });
           
        const json = await response.json()
    
        if (json.success) {
            //save the auth toke to local storage and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/login")

        }
        else {
            alert("Enter Valid Credentials")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/coffee-cup-with-different-bakery-white-table_23-2148039755.jpg")', backgroundSize: 'cover', height: '100vh' }}>
            <div>
                <Navbar />
            </div>
            <div className='container '>
            <div className='row'>
          <div className='col-lg-6'></div>
          <div className='col-lg-6'>
                <form className=' mt-5 rounded text-white float-right' style={{ backgroundImage: 'url("https://img.freepik.com/premium-photo/smooth-abstract-blurred-background_7189-1175.jpg")', height: '75vh', backgroundSize: 'cover', opacity: '70%' }} onSubmit={handleSubmit}>
                <div className=' pt-4 text-dark text-center'>
                    <h3 className="form-label ">Sign Up</h3>
                </div>
                <div className="p-3 pt-4 ">
                        <label htmlFor="name" className="form-label text-black">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="p-3 pt-4">
                        <label htmlFor="email" className="form-label text-black">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    
                    <div className="p-3 pt-4">
                        <label htmlFor="exampleInputPassword1" className="form-label text-black">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
                    </div>
                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                    <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
                </form>
                </div>
                </div>
                </div>

            </div>
            
            /* <div className='container' >
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="p-3 pt-4">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="p-3 pt-4">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="p-3 pt-4">
                        <label htmlFor="address" className="form-label">Address</label>
                        <fieldset>
                            <input type="text" className="form-control" name='address' placeholder='"Click below for fetching address"' value={address} onChange={(e) => setAddress(e.target.value)} aria-describedby="emailHelp" />
                        </fieldset>
                    </div>
                    <div className="p-3 pt-4">
                        <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success">Click for current Location </button>
                    </div>
                    <div className="p-3 pt-4">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
                </form>
            </div> */
        
    )
}
