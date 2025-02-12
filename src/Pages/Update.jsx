import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const url="https://mern-crud-rest-api.onrender.com"
function Update(props) {
  const[user,setUser]=useState({
    name:"",
    email:"",
    mobile:"",
    dob:"",
    address:""

  })
  const [gender ,setGender]=useState('')
  //read handler
  const readInput=(e)=>{
    const { name,value }=e.target //from targeted input read name and value 
    setUser({...user,[name]:value})// Why does this work for all inputs?The name attribute of each input matches the key in the user object`.The function dynamically updates only the field that changed. Why do we use { ...user, [name]: value }?{ ...user } makes a copy of the existing state.[name]: value updates only the specific field.This ensures that we don’t overwrite other fields.
  }//The name attribute of each input matches the key in the user object and the value attribute is updated ex:[email]:(new value present here will be updated)

  //navigate hook
  const Navigate=useNavigate();

  //to read router parameter
  const params = useParams()

  //read single user
  const readUser = async () => {
    await axios.get(`${url}/api/user/single/${params.userId}`)
    .then(res => {
      setUser(res.data.user)
      setGender(res.data.user.gender)
    })
    .catch(err => toast.error(err.response.data.msg))
  }

  useEffect(() => {
    readUser()
  },[])

  //submit handler
  const submitHandler=async (e)=>{
    e.preventDefault();
    try{
      let data={
        ...user,
        gender
      }
      await axios.patch(`${url}/api/user/update/${params.userId}`,data)
      .then(res=>{
        toast.success(res.data.msg)
        Navigate('/')
      }).catch(err=> toast.error(err.response.data.msg))
    }catch (err){
      toast.error(err.message)
    }
    }
  
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3 text-center">
            update User
          </h3>
          <p>{params.userId}</p>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <form onSubmit={submitHandler}>
                  <div className="form-group mt-2">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" name="name" id="name" className="form-control" value={user.name} onChange={readInput} required />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="email">Your Email</label>
                    <input type="email" name="email" id="email"className="form-control"  value={user.email} onChange={readInput}required />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="mobile">Your mobile</label>
                    <input type="number" name="mobile" id="mobile" className="form-control" value={user.mobile} onChange={readInput} required />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="dob">Date of Birth <span className='text-danger'>{new Date(user.dob).toLocaleString()}</span></label>
                    <input type="datetime-local" name="dob" id="dob" className="form-control" value={user.dob} onChange={readInput}  required />
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="gender">Your Gender</label>
                    <div className="form-check">
                         <input type="radio" name="gender" id="gender" value={gender} className='form-check-input' onChange={(e)=>setGender("male")} checked={gender==="male"} />
                         <label className="form-check-label">Male</label>
                      </div>
                    <div className="form-check">
                         <input type="radio" name="gender" id="gender" value={gender} className='form-check-input' onChange={(e)=>setGender("female")} checked={gender==="female"}/>
                         <label className="form-check-label">Female</label>
                      </div>
                    <div className="form-check">
                         <input type="radio" name="gender" id="gender" value={gender} className='form-check-input' onChange={(e)=>setGender("transgender")} checked={gender==="transgender"} />
                         <label className="form-check-label">Transgender</label>
                      </div>
                  </div>
                  <div className="form-group mt-2">
                    <label htmlFor="address">Your Address</label>
                    <textarea name="address" id="address" className='form-control' value={user.address} onChange={readInput} required></textarea>
                  </div>
                  <div className="form-group mt-2">
                    <input type="submit" value="update user" className='btn btn-success' />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Update