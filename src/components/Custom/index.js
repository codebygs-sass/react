import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CustomPage = (props) => {

    const {email} = props;

    const navigate = useNavigate();

    const [form,setForm] = useState({
        timezone:"",
        language:"",
        dataRegion:"",
        email:email    
    })

     const serverUrl = process.env.REACT_APP_SERVER_URL;

      const handleChange = (e) => {
    const {name,value} = e.target;
    setForm({...form,[name]:value})
 } 

    const handleSubmit  = (e) => {
           e.preventDefault();
               axios.post(`${serverUrl}/custom`, form).then((res) => {
        if(res.status == 200){     
        window.location.href = process.env.REACT_APP_EXTERNAL_URL_PRODUCTS
        }
    })

    }
    
    return (
<section className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 sm:p-10 border border-gray-200"
      >
       
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Step 3 of 3 –
            <span
              className="bg-gradient-to-r from-blue-600 via-green-500 to-yellow-400 bg-clip-text text-transparent"
              >Customization</span>
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Tailor your Albetora experience (you can always change this later).
          </p>
        </div>

       
        <form
       onSubmit={(e) => handleSubmit(e)}
        >
        
          <div>
            <label className="block text-sm font-medium text-gray-700"
              >Timezone</label>
            <select
              name="timezone"
              required
onChange={(e) => handleChange(e)}
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select your timezone</option>
              <option selected>EST – Eastern Time</option>
              <option>PST – Pacific Time</option>
              <option>CST – Central Time</option>
              <option>GMT – Greenwich Mean Time</option>
              <option>IST – India Standard Time</option>
              <option>AEST – Australian Eastern Time</option>
            </select>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700"
              >Preferred Language
              <span className="text-gray-400">(Optional)</span></label>
            <select
              name="language"
              onChange={(e) => handleChange(e)}
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-green-400 focus:outline-none"
            >
              <option selected>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
              <option>Hindi</option>
              <option>Portuguese</option>
            </select>
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700"
              >Data Storage Region
              <span className="text-gray-400">(Optional)</span></label>
            <select
              name="dataRegion"
              onChange={(e) => handleChange(e)}
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            >
              <option value="">Choose region</option>
              <option selected>US – United States</option>
              <option>EU – Europe</option>
              <option>APAC – Asia-Pacific</option>
            </select>
          </div>

          
          <div
            className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
          >
          
       

            
            <button
              type="submit"
              className="w-full sm:w-auto py-3 px-6 text-white text-lg font-semibold rounded-md bg-gradient-to-r from-blue-600 to-green-500 hover:from-green-500 hover:to-yellow-400 shadow-lg transition-all duration-300"
            >
              Finish Setup →
            </button>
          </div>
        </form>
      </div>
    </section>
    )

}

export default CustomPage;