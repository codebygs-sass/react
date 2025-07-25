import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Img1 from '../../assets/Lo.png'
import { useAuth } from "../../auth/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebaseClient";

 
 const Login = () => {

 const [form,setForm] = useState({
    email:"",
    password:"",
 })

 

 const [errors,setErrors] = useState({
    email:"",
    password:"",
 });


  const { login } = useAuth();


 const handleBlur = (e) => {
  const {name,value} = e.target;
  if(!value){
    setErrors({...errors,[name]: 'Please fill the fields'})
  } else{
    setErrors({...errors,[name]: ''})
  }
 }

 const navigate = useNavigate();

 const {email,password} = form;

 const serverUrl = process.env.REACT_APP_SERVER_URL;

 const handleChange = (e) => {
    const {name,value} = e.target;
    setForm({...form,[name]:value})
 } 

 const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = Object.values(errors).every(x => x === null || x === '');

    if(isEmpty){
    const formData = {
        "email": email,
        "password": password,
    }
    try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken();

    axios.post(`${serverUrl}/api/login`, { idToken: token }).then((res) => {
        if(res.status == 200){     
            window.location.href = process.env.REACT_APP_EXTERNAL_URL_PRODUCTS;
        }
    })
  }catch(err) {
     alert("Login failed: " + err.message);
  }
  }
 }


    return (
        
           <section
      className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
    >
      <div
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 sm:p-10 border border-gray-200"
      >
        <Link to={'/signup'}
          style={{float:'right',fontSize:"smaller",padding:'5px 10px'}}
              className="w-300 py-3 px-6 text-white text-lg font-semibold rounded-md bg-gradient-to-r from-blue-600 to-green-500 hover:from-green-500 hover:to-yellow-400 shadow-lg transition-all duration-300"
            >
              Create an account ?
            </Link>
  <a href="https://www.albetora.com/">
          <div style={{display:'grid',width:"100%",placeItems:'center'}}>
                 <img src={Img1} width="100" height="100" />
               </div>
               </a>
        
     
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">

            <span
              className="bg-gradient-to-r from-blue-600 via-green-500 to-yellow-400 bg-clip-text text-transparent"
              >Login to Albetora</span>
          </h2>
        </div>

       
        <form
          
          className="space-y-6"
          onSubmit={(e) => handleSubmit(e)}
        >
         
          <div>
            <label className="block text-sm font-medium text-gray-700"
              >Email</label>
            <input
              name="email"
              type="email"
              value={email}
              required
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
              placeholder="john@company.com"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            {errors.email && <span style={{color:'red'}}>{errors.email}</span>}
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700"
              >Password</label>
            <input
              name="password"
              type="password"
              required
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
              value={password}
              minlength="6"
              placeholder="********"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
            {errors.password && <span style={{color:'red'}}>{errors.password}</span>}
          </div>
  
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 px-6 text-white text-lg font-semibold rounded-md bg-gradient-to-r from-blue-600 to-green-500 hover:from-green-500 hover:to-yellow-400 shadow-lg transition-all duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
        
    )
}

export default Login;