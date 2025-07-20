import React,{useState,useEffect} from "react";
import Img1 from '../../assets/Lo.png'
import { Flex } from 'antd';
import axios from "axios";
import Loader from "../Loader";

const Product = () => {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
  const [transcript, setTranscript] = useState(null);

   const serverUrl = process.env.REACT_APP_SERVER_URL;

     useEffect(() => {
       // Simulate loading
       const timeout = setTimeout(() => setLoading(false), 3000);
       return () => clearTimeout(timeout);
     }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    const res = await axios.post(`${serverUrl}/api/upload`, formData);
    if(res.status === 200){
      setLoading(false)
    }
    console.log(res.data)
    setTranscript(res.data.transcript.result.results.channels[0].alternatives[0]);
  };
    return (
        <>
         {loading && <Loader />}
         <header
      class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16"
      >
     
     
        <div class="flex items-center space-x-2">
              <img src={ Img1 }class="w-8 h-8 rounded bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow" />
          <span class="text-lg font-semibold tracking-tight text-gray-900"
            >Albetora NoteTaker</span>
        </div>

    

        <button
          id="mobile-nav-toggle"
          class="md:hidden text-gray-600 focus:outline-none"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

    
      

   
    </header>

    <div class="flex min-h-screen bg-gray-50">

      <aside
        class="hidden md:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-lg z-40"
      >
        <nav class="p-6 space-y-4 text-sm font-semibold tracking-tight">
          <a
            href="#sales"
            class="block px-4 py-3 rounded-lg bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 text-blue-800 hover:shadow transition-all duration-200"
          >
            Dashboard
          </a>
          <a
            href="#marketing"
            class="block px-4 py-3 rounded-lg bg-gradient-to-r from-blue-50 to-white hover:from-yellow-100 text-yellow-800 hover:shadow transition-all duration-200"
          >
            All Meeting
          </a>
          <a
            href="#operations"
            class="block px-4 py-3 rounded-lg bg-gradient-to-r from-blue-50 to-white hover:from-green-100 text-green-800 hover:shadow transition-all duration-200"
          >
             Settings
          </a>
         
        </nav>
      </aside>

      <nav
        class="md:hidden bg-white border-b border-gray-200 px-4 py-4 shadow-sm z-40"
      >
        <select
          id="mobile-department"
          class="w-full p-3 border rounded-md bg-white text-gray-800 font-medium focus:ring-2 focus:ring-blue-400"
        >
          <option value="#sales">Sales</option>
          <option value="#marketing">Marketing</option>
          <option value="#operations">Operations</option>
          <option value="#hr">HR</option>
          <option value="#clientsuccess">Client Success</option>
          <option value="#finance">Finance</option>
        </select>
      </nav>

  

      <main
        class="mt-4 md:ml-64 px-6 py-12 bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen space-y-20"
        style={{background:'white', width:'100%',marginLeft:'22% !important',borderRadius:'10px',boxShadow:'2px 10px 15px #cccccc'}}
      >
   <Flex gap="middle" vertical >
     <div className="row">
      <div className="col-md-12">
        <label className="block text-sm font-medium text-gray-700">File Upload</label>
           <input
        type="file"
        accept="video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
      <button onClick={handleUpload}  className="w-50 mt-4 py-3 px-6 text-white text-lg font-semibold rounded-md bg-gradient-to-r from-blue-600 to-green-500 hover:from-green-500 hover:to-yellow-400 shadow-lg transition-all duration-300" disabled={!file}>
        Upload & Transcribe
      </button>
      {transcript &&
       <> <h1 className="mt-5">Confidence Level: {transcript.confidence *100}</h1>
               <label className="block text-sm font-medium text-gray-700 mt-5">Transcript</label>
       <textarea  className="mt-1 w-full h-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none">
        {transcript.transcript}
       </textarea>
               <label className="block text-sm font-medium text-gray-700 mt-5">Summary</label>
       <textarea disabled  className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none">
        {transcript.summaries[0].summary}
       </textarea></>}
      </div>
     </div>
    
   </Flex>
       
  
      </main>
    </div>
        
        </>
    )
}

export default Product