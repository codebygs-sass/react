import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
 
 const QuickSetup = ({setEmail}) => {

 const [form,setForm] = useState({
    fullName:"",
    email:"",
    password:"",
    phone:"",
    country:"",
    checkbox: false
 })

 const navigate = useNavigate();

 const {fullName,email,password,phone,country,checkbox} = form;

 const serverUrl = process.env.REACT_APP_SERVER_URL;

 console.log(serverUrl);

 const handleChange = (e) => {
    const {name,value} = e.target;
    setForm({...form,[name]:value})
 } 

 const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
        "email": email,
        "password": password,
        "name": fullName,
        "phone":phone,
        "country":country
    }
    setEmail(email)
    axios.post(`${serverUrl}/signup`, formData).then((res) => {
        if(res.status == 200){     
            navigate('/business');
        }
    })

 }


    return (
        
           <section
      className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
    >
      <div
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 sm:p-10 border border-gray-200"
      >
     
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Step 1 of 3 –
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
              value={fullName}
              placeholder="John Doe"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
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
              placeholder="john@company.com"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700"
              >Password</label>
            <input
              name="password"
              type="password"
              required
onChange={(e) => handleChange(e)}
              value={password}
              minlength="6"
              placeholder="********"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum 6 characters.</p>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700"
              >Phone Number <span className="text-gray-400">(Optional)</span></label>
            <input
              name="phone"
              type="text"
              value={phone}
              pattern="^\+?[0-9\s\-]{7,15}$"
              placeholder="+1 234 567 8901"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700"
              >Company Name</label>
            <input
              name="company"
              type="text"
              required
onChange={(e) => handleChange(e)}
              placeholder="Acme Inc."
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700"
              >Country</label>
            <select
              name="country"
              required
onChange={(e) => handleChange(e)}
              value={country}
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select your country</option>
              <option selected>United States</option>
              <option>Canada</option>
              <option>United Kingdom</option>
              <option>Germany</option>
              <option>India</option>
              <option>Australia</option>
              <option>Brazil</option>
              <option>France</option>
              <option>Singapore</option>
              <option>Japan</option>
              <option>Mexico</option>
              <option>South Africa</option>
              <option>Netherlands</option>
              <option>Spain</option>
              <option>Italy</option>
            </select>
          </div>

         
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
          </div>

          
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 px-6 text-white text-lg font-semibold rounded-md bg-gradient-to-r from-blue-600 to-green-500 hover:from-green-500 hover:to-yellow-400 shadow-lg transition-all duration-300"
            >
              Continue to Step 2 →
            </button>
          </div>
        </form>
      </div>
    </section>
        
    )
}

export default QuickSetup;