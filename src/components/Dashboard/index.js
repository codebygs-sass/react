import React,{useState,useEffect} from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Image from '../../assets/us.png'
import './index.css';
import { collection,getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebaseClient';
import { NavLink, useNavigate } from 'react-router-dom';
import Loader from '../Loader';






const Dashboard = () => {

    const [user,setUser] = useState([]);
    const navigate = useNavigate();
      const [files, setFiles] = useState([]);
       const [usedMinutesData,setUsedMinutesData] = useState([]);
       const [loading, setLoading] = useState(false);

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
            } 
          };
      
          fetchUserFiles();
        }, []);

          const handleOpenFile = (val) => {
                navigate('/transcibe', { state: { file: val } });
            }

    return(
        <>
<div className="bg-gradient-to-br from-brand-50/70 via-white to-brand-100/40 text-slate-800">

  <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr]">
  
  <Sidebar setUserData={setUser} minuteData={setUsedMinutesData}/>
     {loading && <Loader />}

   
    <main className="flex flex-col min-h-screen">

      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="px-4 lg:px-8 py-3 flex items-center gap-3">
       
          <details className="lg:hidden mr-1">
            <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-brand-50 text-brand-700" title="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>
            </summary>
            <div className="absolute left-3 right-3 mt-2 rounded-xl border border-slate-200 bg-white shadow-soft p-3">
              <a className="block px-3 py-2 rounded-lg hover:bg-brand-50" href="02-dashboard.html">Dashboard</a>
              <a className="block px-3 py-2 rounded-lg hover:bg-brand-50" href="03-record.html">Record</a>
              <a className="block px-3 py-2 rounded-lg hover:bg-brand-50" href="05-search.html">Search</a>
              <a className="block px-3 py-2 rounded-lg hover:bg-brand-50" href="06-uploads.html">Uploads</a>
              <a className="block px-3 py-2 rounded-lg hover:bg-brand-50" href="07-settings.html">Settings</a>
            </div>
          </details>

        
          <div className="flex-1" >
            <label className="relative block">
              <span className="sr-only">Search recordings</span>
              <input type="text" disabled  className="w-full rounded-xl border border-slate-200 bg-white/80 px-11 py-2.5 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-200" />
              {/* <span className="absolute inset-y-0 left-3 grid place-items-center text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10 2a8 8 0 1 0 4.9 14.32l4.39 4.39 1.41-1.41-4.39-4.39A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z"/></svg>
              </span> */}
            </label>
          </div>

          {/* <a href="03-record.html" className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-4 py-2 font-medium shadow-soft hover:bg-brand-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm-7-3a7 7 0 0 0 14 0h-2a5 5 0 1 1-10 0H5z"/></svg>
            New recording
          </a> */}

          {/* <button className="ml-1 p-2 rounded-lg hover:bg-brand-50" title="Notifications">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-700" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
          </button> */}
          <NavLink to={"/settings"} className="ml-1 inline-flex items-center gap-2 p-1.5 rounded-full border border-slate-200 hover:bg-brand-50">
            <img alt="avatar" src={ user?.photoURL ? user.photoURL: Image} className="h-8 w-8 rounded-full" />
            <span className="hidden md:block text-sm pr-2">You</span>
          </NavLink>
        </div>
      </header>

      
      <section className="flex-1 px-4 lg:px-8 py-6 space-y-6">
       
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">Welcome back 👋</h1>
            <p className="text-slate-600">Your recent recordings, usage, and quick actions are below.</p>
          </div>
          <div className="flex items-center gap-2">
            <NavLink to={"/uploadfile"} className="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-4 py-2 font-medium shadow-soft hover:bg-brand-700">Upload files</NavLink>
            {/* <a href="03-record.html" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-4 py-2 font-medium shadow-soft hover:bg-brand-700">Start recording</a> */}
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-2">
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-soft">
            <div className="text-sm text-slate-500">Minutes transcribed</div>
            <div className="mt-2 flex items-baseline gap-2"><span className="text-3xl font-semibold text-slate-900">{usedMinutesData[0]?.usedMinutes}</span><span className="text-xs text-slate-500"></span></div>
            <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full w-[0%] bg-brand-600"></div></div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-soft">
            <div className="text-sm text-slate-500">Files</div>
            <div className="mt-2 flex items-baseline gap-2"><span className="text-3xl font-semibold text-slate-900">{files.length > 0 ? files.length : 0}</span><span className="text-xs text-slate-500">total</span></div>
            {/* <div className="mt-4 text-xs text-slate-500">+7 this week</div> */}
          </div>
          {/* <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-soft">
            <div className="text-sm text-slate-500">Storage used</div>
            <div className="mt-2 flex items-baseline gap-2"><span className="text-3xl font-semibold text-slate-900">7.4 GB</span><span className="text-xs text-slate-500">/ 20 GB</span></div>
            <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full w-[37%] bg-brand-600"></div></div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-soft">
            <div className="text-sm text-slate-500">Average accuracy</div>
            <div className="mt-2 flex items-baseline gap-2"><span className="text-3xl font-semibold text-slate-900">94.3%</span><span className="text-xs text-slate-500">last 30 days</span></div>
            <div className="mt-4 text-xs text-slate-500">Improve with custom vocabulary</div>
          </div> */}
        </div>

        
        {/* <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-soft">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-slate-600">Quick filters:</span>
              <a href="#" className="px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm border border-brand-200">This week</a>
              <a href="#" className="px-3 py-1.5 rounded-full bg-white text-slate-700 text-sm border">Last 30 days</a>
              <a href="#" className="px-3 py-1.5 rounded-full bg-white text-slate-700 text-sm border">Starred</a>
              <a href="#" className="px-3 py-1.5 rounded-full bg-white text-slate-700 text-sm border">Shared with me</a>
              <a href="#" className="px-3 py-1.5 rounded-full bg-white text-slate-700 text-sm border">High confidence</a>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-slate-600">Sort by</label>
              <select className="rounded-xl border border-slate-200 bg-white/80 px-3 py-1.5 text-sm">
                <option>Newest</option>
                <option>Oldest</option>
                <option>Duration</option>
                <option>Title A→Z</option>
              </select>
              <a href="05-search.html" className="px-3 py-1.5 rounded-xl border border-brand-200 text-brand-700 bg-brand-50 text-sm">Open advanced search</a>
            </div>
          </div>
        </div> */}

   
        <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-soft overflow-hidden">
          <div className="px-4 py-3 flex items-center justify-between border-b">
            <h2 className="font-semibold">Recent recordings</h2>
            {
                files.length === 0 && (
                    <>
                    <div className="inline-flex items-center gap-2 rounded-xl border border-brand-200 text-brand-700 bg-brand-50 px-4 py-2 font-medium" >No records found</div>
                    </>
                )
            }
          </div>
          <div className="overflow-x-auto scroll-slim">
            <table className="min-w-full text-sm">
              <thead className="bg-brand-50/60 text-slate-600">
                <tr>
                  <th className="text-left font-medium px-4 py-3">Title</th>
                  <th className="text-left font-medium px-4 py-3">Type</th>
                  <th className="text-left font-medium px-4 py-3">Size</th>
                  {/* <th className="text-left font-medium px-4 py-3">Speakers</th> */}
                  <th className="text-left font-medium px-4 py-3">Status</th>
                  <th className="text-right font-medium px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {
                    files.length > 0 && (
                        files.map((val,ind) => {
                            return (
 <tr className="hover:bg-brand-50/30" key={ind}>
                  <td className="px-4 py-3">
                    <a className="font-medium text-slate-900 hover:underline" href="04-transcript.html?id=mtg-240824">{val.name}</a>
                    <div className="text-xs text-slate-500">Keywords: release, blockers, estimates</div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{val.type}</td>
                  <td className="px-4 py-3 text-slate-700">{(val.size/1000000).toFixed(2)} MB</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{val.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex gap-2">
                      <a href="04-transcript.html?id=mtg-240824" className="px-3 py-1.5 rounded-lg border" style={{backgroundColor:" rgb(37, 99, 235 )",color:'#fff'}}  onClick={() => handleOpenFile(val)}>View</a>
                      {/* <a href="#" className="px-3 py-1.5 rounded-lg border">Share</a>
                      <a href="#" className="px-3 py-1.5 rounded-lg border">Export</a> */}
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

        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      
          <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-soft">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Tips to get more from Voice Notes</h3>
              <a href="15-help.html" className="text-sm text-brand-700 hover:underline">See all tips</a>
            </div>
            <div className="flex gap-3 overflow-x-auto scroll-slim snap-x">
              <article className="min-w-[260px] snap-start rounded-xl border p-4 bg-gradient-to-br from-white via-white to-brand-50">
                <div className="text-sm font-medium">⭐ Star important recordings</div>
                <p className="text-xs text-slate-600 mt-1">Use the star in transcript view to find notes faster.</p>
                <a className="inline-block mt-3 text-xs text-brand-700 underline" href="04-transcript.html">Open a transcript →</a>
              </article>
              <article className="min-w-[260px] snap-start rounded-xl border p-4 bg-gradient-to-br from-white via-white to-brand-50">
                <div className="text-sm font-medium">📚 Custom vocabulary</div>
                <p className="text-xs text-slate-600 mt-1">Add your domain terms for better accuracy.</p>
                <a className="inline-block mt-3 text-xs text-brand-700 underline" href="07-settings.html">Manage vocabulary →</a>
              </article>
              <article className="min-w-[260px] snap-start rounded-xl border p-4 bg-gradient-to-br from-white via-white to-brand-50">
                <div className="text-sm font-medium">🤝 Share with teammates</div>
                <p className="text-xs text-slate-600 mt-1">Invite your team and collaborate in real time.</p>
                <a className="inline-block mt-3 text-xs text-brand-700 underline" href="09-team.html">Open team →</a>
              </article>
            </div>
          </div>

        
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-soft">
            <h3 className="font-semibold">Usage & quota</h3>
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Transcription minutes</span>
                <span className="font-medium">{usedMinutesData[0]?.usedMinutes}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full w-[0%] bg-brand-600"></div></div>
              <div className="mt-3 text-xs text-slate-500">Resets on 01 Sep 2025</div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Files</span>
                <span className="font-medium">{files.length > 0 ? files.length : 0}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full w-[0%] bg-brand-600"></div></div>
            </div>
            {/* <a href="08-billing.html" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3 py-2 text-sm font-medium hover:bg-brand-700">Upgrade plan</a> */}
          </div>
        </div>

        
        <template id="empty-state">
          <div className="rounded-2xl border border-dashed border-brand-300 bg-brand-50/60 p-8 text-center">
            <div className="mx-auto h-12 w-12 rounded-xl bg-brand-600 text-white grid place-items-center">🎤</div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">No recordings yet</h3>
            <p className="text-slate-600">Create your first recording or upload audio to get started.</p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <a href="03-record.html" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-4 py-2 font-medium hover:bg-brand-700">Start recording</a>
              <a href="06-uploads.html" className="inline-flex items-center gap-2 rounded-xl border border-brand-200 text-brand-700 bg-brand-50 px-4 py-2 font-medium">Upload files</a>
            </div>
          </div>
        </template>
      </section>

    
    <Footer/>
    </main>
  </div>
</div>

        </>
    )

}

export default Dashboard;