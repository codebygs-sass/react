import React,{useState,useCallback,useEffect} from 'react';
import { useDropzone } from "react-dropzone";
import { auth } from "../../lib/firebaseClient";
import { useNavigate,NavLink } from 'react-router-dom'
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { storage } from "../../lib/firebaseClient";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaDownLong } from "react-icons/fa6";
import { updateDoc, deleteDoc,addDoc,getDocs, getDoc,setDoc,doc,getFirestore, collection } from "firebase/firestore";
import axios from 'axios';
import Loader from '../Loader/index';
import './index.css';



const UploadFile = () => {

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const db = getFirestore();
   const navigate = useNavigate();
  console.log(db);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRef, setUserRef] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [userFiles, setUserFiles] = useState([]);
  const [refreshFile,setRefreshFile] = useState(false);
  const [url,setUrl] = useState(null);
   const [loading, setLoading] = useState(false);



    useEffect(() => {
      // Listen to auth state changes
      const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          setUserId(currentUser.uid)
             const userRef = doc(db, "users", currentUser.uid);
              setUserRef(userRef);
              const docSnap = await getDoc(userRef);
              if (docSnap.exists()) {
  console.log("User document data:", docSnap.data());
} else {
  console.log("No such user document!");
}
              
              console.log(userRef);
        } else {
          setUser(null);
        }
      });
      return () => unsubscribe();
    }, []);

     useEffect(() => {
    const fetchUserFiles = async () => {
      if (!user) return;

      try {
        const filesRef = collection(db, "users", user.uid, "files");
        const snapshot = await getDocs(filesRef);

        const userFiles = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(userFiles,"filed");

        setFiles(userFiles);
      } catch (err) {
        console.error("Error fetching files:", err);
      } finally {
        setRefreshFile(false);
      }
    };

    fetchUserFiles();
  }, [user,refreshFile]);

    

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // ✅ Validate file size (max 2GB) and types
    const validFiles = acceptedFiles.filter(
     async (file) =>
        file.size <= 2 * 1024 * 1024 * 1024 && // 2GB limit
        [
          "audio/mpeg", // mp3
          "audio/wav",
          "audio/x-wav",
          "audio/mp4",
          "audio/aac",
          "audio/ogg",
          "audio/flac",
          "video/mp4",
          "video/quicktime", // mov
          "video/x-matroska", // mkv
        ].includes(file.type)
    );
    console.log(validFiles);
    uploadFiles(validFiles);

    setFiles((prev) => [...prev, ...validFiles]);
    console.log(files);

    if (rejectedFiles.length > 0) {
      alert("Some files were rejected (unsupported format or too large)");
    }
  }, []);

    const uploadFiles = async (selectedFiles) => {
      setLoading(true)  
    selectedFiles.forEach(async (file) => {
      if (!file) return alert("Please select a file");
      
      const fileRef = ref(storage, `uploads/${file.name}`);
      try {
        await uploadBytes(fileRef, file);
        const downloadUrl = await getDownloadURL(fileRef);
        setUrl(downloadUrl)
        const userId = auth.currentUser;
        const docRef = collection(db, "users", userId.uid,"files"); 
        await addDoc(docRef, {
          name: selectedFiles[0].name,
          size: selectedFiles[0].size,
          url: downloadUrl,                                     
          status: 'Queued',
          type: selectedFiles[0].type,  
          uploadedAt: new Date(),
      })
      setRefreshFile(true)
              } catch (err) {
                console.error("Upload error:", err);
                alert("❌ Upload failed");
              } finally {
                setLoading(false);
              }
    });

  
  };

  const handleFileStart = async (val,ind) => {
    console.log(val);
    setLoading(true);
    try{
        const downloadRes = await fetch(` https://us-central1-codebygs-4265d.cloudfunctions.net/downloadAndTranscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileUrl:val.url,action:'download' }),
  });
  const { fileId } = await downloadRes.json();

  // 2️⃣ Transcribe
  const transcribeRes = await fetch(` https://us-central1-codebygs-4265d.cloudfunctions.net/downloadAndTranscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileId:fileId,action:'transcribe' }),
  });
  const res = await transcribeRes.json();

    
    // const res = await axios.post(`${serverUrl}/api/upload`, {
    //   fileUrl: val.url
    // });
    // console.log(res);
    if(res){
      const userId = auth.currentUser;
      console.log(userId,res);
      const docRef = doc(db, "users", userId.uid,"files",val.id); 
      console.log(docRef);
            await updateDoc(docRef, {
              transcribe:res.transcript,
              structured: res.structured,
              finalTranscript: res.finalTranscript,
              status: 'Completed'
    });
      alert("Transcribe is completed!!");
    }
    } catch(err){
      alert(err.message);
    } finally{
      setRefreshFile(true);
      setLoading(false);
    }
  }

  const handleDeleteFile = async (val) => {
    try{
    const docRef = doc(db, "users", userId.uid, "files", val.id);
    await deleteDoc(docRef);
    alert("File is Deleted!!");
    } catch(err){
     alert(err.message)
    } finally{
      setRefreshFile(true);
    }
  }

  const handleOpenFile = (val) => {
     navigate('/transcibe', { state: { file: val } });
  }


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

    return (
        <>
        <div className="bg-gradient-to-br from-brand-50/70 via-white to-brand-100/40 text-slate-800">
  <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr]">
   <Sidebar/>
   {loading && <Loader />}
    <main className="flex flex-col min-h-screen">
  
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="px-4 lg:px-8 py-3 flex items-center gap-3">
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">Uploads</h1>
          <div className="ml-auto flex items-center gap-2 text-sm">
            {/* <a href="03-record.html" className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3 py-1.5 shadow-soft hover:bg-brand-700">New recording</a> */}
             <NavLink to={'/settings'} class="inline-flex items-center gap-2 p-1.5 rounded-full border border-slate-200 hover:bg-brand-50"><img alt="avatar" src={ user?.photoURL ?`${serverUrl}${user?.photoURL}`: `${serverUrl}/uploads/default.png`} class="h-8 w-8 rounded-full" /></NavLink>
          </div>
        </div>
      </header>

     
      <section className="flex-1 px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
       
          <div className="space-y-4">
         
            <div id="drop"  {...getRootProps()} className={`rounded-2xl border-2 border-dashed border-brand-300 bg-white/70 shadow-soft p-6 text-center ${isDragActive ? "bg-blue-100" : "bg-gray-50"}`}>
             <input {...getInputProps()} />
              <div className="mx-auto h-12 w-12 rounded-xl bg-brand-600 text-white grid place-items-center"><FaDownLong size={20} color='white' /></div>
              <h2 className="mt-3 text-lg font-semibold text-slate-900">Drag & drop audio/video</h2>
              <p className="text-slate-600 text-sm">or</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <input id="fileInput" type="file" accept="audio/*,video/*,.mp3,.wav,.m4a,.aac,.ogg,.flac,.mp4,.mov,.mkv" multiple className="hidden" />
                <button id="browseBtn" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-4 py-2 font-medium hover:bg-brand-700">Browse files</button>
                {/* <button id="sampleBtn" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-medium">Add sample items</button>  */}
              </div>
              <p className="mt-3 text-xs text-slate-500">Max file size 2 GB • Supported: MP3, WAV, M4A, AAC, OGG, FLAC, MP4, MOV, MKV</p>
            </div>

           
            <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-soft overflow-hidden">
              <div className="px-4 py-3 border-b flex items-center gap-3">
                <h3 className="font-semibold">Queue</h3>
                {/* <div className="ml-auto flex items-center gap-2 text-sm">
                  <button id="startAll" className="px-3 py-1.5 rounded-lg bg-brand-600 text-white disabled:opacity-50">Start upload</button>
                  <button id="clearDone" className="px-3 py-1.5 rounded-lg border">Clear completed</button>
                </div> */}
              </div>
              <div className="overflow-x-auto scroll-slim">
                <table className="min-w-full text-sm">
                  <thead className="bg-brand-50/60 text-slate-600">
                    <tr>
                      <th className="text-left font-medium px-4 py-3">File</th>
                      <th className="text-left font-medium px-4 py-3">Type</th>
                      <th className="text-left font-medium px-4 py-3">Size</th>
                      {/* <th className="text-left font-medium px-4 py-3">Diarization</th> */}
                      <th className="text-left font-medium px-4 py-3">Status</th>
                      <th className="text-center font-medium px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody id="tbody" className="divide-y">
                    {
                      files.length > 0 && (
                        files.map((val,ind) => {
                          return(
                            <tr key={ind}>
                              <td className='px-4 py-3'>{val.name}</td>
                              <td className='px-4 py-3'>{val.type}</td>
                              <td className='px-4 py-3'>{(val.size/1000000).toFixed(2)} MB</td>
                              <td className='px-4 py-3'>{val.status}</td>
                              <td className='px-4 py-3'>
                                <div class="inline-flex gap-2">
             {
              val.status !== 'Completed' ? (
                <>
                <button class="start px-3 py-1.5 rounded-lg border text-sm" style={{background:"#a7c957",color:'#000'}} onClick={() => handleFileStart(val,ind)}>Start</button>
             <button class="remove px-3 py-1.5 rounded-lg border text-sm" style={{background:"#d62828",color:'#fff'}} onClick={() => handleDeleteFile(val)}>Remove</button>
                </>
              ): (
                <>
                <button class="retry px-3 py-1.5 rounded-lg border text-sm" style={{backgroundColor:" rgb(37, 99, 235 )",color:'#fff'}}  onClick={() => handleOpenFile(val)}>Open</button>
                </>
              )
             } 
            </div>
                              </td>
                            </tr>
                          )
                        })
                      )
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          
          <aside className="space-y-4">
            {/* <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-soft p-4">
              <h3 className="font-semibold">Batch settings</h3>
              <div className="mt-3 space-y-3 text-sm">
                <div>
                  <label className="text-slate-600">Language</label>
                  <select id="batchLang" className="mt-1 w-full rounded-xl border border-slate-200 bg-white/80 px-3 py-2">
                    <option value="English (US)">English (US)</option>
                    <option value="English (India)" selected>English (India)</option>
                    <option value="Hindi (India)">Hindi (India)</option>
                    <option value="Tamil (India)">Tamil (India)</option>
                    <option value="Spanish (Spain)">Spanish (Spain)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Speaker diarization</span>
                  <label className="inline-flex items-center cursor-pointer select-none">
                    <input id="batchDia" type="checkbox" className="peer sr-only" checked />
                    <span className="w-11 h-6 bg-slate-200 rounded-full peer-checked:bg-brand-600 relative transition"><span className="absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full shadow transition peer-checked:translate-x-5"></span></span>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Auto-punctuation</span>
                  <label className="inline-flex items-center cursor-pointer select-none">
                    <input id="batchPunc" type="checkbox" className="peer sr-only" checked />
                    <span className="w-11 h-6 bg-slate-200 rounded-full peer-checked:bg-brand-600 relative transition"><span className="absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full shadow transition peer-checked:translate-x-5"></span></span>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Split by silence</span>
                  <label className="inline-flex items-center cursor-pointer select-none">
                    <input id="batchSplit" type="checkbox" className="peer sr-only" />
                    <span className="w-11 h-6 bg-slate-200 rounded-full peer-checked:bg-brand-600 relative transition"><span className="absolute top-0.5 left-0.5 h-5 w-5 bg-white rounded-full shadow transition peer-checked:translate-x-5"></span></span>
                  </label>
                </div>
                <button id="applyBatch" className="w-full mt-2 px-3 py-2 rounded-xl border">Apply to queue</button>
              </div>
            </div> */}

            <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-soft p-4">
              <h3 className="font-semibold">Tips</h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                <li>Better accuracy when language & accent match your audio.</li>
                <li>Enable diarization for multi-speaker meetings.</li>
                <li>Use MP3/WAV for audio and MP4/MOV for video.</li>
                <li>Large files will upload then transcribe in the background.</li>
              </ul>
              <div className="mt-3 text-xs text-slate-500">Your files are private by default. See <a href="#" className="underline">privacy</a>.</div>
            </div>
          </aside>
        </div>
      </section>
<Footer/>
    </main>
  </div>
</div>
        </>
    )
}

export default UploadFile;