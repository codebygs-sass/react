import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const BusinessInfo = (props) => {

    const {email} = props;

    const [form,setForm] = useState({
        legalName:"",
        industry:"",
        businessType:"",
        employees:"",
        address:"",
        city: "",
        state:"",
        zip:"",
        bizPhone:"",
        website:"",
        ein:"",
        currency:"",
        fiscalStart:"",
        email:email
     })
    
     const navigate = useNavigate();

      const serverUrl = process.env.REACT_APP_SERVER_URL;
    
     const {legalName,industry,businessType,employees,address,city,bizPhone,state,zip,website,fiscalStart,ein,currency} = form;
    
    
     const handleChange = (e) => {
        const {name,value} = e.target;
        setForm({...form,[name]:value})
     } 
    
     const handleSubmit = (e) => {
        e.preventDefault();
   
        axios.post(`${serverUrl}/business`, form).then((res) => {
            if(res.status == 200){  
                alert('Data updated successfully')   
                navigate('/custom');
            }
        }).catch((err) => console.log(err))
    
     }

    return (
        
<section className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
       
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Step 2 of 3 –
            <span
              className="bg-gradient-to-r from-blue-600 via-green-500 to-yellow-400 bg-clip-text text-transparent"
              >Business Info</span>
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Tell us about your business to personalize your dashboard.
          </p>
        </div>

    
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-8" >
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >Business Legal Name</label>
              <input
                type="text"
                name="legalName"
                value={legalName}
                required
onChange={(e) => handleChange(e)}
            
                placeholder="Acme Technologies LLC"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

          
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >Industry</label>
              <select
                name="industry"
                required
onChange={(e) => handleChange(e)}
value={industry}
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">Select an industry</option>
                <option>Technology</option>
                <option>E-commerce</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Education</option>
              </select>
            </div>

            
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >Business Type</label>
              <select
                name="businessType"
                required
onChange={(e) => handleChange(e)}

                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select type</option>
                <option>LLC</option>
                <option>Corporation</option>
                <option>Sole Proprietorship</option>
                <option>Partnership</option>
              </select>
            </div>

            
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >Number of Employees</label>
              <select
                name="employees"
                required
onChange={(e) => handleChange(e)}
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              >
                <option value="">Select range</option>
                <option>1–10</option>
                <option>11–50</option>
                <option>51–200</option>
                <option>500+</option>
              </select>
            </div>

           
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700"
                >Business Address</label>
              <textarea
                name="address"
                required
onChange={(e) => handleChange(e)}
value={address}
                rows="3"
                placeholder="123 Business Rd, Suite 100"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
              ></textarea>
            </div>

           
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >City</label>
              <input
                type="text"
                name="city"
                required
                value={city}
onChange={(e) => handleChange(e)}
                placeholder="New York"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>

          
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >State</label>
              <select
                name="state"
                required
onChange={(e) => handleChange(e)}
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select state</option>
                <option>NY</option>
                <option>CA</option>
                <option>TX</option>
                <option>FL</option>
              </select>
            </div>

            
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >ZIP Code</label>
              <input
                type="text"
                name="zip"
                pattern="\d{5}"
                required
                value={zip}
onChange={(e) => handleChange(e)}
                placeholder="10001"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
            </div>

           
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >Business Phone
                <span className="text-gray-400">(Optional)</span></label>
              <input
                type="text"
                name="bizPhone"
                value={bizPhone}
                placeholder="+1 234 567 8901"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >Website <span className="text-gray-400">(Optional)</span></label>
              <input
                type="text"
                name="website"
                value={website}
                placeholder="https://acme.com"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>

          
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >EIN / Tax ID
                <span className="text-gray-400">(Optional)</span></label>
              <input
                type="text"
                name="ein"
                value={ein}
                placeholder="12-3456789"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
            </div>

            
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >Preferred Currency</label>
              <select
                name="currency"
                required
onChange={(e) => handleChange(e)}
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">Select currency</option>
                <option selected>USD – US Dollar</option>
                <option>EUR – Euro</option>
                <option>GBP – British Pound</option>
                <option>INR – Indian Rupee</option>
              </select>
            </div>

          
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >Fiscal Year Start
                <span className="text-gray-400">(Optional)</span></label>
              <select
                name="fiscalStart"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              >
                <option value="">Select month</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
            </div>
          </div>
         
<div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
  
  
 

  
  <button type="submit"
    className="w-full sm:w-auto py-3 px-6 text-white text-lg font-semibold rounded-md bg-gradient-to-r from-blue-600 to-green-500 hover:from-green-500 hover:to-yellow-400 shadow-lg transition-all duration-300">
    Continue to Final Step →
  </button>
</div>
</form>
</div>

    </section>
        
    )
}

export default BusinessInfo;