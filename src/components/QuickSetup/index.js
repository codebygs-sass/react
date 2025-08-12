import { useState,useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Img1 from '../../assets/Lo.png'
import Loader from '../Loader/index';
import { createUserWithEmailAndPassword, updateProfile,sendEmailVerification } from "firebase/auth";
import { auth } from "../../lib/firebaseClient";

 
 const QuickSetup = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token') ?? '';
    if (token) {
      // Already logged in → go to dashboard
      navigate("/products");
    }
  }, []);



 const [loading, setLoading] = useState(true);

 const [form,setForm] = useState({
    fullName:"",
    email:"",
    password:"",
    phone:"",
    country:"",
    terms: false
 })

 
  useEffect(() => {
    // Simulate loading
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

 const [errors,setErrors] = useState({
      fullName:"",
    email:"",
    password:"",
    phone:"",
    country:"",
 });


 const handleBlur = (e) => {
  const {name,value} = e.target;
  if(!value){
    setErrors({...errors,[name]: 'Please fill the fields'})
  } else{
    setErrors({...errors,[name]: ''})
  }
 }


 const {fullName,email,password,phone,country,checkbox} = form;

 const serverUrl = process.env.REACT_APP_SERVER_URL;

 const handleChange = (e) => {
    const {name,value} = e.target;
    setForm({...form,[name]:value})
 } 

 const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = Object.values(errors).every(x => x === null || x === '');

    if(isEmpty){
 
    setLoading(true);
        try {
      // Create the new user
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userCred.user, { displayName: fullName });

    // // 3. Save details in Firestore
    // await setDoc(doc(db, "users", userCred.user.uid), {
    //   uid: userCred.user.uid,
    //   fullName,
    //   email,
    //   createdAt: new Date()
    // });
      
      // Get their ID token
      const token = await userCred.user.getIdToken();
      console.log("User created! Token:", token);

          sessionStorage.setItem("token", token)
            sessionStorage.setItem('firebase_user', JSON.stringify({
               uid: userCred.user.uid,
      name:fullName,
      email:email,
            }))
               console.log("Token stored in sessionStorage:", token);
              alert("Account created successfully!");
                    await sendEmailVerification(userCred.user, {
  url: "https://auth.albetora.com/products", // Redirect after clicking link
  handleCodeInApp: true,
});
      alert("Verification email sent. Please check your inbox.");

            // navigate('/products')
    } catch (err) {
      console.log(err.message)
    } finally {
      setLoading(false);
    }

    

 }
}


    return (
        
           <section
      className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
    >
         {loading && <Loader />}
      <div
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 sm:p-10 border border-gray-200"
      >
         <Link to={'/login'}
          style={{float:'right',fontSize:"smaller",padding:'5px 10px'}}
              className="w-300 py-3 px-6 text-white text-lg font-semibold rounded-md bg-gradient-to-r from-blue-600 to-green-500 hover:from-green-500 hover:to-yellow-400 shadow-lg transition-all duration-300"
            >
              Already Do you have account ?
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
              >Quick Setup</span>
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Create your workspace in less than 2 minutes.
          </p>
        </div>

       
        <form
          className="space-y-6"
          onSubmit={(e) => handleSubmit(e)}
        >  
          <div>
            <label className="block text-sm font-medium text-gray-700"
              >Full Name</label>
            <input
              name="fullName"
              type="text"
              required
       onChange={(e) => handleChange(e)}
onBlur={(e) => handleBlur(e)}
              value={fullName}
              placeholder="John Doe"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.fullName && <span style={{color:'red'}}>{errors.fullName}</span>}
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700"
              >Work Email</label>
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

          
          {/* <div>
            <label className="block text-sm font-medium text-gray-700"
              >Phone Number</label>
            <input
              name="phone"
              type="text"
              value={phone}
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleBlur(e)}
              pattern="^\+?[0-9\s\-]{7,15}$"
              placeholder="000 00 00000"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
                        {errors.phone && <span style={{color:'red'}}>{errors.phone}</span>}
          </div>

          */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700"
              >Company Name</label>
            <input
              name="company"
              type="text"
              required
onChange={(e) => handleChange(e)}
onBlur={(e) => handleBlur(e)}

              placeholder="Acme Inc."
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
                {errors.company && <span style={{color:'red'}}>{errors.company}</span>}
          </div> */}

          
          {/* <div>
            <label className="block text-sm font-medium text-gray-700"
              >Country</label>
            <select
              name="country"
              required
onChange={(e) => handleChange(e)}
onBlur={(e) => handleBlur(e)}

              value={country}
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select your country</option>
              {countries?.map((val,ind) => {
                return (
                  <option key={ind} value={val?.name}>{val?.name}</option>
                )
              })}
            </select>
                            {errors.country && <span style={{color:'red'}}>{errors.country}</span>}
          </div> */}

         
          <div className="flex items-start">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              value={checkbox}
              required
onChange={(e) => handleChange(e)}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            />
            <label for="terms" className="ml-3 text-sm text-gray-700">
              I agree to the
              <a href="#" className="text-blue-600 underline hover:text-blue-800"
                >Terms</a>
              and
              <a href="#" className="text-blue-600 underline hover:text-blue-800"
                >Privacy Policy</a>
            </label>
                            {errors.checkbox && <span style={{color:'red'}}>{errors.checkbox}</span>}
          </div>

          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 px-6 text-white text-lg font-semibold rounded-md bg-gradient-to-r from-blue-600 to-green-500 hover:from-green-500 hover:to-yellow-400 shadow-lg transition-all duration-300"
            >
              Let's start →
            </button>
          </div>
        </form>
      </div>
    </section>
        
    )
}

export default QuickSetup;