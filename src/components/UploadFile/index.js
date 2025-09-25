import React,{useState,useCallback,useEffect} from 'react';
import { useDropzone } from "react-dropzone";
import { auth } from "../../lib/firebaseClient";
import './index.css';
import { updateDoc, arrayUnion,addDoc, getDoc,setDoc,doc,getFirestore, collection } from "firebase/firestore";
import './index.css'


const UploadFile = () => {

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const db = getFirestore();
  console.log(db);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRef, setUserRef] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [userFiles, setUserFiles] = useState([]);



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
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setUploading(true);
      const res = await fetch(`${serverUrl}/api/uploadfile`, {
        method: "POST",
        body: formData,
      });


      const data = await res.json();

      if(data.fileName){
      
      const userId = auth.currentUser;
      console.log(userId);
      const docRef = collection(db, "users", userId.uid,"files"); 
      
        await addDoc(docRef, {
      
          name: data.fileName,
          size: data.size,
          status: 'Queued',
          mimeType: data.mimeType,  
          duration: data.duration,
          uploadedAt: new Date(),
      
      });

      console.log("✅ File uploaded & saved:", data.fileName);
    }
      console.log("✅ Upload response:", data);
      alert("File uploaded successfully!");
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("File upload failed!");
    } finally {
      setUploading(false);
    }
  };


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

    return (
        <>
        <div className="bg-gradient-to-br from-brand-50/70 via-white to-brand-100/40 text-slate-800">
  <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr]">
   
    <aside className="bg-white/80 backdrop-blur sticky top-0 h-full lg:h-screen border-r border-slate-200 shadow-soft hidden lg:flex flex-col">
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <div className="h-10 w-10 grid place-items-center rounded-xl bg-brand-600 text-white font-bold">VN</div>
        <div>
          <div className="text-sm uppercase tracking-wider text-brand-700 font-semibold">Voice Notes AI</div>
          <div className="text-xs text-slate-500">Otter-like Transcription</div>
        </div>
      </div>
      <nav className="mt-4 flex-1 overflow-y-auto scroll-slim">
        <ul className="px-3 space-y-1 text-sm">
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="02-dashboard.html">Dashboard</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="03-record.html">Record</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="04-transcript.html">Transcript</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="05-search.html">Search</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-brand-50 text-brand-700 font-medium" href="06-uploads.html">Uploads</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="07-settings.html">Settings</a></li>
          <li className="pt-2"><div className="px-3 text-xs uppercase tracking-wide text-slate-400">More</div></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="08-billing.html">Billing</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="09-team.html">Team</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="10-calendar.html">Calendar</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="11-integrations.html">Integrations</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="12-bot.html">Meeting Bot</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="13-analytics.html">Analytics</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="14-admin.html">Admin</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="15-help.html">Help</a></li>
          <li className="pt-2"><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="01-auth.html">Sign in / out</a></li>
        </ul>
      </nav>
      <div className="p-4 mt-auto">
        <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white p-4">
          <div className="text-sm opacity-90">Minutes used</div>
          <div className="mt-1 flex items-end gap-2"><div className="text-2xl font-semibold">382</div><div className="text-xs opacity-80">/ 600</div></div>
          <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden"><div className="h-full w-[64%] bg-white/90"></div></div>
          <a href="08-billing.html" className="mt-3 inline-flex items-center gap-2 text-xs font-medium underline">Upgrade plan →</a>
        </div>
      </div>
    </aside>

   
    <main className="flex flex-col min-h-screen">
  
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="px-4 lg:px-8 py-3 flex items-center gap-3">
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">Uploads</h1>
          <div className="ml-auto flex items-center gap-2 text-sm">
            <a href="03-record.html" className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3 py-1.5 shadow-soft hover:bg-brand-700">New recording</a>
            <a href="07-settings.html" className="inline-flex items-center gap-2 p-1.5 rounded-full border border-slate-200 hover:bg-brand-50"><img alt="avatar" src="https://i.pravatar.cc/40?img=5" className="h-8 w-8 rounded-full" /></a>
          </div>
        </div>
      </header>

     
      <section className="flex-1 px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
       
          <div className="space-y-4">
         
            <div id="drop"  {...getRootProps()} className={`rounded-2xl border-2 border-dashed border-brand-300 bg-white/70 shadow-soft p-6 text-center ${isDragActive ? "bg-blue-100" : "bg-gray-50"}`}>
             <input {...getInputProps()} />
              <div className="mx-auto h-12 w-12 rounded-xl bg-brand-600 text-white grid place-items-center">⬆️</div>
              <h2 className="mt-3 text-lg font-semibold text-slate-900">Drag & drop audio/video</h2>
              <p className="text-slate-600 text-sm">or</p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <input id="fileInput" type="file" accept="audio/*,video/*,.mp3,.wav,.m4a,.aac,.ogg,.flac,.mp4,.mov,.mkv" multiple className="hidden" />
                <button id="browseBtn" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-4 py-2 font-medium hover:bg-brand-700">Browse files</button>
                <button id="sampleBtn" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-medium">Add sample items</button>
              </div>
              <p className="mt-3 text-xs text-slate-500">Max file size 2 GB • Supported: MP3, WAV, M4A, AAC, OGG, FLAC, MP4, MOV, MKV</p>
            </div>

           
            <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-soft overflow-hidden">
              <div className="px-4 py-3 border-b flex items-center gap-3">
                <h3 className="font-semibold">Queue</h3>
                <div className="ml-auto flex items-center gap-2 text-sm">
                  <button id="startAll" className="px-3 py-1.5 rounded-lg bg-brand-600 text-white disabled:opacity-50">Start upload</button>
                  <button id="clearDone" className="px-3 py-1.5 rounded-lg border">Clear completed</button>
                </div>
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
                              <td className='px-4 py-3'>Queued</td>
                              <td className='px-4 py-3'>
                                <div class="inline-flex gap-2">
              <button class="start px-3 py-1.5 rounded-lg border text-sm">Start</button>
              <button class="retry px-3 py-1.5 rounded-lg border text-sm hidden">Retry</button>
              <button class="remove px-3 py-1.5 rounded-lg border text-sm">Remove</button>
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
            <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-soft p-4">
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
            </div>

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

      <footer className="px-4 lg:px-8 py-6 text-xs text-slate-500">
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div>© 2025 Voice Notes AI</div>
          <div className="flex items-center gap-3">
            <a href="15-help.html" className="hover:underline">Help</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  </div>
</div>
        </>
    )
}

export default UploadFile;