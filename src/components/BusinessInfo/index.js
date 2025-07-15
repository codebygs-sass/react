import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Img1 from '../../assets/Lo.png'

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

      const [errors,setErrors] = useState({
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
 });


 const handleBlur = (e) => {
  const {name,value} = e.target;
  if(!value){
    setErrors({...errors,[name]: 'Please fill the fields'})
  } else{
    setErrors({...errors,[name]: ''})
  }
 }

    
     const navigate = useNavigate();

     const serverUrl = process.env.REACT_APP_SERVER_URL;
    
     const {legalName,industry,businessType,employees,address,city,bizPhone,state,zip,website,fiscalStart,ein,currency} = form;
    
    
     const handleChange = (e) => {
        const {name,value} = e.target;
        setForm({...form,[name]:value})
     } 
    
     const handleSubmit = (e) => {
        e.preventDefault();
            const isEmpty = Object.values(errors).every(x => x === null || x === '');

    if(isEmpty){
        axios.post(`${serverUrl}/api/business`, form).then((res) => {
            if(res.status == 200){    
                navigate('/custom');
            }
        }).catch((err) => console.log(err))
      }
    
     }

    return (
        
<section className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-10 border border-gray-200">
       
         <div style={{display:'grid',width:"100%",placeItems:'center'}}>
                 <img src={Img1} width="100" height="100" />
               </div>
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
onBlur={(e) => handleBlur(e)}
            
                placeholder="Acme Technologies LLC"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
                   {errors.legalName && <span style={{color:'red'}}>{errors.legalName}</span>}
            </div>

          
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >Industry</label>
              <select
                name="industry"
                required
 onChange={(e) => handleChange(e)}
onBlur={(e) => handleBlur(e)}
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
                                {errors.industry && <span style={{color:'red'}}>{errors.industry}</span>}
            </div>

            
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >Business Type</label>
              <select
                name="businessType"
                required
 onChange={(e) => handleChange(e)}
onBlur={(e) => handleBlur(e)}

                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select type</option>
                <option>LLC</option>
                <option>Corporation</option>
                <option>Sole Proprietorship</option>
                <option>Partnership</option>
              </select>
                              {errors.businessType && <span style={{color:'red'}}>{errors.businessType}</span>}
            </div>

            
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >Number of Employees</label>
              <select
                name="employees"
                required
 onChange={(e) => handleChange(e)}
onBlur={(e) => handleBlur(e)}
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              >
                <option value="">Select range</option>
                <option>1–10</option>
                <option>11–50</option>
                <option>51–200</option>
                <option>500+</option>
              </select>
                   {errors.employees && <span style={{color:'red'}}>{errors.employees}</span>}
            </div>

           
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700"
                >Business Address</label>
              <textarea
                name="address"
                required
 onChange={(e) => handleChange(e)}
onBlur={(e) => handleBlur(e)}
value={address}
                rows="3"
                placeholder="123 Business Rd, Suite 100"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
              ></textarea>
                      {errors.address && <span style={{color:'red'}}>{errors.address}</span>}
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
onBlur={(e) => handleBlur(e)}
                placeholder="New York"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
                {errors.city && <span style={{color:'red'}}>{errors.city}</span>}
            </div>

          
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >State</label>
              <select
                name="state"
                required
 onChange={(e) => handleChange(e)}
onBlur={(e) => handleBlur(e)}
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">Select state</option>
                <option>NY</option>
                <option>CA</option>
                <option>TX</option>
                <option>FL</option>
              </select>
                       {errors.state && <span style={{color:'red'}}>{errors.state}</span>}
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
onBlur={(e) => handleBlur(e)}
                placeholder="10001"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              />
                       {errors.zip && <span style={{color:'red'}}>{errors.zip}</span>}
            </div>

           
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >Business Phone
                </label>
              <input
                type="text"
                name="bizPhone"
                onChange={(e) => handleChange(e)}
onBlur={(e) => handleBlur(e)}
                value={bizPhone}
                placeholder="+1 234 567 8901"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
                       {errors.bizPhone && <span style={{color:'red'}}>{errors.bizPhone}</span>}
            </div>

            
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >Website </label>
              <input
                type="text"
                name="website"
                onChange={(e) => handleChange(e)}
onBlur={(e) => handleBlur(e)}
                value={website}
                placeholder="https://acme.com"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
              {errors.website && <span style={{color:'red'}}>{errors.website}</span>}
              
            </div>

          
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >EIN / Tax ID
                </label>
              <input
                type="text"
                name="ein"
                value={ein}
                onChange={(e) => handleChange(e)}
onBlur={(e) => handleBlur(e)}
                placeholder="12-3456789"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
              />
                {errors.ein && <span style={{color:'red'}}>{errors.ein}</span>}
            </div>

            
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >Preferred Currency</label>
              <select
                name="currency"
                required
 onChange={(e) => handleChange(e)}
onBlur={(e) => handleBlur(e)}
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-green-500 focus:outline-none"
              >
                <option value="">Select currency</option>
                <option selected>USD – US Dollar</option>
                <option>EUR – Euro</option>
                <option>GBP – British Pound</option>
                <option>INR – Indian Rupee</option>
              </select>
                       {errors.currency && <span style={{color:'red'}}>{errors.currency}</span>}
            </div>

          
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700"
                >Fiscal Year Start
                </label>
              <select
                name="fiscalStart"
                onChange={(e) => handleChange(e)}
onBlur={(e) => handleBlur(e)}
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
                      {errors.fiscalStart && <span style={{color:'red'}}>{errors.fiscalStart}</span>}
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