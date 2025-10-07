import { useState,useEffect,useRef} from "react";
import { Link, useNavigate } from 'react-router-dom';
import Img1 from '../../assets/Lo.png'
import Loader from '../Loader/index';
import { createUserWithEmailAndPassword, updateProfile,sendEmailVerification } from "firebase/auth";
import { auth } from "../../lib/firebaseClient";
import Swal from 'sweetalert2'


 
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

  const handleScroll = () => {
    const element = termsRef.current;
    if (element) {
      const { scrollTop, scrollHeight, clientHeight } = element;

      // Check if scrolled to bottom
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        setIsChecked(true);
        setIsDisabled(false);
      }
    }
  };

 
  useEffect(() => {
    // Simulate loading
    const timeout = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

 const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const termsRef = useRef(null);

  const openModal = () => {
    setIsModalOpen(true);
    setIsChecked(false);
    setIsDisabled(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

      await updateProfile(userCred.user, { displayName: fullName,minutes: 600, used: 0 });


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
              
                    await sendEmailVerification(userCred.user, {
  url: "https://auth.albetora.com/uploadfile", // Redirect after clicking link
  handleCodeInApp: true,
});

Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Verification email sent. Please check your inbox.",
  showConfirmButton: true,
});
    

            navigate('/uploadfile')
    } catch (err) {
Swal.fire({
  position: "top-end",
  icon: "error",
  title: err.message,
  showConfirmButton: true,
  
});
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
     checked={isChecked}
          
       
          onChange={(e) => setIsChecked(e.target.checked)}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            />
            <label for="terms" className="ml-3 text-sm text-gray-700">
              I agree to the
              <a    onClick={openModal} className="text-blue-600 underline hover:text-blue-800"
                >Terms
              and
              Privacy Policy</a>
            </label>
                            {errors.checkbox && <span style={{color:'red'}}>{errors.checkbox}</span>}
          </div>

           {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              width: "100%",
              height: "100%",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <h3 style={{fontSize:'30px',}}>Terms & Conditions</h3>
            <div
              ref={termsRef}
              onScroll={handleScroll}
              style={{
                height: "200px",
                overflowY: "auto",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
                <div class="max-w-4xl mx-auto py-12 px-6">
      <h1 class="text-4xl font-bold mb-6 text-center">
        Terms and Conditions for Albetora 
      </h1>
      <p class="mb-2 text-sm text-gray-600 text-center">
        Effective Date: August 5, 2025
      </p>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>
          By installing and using the Albetora, you agree to be bound
          by these Terms and Conditions. If you do not agree to these terms,
          please do not use the app.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-2">2. Use of the App</h2>
        <p>
          You may use the Albetora Zoom App only for its intended purpose:
          assisting with AI-powered meeting note-taking. Misuse, unauthorized
          reproduction, reverse engineering, or disruption of service is
          strictly prohibited.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-2">3. User Responsibilities</h2>
        <p>
          You are responsible for maintaining the confidentiality of your Zoom
          account and for any activity that occurs through your app integration.
          You agree to provide accurate and current information and not to use
          the app for unlawful purposes.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-2">4. Intellectual Property</h2>
        <p>
          All content, features, and functionality of the Albetora Zoom App are
          the exclusive property of Albetora Technologies. You may not copy,
          modify, or distribute any part of the app without prior written
          permission.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-2">5. Termination</h2>
        <p>
          We reserve the right to suspend or terminate access to the app at our
          discretion, without prior notice, if we believe you have violated
          these terms or are engaged in fraudulent or harmful activity.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-2">6. Disclaimer of Warranty</h2>
        <p>
          The Albetora Zoom App is provided "as is" and "as available" without
          warranties of any kind. We do not guarantee that the app will be
          error-free, secure, or operate without interruption.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-2">7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Albetora Technologies shall
          not be liable for any indirect, incidental, or consequential damages
          resulting from your use of the app.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-2">8. Changes to Terms</h2>
        <p>
          We reserve the right to update these Terms and Conditions at any time.
          Continued use of the app after any such changes constitutes your
          acceptance of the new terms.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-2">9. Governing Law</h2>
        <p>
          These Terms and Conditions are governed by the laws of India. Any
          disputes will be subject to the exclusive jurisdiction of the courts
          located in Chennai, Tamil Nadu.
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-semibold mb-2">10. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <ul class="list-none ml-0 mt-2">
          <li><strong>Company</strong>: Albetora.com</li>
          <li>
            <strong>Email</strong>:
            <a
              href="mailto:support@albetora.com"
              class="text-blue-600 underline"
              >contact@albetora.com</a
            >
          </li>
          <li>
            <strong>Website</strong>:
            <a href="https://albetora.com" class="text-blue-600 underline"
              >https://albetora.com</a >
          </li>
        </ul>
      </section>
    </div>
               <div style={{ marginTop: "15px", textAlign: "right" }}>
              <button
                onClick={closeModal}
                disabled={!isChecked}
                style={{
                  padding: "8px 15px",
                  background: isChecked ? "#28a745" : "#ccc",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: isChecked ? "pointer" : "not-allowed",
                }}
              >
                Accept
              </button>
            </div>
              
            </div>
            
          </div>
        </div>
      )}

          
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