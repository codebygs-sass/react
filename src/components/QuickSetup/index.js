import { useState,useEffect,useRef,useMemo} from "react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile,sendEmailVerification,signInWithEmailAndPassword,sendPasswordResetEmail  } from "firebase/auth";
import { auth,db } from "../../lib/firebaseClient";
import Swal from 'sweetalert2'
import {addDoc,collection} from 'firebase/firestore'
import { notification } from 'antd';
import './index.css';



 
 const QuickSetup = () => {

  const navigate = useNavigate();
  const Context = React.createContext({ name: 'Default' });
   const [api, contextHolder] = notification.useNotification();


     const openNotification = (message,description,type) => {
    api[type]({
      message: `${message}`,
      description: <Context.Consumer>{() => `${description}`}</Context.Consumer>,
      placement:'topRight',
    });
  };

   const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);
 


const [show,setShow] = useState(false);

 const [loading, setLoading] = useState(true);
 const [signActive,setSignActive] = useState(false);

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

      await updateProfile(userCred.user, { displayName: fullName });

      console.log(userCred.user)




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

openNotification('SignUp Completed!','Verification email sent. Please check your inbox.','success')


    
        // const docRef = collection(db, "usedMinutes", userCred.user.uid,); 
        //       await addDoc(docRef, {
        //         usedMinutes: 0,
        //         minutesRemaining: null,
        //         updatedAt: new Date(),
        //     })
      

            navigate('/dashboard')
    } catch (err) {

      openNotification('SignUp Failed!',err.message,'error')

      console.log(err.message)
    } finally {
      setLoading(false);
    }
 }
}


 const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    const isEmpty = Object.values(errors).every(x => x === null || x === '');
    setLoading(true);
    if(isEmpty){
    const formData = {
        "email": email,
        "password ": password,
    }
    try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCred.user.getIdToken();
      navigate('/dashboard')
  }catch(err) {
     alert("Login failed: " + err.message);
     Swal.fire({
       position: "top-end",
       icon: "error",
       title: err.message,
       showConfirmButton: true,
       
     });
  }
  setLoading(false)
  }
 }


 const handleForgotPassword = async () => {
    try {
      if(!email){
        alert('Email is required.')
        return false;
      }
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin + "/login", // Redirect after reset
        handleCodeInApp: false,
      });
      alert("Password reset email sent! Please check your inbox.");
    } catch (error) {
      alert(`${error.message}`);
    }
 }

    return (
<>
  {contextHolder}
      <div class="bg-gradient-to-br from-brand-50/70 via-white to-brand-100/40 text-slate-800">
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_520px]">
    
    <aside class="hidden lg:flex flex-col border-r border-slate-200 bg-white/70 backdrop-blur">
      <header class="h-16 px-6 flex items-center gap-3">
        <a href="index.html" class="flex items-center gap-3">
          <span class="h-9 w-9 grid place-items-center rounded-xl bg-brand-600 text-white font-bold">A</span>
          <span class="text-slate-900 font-semibold">Albetora NoteTaker</span>
        </a>
      </header>
      <div class="p-8 flex-1 grid content-center gap-6">
        <div class="max-w-lg">
          <h1 class="text-3xl font-bold text-slate-900">Welcome back</h1>
          <p class="mt-2 text-slate-600">Transcribe and summarize every meeting. Sign in to continue or create your account in seconds.</p>
        </div>
        <div class="rounded-2xl border bg-white shadow-soft overflow-hidden">
          <div class="p-3 bg-brand-50/60 border-b text-sm text-brand-800">Product preview</div>
          <div class="p-4 grid grid-cols-1 gap-3 text-sm">
            <div class="rounded-xl border p-3">
              <div class="text-slate-500">AI Summary</div>
              <ul class="mt-1 list-disc pl-5 space-y-1">
                <li>Key decisions with owners</li>
                <li>Action items pushed to Slack</li>
                <li>Risks flagged for review</li>
              </ul>
            </div>
            {/* <div class="rounded-xl border p-3">
              <div class="text-slate-500">Upcoming</div>
              <div class="mt-1">Release Demo · Wed 11:30 IST</div>
            </div> */}
          </div>
          {/* <div class="p-3 border-t flex items-center gap-2">
            <a class="px-3 py-1.5 rounded-lg border" href="02-dashboard.html">Open dashboard</a>
            <a class="px-3 py-1.5 rounded-lg border" href="12-bot.html">Meeting bot</a>
          </div> */}
        </div>
      </div>
      <footer class="p-6 text-xs text-slate-500">© 2025 Albetora NoteTaker</footer>
    </aside>

  
    <main class="min-h-screen bg-white/70 backdrop-blur grid">
      <div class="mx-auto w-full max-w-md p-6 lg:p-10 my-auto">
        <div class="text-center">
          <a href="index.html" class="lg:hidden inline-flex items-center gap-2 mb-4"><span class="h-9 w-9 grid place-items-center rounded-xl bg-brand-600 text-white font-bold">VN</span><span class="font-semibold">Voice Notes AI</span></a>
          <div class="inline-flex rounded-xl border bg-white p-1">
            <button id="tabSignIn" onClick={() => setSignActive(false)} class="px-4 py-2 rounded-lg text-sm bg-brand-50 text-brand-700" style={{background: signActive ?  'transparent': 'rgb(29 78 216)', color: signActive ? '#000': '#fff'}}>Sign in</button>
            <button id="tabSignUp" onClick={() => setSignActive(true)} style={{background: signActive ?  'rgb(29 78 216)': 'transparent',color: signActive ? '#fff':'#000'}}  class="px-4 py-2 rounded-lg text-sm">Create account</button>
          </div>
        </div>

       
       {
        !signActive && (
        <form id="formSignIn" class="mt-6 grid gap-3 text-sm"   onSubmit={(e) => handleSubmitSignIn(e)}>
          <label class="block"><span class="text-slate-600">Email</span><input id="siEmail" type="email" required class="mt-1 w-full rounded-lg border px-3 py-2" placeholder="you@company.com"   name="email"
              value={email}
                onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)} /></label>
                {errors.email && <span style={{color:'red'}}>{errors.email}</span>}
          <label class="block"><span class="text-slate-600">Password</span>
            <div class="mt-1 relative">
              <input id="siPass" type={show ? "text": "password"} required class="w-full rounded-lg border px-3 py-2 pr-10" placeholder="••••••••" name="password"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
              value={password}/>
              <button type="button" id="siToggle" class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" onClick={() => setShow(pre => !pre)}>👁️</button>
            </div>
          </label>
          {errors.password && <span style={{color:'red'}}>{errors.password}</span>}
          <div class="flex items-center justify-between">
            {/* <label class="inline-flex items-center gap-2"><input id="siRemember" type="checkbox" checked/> Remember me</label> */}
            <button type="button" id="forgotOpen" class="underline" onClick={() => handleForgotPassword()}>Forgot password?</button>
          </div>
          <button class="mt-1 px-4 py-2 rounded-xl bg-brand-600 text-white">Sign in</button>
          {/* <div class="grid grid-cols-3 items-center gap-2">
            <hr class="border-slate-200"/><div class="text-center text-xs text-slate-500">or</div><hr class="border-slate-200"/>
          </div> */}
          {/* <div class="grid grid-cols-1 gap-2">
            <button type="button" class="px-4 py-2 rounded-xl border flex items-center justify-center gap-2">🔑 Continue with SSO</button>
            <button type="button" class="px-4 py-2 rounded-xl border flex items-center justify-center gap-2">G Continue with Google</button>
            <button type="button" class="px-4 py-2 rounded-xl border flex items-center justify-center gap-2">M Continue with Microsoft</button>
          </div>
          <div class="text-xs text-slate-500 text-center">New to Voice Notes AI? <a id="toSignup" class="underline cursor-pointer">Create an account</a></div> */}
        </form>)}

        {
          signActive && (
            <>

      
        <form id="formSignUp" class="mt-6 grid gap-3 text-sm"   onSubmit={(e) => handleSubmit(e)} >
          <label class="block"><span class="text-slate-600">Full Name</span><input id="suWS" class="mt-1 w-full rounded-lg border px-3 py-2" placeholder="Full Name"            name="fullName"
              type="text"
              required
       onChange={(e) => handleChange(e)}
onBlur={(e) => handleBlur(e)}
              value={fullName}
              /></label>
            {errors.fullName && <span style={{color:'red'}}>{errors.fullName}</span>}
          <label class="block"><span class="text-slate-600">Work email</span><input id="suEmail" type="email" required class="mt-1 w-full rounded-lg border px-3 py-2" placeholder="you@company.com"  name="email"   onChange={(e) => handleChange(e)}
                onBlur={(e) => handleBlur(e)}
              value={email}/></label>
               {errors.email && <span style={{color:'red'}}>{errors.email}</span>}  
          <label class="block"><span class="text-slate-600">Password</span>
            <div class="mt-1 relative">
              <input id="suPass" type={show ? "text": "password"}  required class="w-full rounded-lg border px-3 py-2 pr-10" placeholder="8+ characters"             name="password"
              
onChange={(e) => handleChange(e)}
onBlur={(e) => handleBlur(e)}
              value={password}/>
              <button type="button" id="suToggle" class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" onClick={() => setShow(pre =>!pre) }>👁️</button>
            </div>
             {errors.password && <span style={{color:'red'}}>{errors.password}</span>}
            {/* <div id="strength" class="mt-1 h-1 rounded bg-slate-200 overflow-hidden"><div class="h-full w-1/5 bg-rose-500" id="strengthBar"></div></div>
            <div id="strengthMsg" class="text-xs text-slate-500 mt-1">Weak</div> */}
          </label>
          
          <label class="flex items-center gap-2 text-xs text-slate-600"><input id="suAgree" type="checkbox" required   checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)} /> I agree to the <a href="#" class="underline" >Terms</a> & <a href="#" class="underline">Privacy</a></label>
          <button class="mt-1 px-4 py-2 rounded-xl bg-brand-600 text-white">Create account</button>
    
         
        </form>      </>
          )
        }

       
        {/* <div class="mt-8 text-xs text-slate-500 text-center">
          Protected by reCAPTCHA. <a href="#" class="underline">Privacy</a> · <a href="#" class="underline">Terms</a>
        </div> */}
      </div>
    </main>
  </div>


  <div id="forgotModal" class="hidden fixed inset-0 z-20 grid place-items-center bg-black/30 p-4">
    <div class="modal-enter w-full max-w-md rounded-2xl bg-white shadow-soft border p-4">
      <div class="flex items-center justify-between"><h3 class="font-semibold">Reset password</h3><button id="fgClose" class="p-2 rounded-lg hover:bg-slate-100">✕</button></div>
      <div class="mt-3 text-sm space-y-3">
        <label class="block"><span class="text-slate-600">Email</span><input id="fgEmail" type="email" class="mt-1 w-full rounded-lg border px-3 py-2" placeholder="you@company.com"/></label>
      </div>
      <div class="mt-4 flex items-center gap-2"><button id="fgSend" class="px-4 py-2 rounded-xl bg-brand-600 text-white">Send reset link</button><button id="fgCancel" class="px-4 py-2 rounded-xl border">Cancel</button></div>
    </div>
  </div>

  <div id="magicModal" class="hidden fixed inset-0 z-20 grid place-items-center bg-black/30 p-4">
    <div class="modal-enter w-full max-w-md rounded-2xl bg-white shadow-soft border p-4">
      <div class="flex items-center justify-between"><h3 class="font-semibold">Magic link</h3><button id="mlClose" class="p-2 rounded-lg hover:bg-slate-100">✕</button></div>
      <div class="mt-3 text-sm space-y-3">
        <label class="block"><span class="text-slate-600">Email</span><input id="mlEmail" type="email" class="mt-1 w-full rounded-lg border px-3 py-2" placeholder="you@company.com" /></label>
      </div>
      <div class="mt-4 flex items-center gap-2"><button id="mlSend" class="px-4 py-2 rounded-xl bg-brand-600 text-white">Send link</button><button id="mlCancel" class="px-4 py-2 rounded-xl border">Cancel</button></div>
    </div>
  </div>

  <div id="otpModal" class="hidden fixed inset-0 z-20 grid place-items-center bg-black/30 p-4">
    <div class="modal-enter w-full max-w-md rounded-2xl bg-white shadow-soft border p-4">
      <div class="flex items-center justify-between"><h3 class="font-semibold">Two‑factor code</h3><button id="otpClose" class="p-2 rounded-lg hover:bg-slate-100">✕</button></div>
      <div class="mt-3 text-sm space-y-3">
        <div class="text-slate-600">Enter the 6‑digit code from your authenticator app</div>
        <div class="flex items-center justify-between gap-2"> 
          <input maxlength="1" class="otp h-12 w-12 text-center rounded-lg border"/>
          <input maxlength="1" class="otp h-12 w-12 text-center rounded-lg border"/>
          <input maxlength="1" class="otp h-12 w-12 text-center rounded-lg border"/>
          <input maxlength="1" class="otp h-12 w-12 text-center rounded-lg border"/>
          <input maxlength="1" class="otp h-12 w-12 text-center rounded-lg border"/>
          <input maxlength="1" class="otp h-12 w-12 text-center rounded-lg border"/>
        </div>
      </div>
      <div class="mt-4 flex items-center gap-2"><button id="otpVerify" class="px-4 py-2 rounded-xl bg-brand-600 text-white">Verify</button><button id="otpCancel" class="px-4 py-2 rounded-xl border">Cancel</button></div>
    </div>
  </div>
  
</div>
</>
        
  
        
    )
}

export default QuickSetup;