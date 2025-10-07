import {useState,useEffect,useRef} from 'react';
import { auth } from "../../lib/firebaseClient";
import { NavLink, useLocation,useNavigate } from 'react-router-dom';
import { getFirestore } from "firebase/firestore";
import { FaPlay,FaPause  } from "react-icons/fa";
import Sidebar from '../Sidebar';
import Footer from '../Footer'
import './index.css';


const Transcribe = () => {

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const db = getFirestore();
  const location = useLocation();
  const navigate = useNavigate();
  const { file } = location.state || {};
  console.log(file);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

    useEffect(() => {
      // Listen to auth state changes
      const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          setUserId(currentUser.uid)
          
        } else {
          setUser(null);
        }
      });
      return () => unsubscribe();
    }, []);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const [volume, setVolume] = useState(1); // Volume range: 0.0 - 1.0

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Update progress bar
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  // Seek in the audio
  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(e.target.value);
  };

  // Format seconds to mm:ss
  const formatTime = (time) => {
    if (isNaN(time)) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    const handleLoadedMetadata = () => setDuration(audio.duration);

    if (audio) {
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 5;
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 5;
    }
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  function formatTimeSecond(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

const handleCopyText = () => {
const allText = file?.transcribe?.results?.channels[0]?.alternatives[0]?.summaries?.map((text) => text.summary).join(" ");
 navigator.clipboard.writeText(allText).then(() =>{
    alert("Transcript copied to clipboard!");
 }
).catch(err => {
    console.log(err);
})
}

  const handleCopy = () => {
    const element = document.getElementById("myText");
    if (element) {
      const text = element.innerText || element.textContent;
      navigator.clipboard.writeText(text)
        .then(() => {
          alert("Copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    }
  };


    return (
        <>
 <div class="bg-gradient-to-br from-brand-50/70 via-white to-brand-100/40 text-slate-800">
  <div class="min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr]">
   <Sidebar/>
    <main class="flex flex-col min-h-screen">
      
      <header class="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div class="px-4 lg:px-8 py-3 flex items-center gap-3">
          <div onClick={() => {
            navigate('/uploadfile')
          }} class="p-2 rounded-lg hover:bg-brand-50" title="Back">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-8 8 8 8 1.41-1.41L7.83 12l5.58-5.59L12 4z"/></svg>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <input class="w-full rounded-lg border px-3 py-2 text-sm" value={file.name} />
              <span class="px-2 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Completed</span>
              {/* <button class="px-3 py-1.5 rounded-lg border text-sm">Share</button>
              <button id="exportBtn" class="px-3 py-1.5 rounded-lg border text-sm">Export</button> */}
            </div>
          </div>
          <NavLink to={'/settings'} class="inline-flex items-center gap-2 p-1.5 rounded-full border border-slate-200 hover:bg-brand-50"><img alt="avatar" src={ user?.photoURL ?`${serverUrl}${user?.photoURL}`: `${serverUrl}/uploads/default.png`} class="h-8 w-8 rounded-full" /></NavLink>
        </div>
      </header>

      
      <section class="flex-1 px-4 lg:px-8 py-6">
        <div class="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
          
          <div class="space-y-4">
            
            <div class="rounded-2xl border border-slate-200 bg-white/80 shadow-soft p-4">
              <div class="flex flex-wrap items-center gap-3">
                <button id="play" class="inline-flex items-center justify-center h-11 w-11 rounded-full bg-brand-600 text-white shadow-soft hover:bg-brand-700" title="Play/Pause" style={{display:'grid',placeItems:'center'}} onClick={togglePlay}>
                  {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                   */}
                   {isPlaying ? <FaPause size={18} color="white" style={{textAlign:'center'}} /> : <FaPlay size={18} color='white' style={{textAlign:'center'}} />}
                </button>
                <button id="back5" class="p-2 rounded-lg border" onClick={() => handleRewind()} title="Back 5s"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11 7V3L6 8l5 5V9c2.76 0 5 2.24 5 5a5 5 0 0 1-8.66 3.54l-1.42 1.42A7 7 0 1 0 11 7z"/></svg></button>
                <button id="fwd5" class="p-2 rounded-lg border" onClick={() => handleForward()} title="Forward 5s"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13 7V3l5 5-5 5V9a5 5 0 0 0-5 5 5 5 0 0 0 8.66 3.54l1.42 1.42A7 7 0 1 1 13 7z"/></svg></button>
                <div class="ml-2 flex items-center gap-2 text-sm">
                  <label>Speed</label>
                  <select class="rounded-lg border px-2 py-1" onChange={(e) => handleSpeedChange(e)}>
                    <option>1.0×</option>
                    <option>0.75×</option>
                    <option>1.25×</option>
                    <option>1.5×</option>
                    <option>2.0×</option>
                  </select>
                </div>
                  <div class="ml-2 flex items-center gap-2 text-sm">
                     <label class="rounded-lg border px-2 py-1" htmlFor="volume">🔊 
                             <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        /></label>
                  </div>
                <div class="ml-auto text-sm text-slate-600"> {formatTime((progress / 100) * duration)} / {formatTime(duration)}</div>
              </div>
              <div class="mt-4  rounded-xl wf-bg border border-brand-100 grid  gap-2 p-2">
                    <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        style={{width:'100%'}}
      />
        <audio ref={audioRef} style={{display:'none'}} controls src={`${serverUrl}/uploads/${file.fileName}`} />

              </div>
              {/* <div class="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <label class="inline-flex items-center gap-2"><input type="checkbox" checked /> Word-timestamps</label>
                <label class="inline-flex items-center gap-2"><input type="checkbox" /> Skip silence</label>
                <label class="inline-flex items-center gap-2"><input type="checkbox" /> Loop selection</label>
              </div> */}
            </div>

            <div class="rounded-2xl border border-slate-200 bg-white/80 shadow-soft overflow-hidden">
              <div class="px-4 py-3 border-b flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <h2 class="font-semibold">Transcript</h2>
                  {/* <span class="text-xs text-slate-500">(editable)</span> */}
                </div>
                <div class="flex items-center gap-2 text-sm">
                  <button id="toggleHeat" style={{background:"#1e40af",color:'white'}} class="px-3 py-1.5 rounded-lg border">Confidence Level - {  (file?.transcribe?.results?.channels[0]?.alternatives[0]?.confidence*100).toFixed(2)}</button>
                </div>
              </div>
              <div class="grid grid-cols-1 lg:grid-cols-[220px_1fr]">
                <aside class="border-r bg-brand-50/40 p-3 space-y-2">
                  <div class="text-xs uppercase text-slate-500">Speakers</div>
                  <div class="space-y-2">
                    <div class="flex items-center gap-2"><span class="h-6 w-6 rounded-full bg-brand-400 text-white grid place-items-center text-xs"></span><input disabled style={{fontWeight:'bold'}} class="flex-1 rounded border px-2 py-1 text-sm" value={`Speaker 0`}/></div>
                  </div>

                  {/* <div class="mt-4 text-xs uppercase text-slate-500">Chapters</div>
                  <ol class="space-y-1 text-sm">
                    <li><a class="block px-2 py-1 rounded hover:bg-white" href="#ch1">1. Goals & agenda</a></li>
                    <li><a class="block px-2 py-1 rounded hover:bg-white" href="#ch2">2. Sprint scope</a></li>
                    <li><a class="block px-2 py-1 rounded hover:bg-white" href="#ch3">3. Risks & blockers</a></li>
                    <li><a class="block px-2 py-1 rounded hover:bg-white" href="#ch4">4. Next steps</a></li>
                  </ol> */}
                </aside>

          
                <div id="txBody" class="p-4 max-h-[56vh] overflow-auto scroll-slim leading-7">
                 {
                    file?.transcribe?.results?.channels[0]?.alternatives[0]?.paragraphs?.paragraphs?.map((val,ind) => {
                        return (
                    <article id="ch1" class="group" ey={ind}>
                    <div class="flex items-start gap-3">
                      <div class="mt-1 text-xs text-slate-400 w-16 shrink-0">{formatTimeSecond(val.start)}</div>
                      <div class="flex-1">
                        <div class="text-slate-500 text-xs">Speaker {val.speaker}</div>
                        <p contenteditable class="rounded px-2 hover:bg-brand-50/60 focus:bg-brand-50/60 outline-none" style={{textAlign:'justify'}}>
                       {
                        val.sentences.map(entry => entry.text).join(" ")
                       }
                        </p>
                      </div>
                    </div>
                  </article>
                        )
                    })
                 }

                 
                </div>
              </div>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-white/80 shadow-soft">
              <div class="px-4 py-3 border-b flex items-center justify-between">
                <h3 class="font-semibold">Transcript</h3>
                     <button class="px-3 py-1.5 rounded-lg border" style={{background:'rgb(30, 64, 175)',color:'white'}} onClick={() => handleCopy()}>Copy</button>
              </div>
               <div class="p-4 space-y-3 text-sm" style={{textAlign:'justify'}} id="myText">
                {
                    file?.transcribe?.results?.channels[0]?.alternatives[0]?.transcript  
                }
               </div>
                <div class="mt-3 flex gap-2 text-xs">
           
              </div>
            </div>

         
            {/* <div class="rounded-2xl border border-slate-200 bg-white/80 shadow-soft">
              <div class="px-4 py-3 border-b flex items-center justify-between">
                <h3 class="font-semibold">Comments</h3>
                <button class="px-3 py-1.5 rounded-lg border text-sm">New comment</button>
              </div>
              <div class="p-4 space-y-3 text-sm">
                <div class="flex items-start gap-3">
                  <img class="h-8 w-8 rounded-full" src="https://i.pravatar.cc/32?img=12" alt="av"/>
                  <div class="flex-1">
                    <div class="flex items-center gap-2"><span class="font-medium">Carol</span><span class="text-xs text-slate-500">at 07:45</span></div>
                    <div class="mt-1 rounded-lg border px-3 py-2 bg-white">Consider moving onboarding to next sprint.</div>
                    <div class="mt-1 text-xs text-slate-500">Reply · Resolve</div>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <img class="h-8 w-8 rounded-full" src="https://i.pravatar.cc/32?img=3" alt="av"/>
                  <div class="flex-1">
                    <div class="flex items-center gap-2"><span class="font-medium">Alice</span><span class="text-xs text-slate-500">at 18:21</span></div>
                    <div class="mt-1 rounded-lg border px-3 py-2 bg-white">Agree. Let’s keep scope tight and avoid spillover.</div>
                    <div class="mt-1 text-xs text-slate-500">Reply · Resolve</div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

       
          <aside class="space-y-4">
            <div class="rounded-2xl border border-slate-200 bg-white/80 shadow-soft p-4">
              <h3 class="font-semibold">Summary</h3>
              <ul class="mt-2 list-disc pl-5 text-sm text-slate-700">
                 {
                    file?.transcribe?.results?.channels[0]?.alternatives[0]?.summaries?.map((val,ind) => {
                        return  (
                            <>
                            <li style={{textAlign:'justify'}} key={ind}>{val.summary}</li>
                            </>
                        )
                    })
                 }
              </ul>
              <div class="mt-3 flex gap-2 text-xs">
                <button class="px-3 py-1.5 rounded-lg border" onClick={() => handleCopyText()}>Copy</button>
                {/* <button class="px-3 py-1.5 rounded-lg border">Regenerate</button> */}
              </div>
            </div>
{/* 
            <div class="rounded-2xl border border-slate-200 bg-white/80 shadow-soft p-4">
              <h3 class="font-semibold">Action items</h3>
              <ol class="mt-2 list-decimal pl-5 text-sm text-slate-700">
                <li>Bob: finalize API docs (Thu EOD).</li>
                <li>Carol: integrate analytics (Fri AM).</li>
                <li>Alice: schedule QA and device procurement.</li>
              </ol>
              <div class="mt-3 text-xs text-slate-500">Export to Trello/Asana from Integrations.</div>
            </div> */}

            {/* <div class="rounded-2xl border border-slate-200 bg-white/80 shadow-soft p-4">
              <h3 class="font-semibold">Keywords</h3>
              <div class="mt-2 flex flex-wrap gap-2 text-sm">
                <span class="px-2 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">auth</span>
                <span class="px-2 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">analytics</span>
                <span class="px-2 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">onboarding</span>
                <span class="px-2 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">QA</span>
              </div>
            </div> */}

            {/* <div class="rounded-2xl border border-slate-200 bg-white/80 shadow-soft p-4">
              <h3 class="font-semibold">Entities</h3>
              <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div class="rounded-lg border p-2"><div class="text-xs text-slate-500">People</div><div> Alice, Bob, Carol</div></div>
                <div class="rounded-lg border p-2"><div class="text-xs text-slate-500">Dates</div><div> Wed, Fri</div></div>
                <div class="rounded-lg border p-2"><div class="text-xs text-slate-500">Orgs</div><div> Web Team</div></div>
                <div class="rounded-lg border p-2"><div class="text-xs text-slate-500">Topics</div><div> Goals, Risks</div></div>
              </div>
            </div> */}
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

export default Transcribe;