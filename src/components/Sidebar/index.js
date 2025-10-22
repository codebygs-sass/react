import React,{useState,useEffect} from "react";
import { NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {getDoc,doc, getFirestore} from 'firebase/firestore'
import { auth } from "../../lib/firebaseClient";



const Sidebar = () => {

  const [user,setUser] = useState([]);
  const [usedMinutesData,setUsedMinutesData] = useState([]);
  const db = getFirestore();

    useEffect(() => {
      // Listen to auth state changes
      const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          console.log(currentUser);
          // const docRef = doc(db, "usedMinutes", currentUser.uid);
          //            const docSnap = await getDoc(docRef);
          //  if (docSnap.exists()) {
          //   console.log("User document data:", docSnap.data());
          //   setUsedMinutesData(docSnap.data());
          // } else {
          //   console.log( "No such user document!");
          // }
          
        } else {
          setUser(null);
        }
      });
      return () => unsubscribe();
    }, []);

 const handleLogOut = () => {
     const auth = getAuth();
        signOut(auth)
            .then(() => {
            // Remove token from storage
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("firebase_user")

            console.log("User logged out");
            
            window.location.href = process.env.REACT_APP_WEBSITE_URL;
            })
            .catch((error) => {
            console.error("Logout error:", error);
            });
  }

    const used = usedMinutesData?.usedMinutes || 0;
  const remaining = usedMinutesData?.minutesRemaining || 0;
  const total = used + remaining;
  const percentUsed = total > 0 ? (used / total) * 100 : 0;

    return(
        <>
          <aside className="bg-white/80 backdrop-blur sticky top-0 h-full lg:h-screen border-r border-slate-200 shadow-soft hidden lg:flex flex-col">
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <div className="h-10 w-10 grid place-items-center rounded-xl bg-brand-600 text-white font-bold">A</div>
        <div>
          <div className="text-sm uppercase tracking-wider text-brand-700 font-semibold">Agentnic Voice AI</div>
          <div className="text-xs text-slate-500">Transcription</div>
        </div>
      </div>
      <nav className="mt-4 flex-1 overflow-y-auto scroll-slim">
        <ul className="px-3 space-y-1 text-sm">
          <li><NavLink to={'/dashboard'} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="02-dashboard.html">Dashboard</NavLink></li>
          {/* <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="03-record.html">Record</a></li> */}
          {/* <li><NavLink to={'/transcibe'} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" >Transcript</NavLink></li> */}
          {/* <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="05-search.html">Search</a></li> */}
          <li><NavLink to={'/uploadfile'} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" >Uploads</NavLink></li>
          <li><NavLink to={'/settings'} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-brand-50 text-brand-700 font-medium" >Settings</NavLink></li>
          <li><button onClick={() => handleLogOut()} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-brand-50 text-brand-700 font-medium" style={{color:'red'}}>Log Out</button></li>
          {/* <li className="pt-2"><div className="px-3 text-xs uppercase tracking-wide text-slate-400">More</div></li> */}
          {/* <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="08-billing.html">Billing</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="09-team.html">Team</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="10-calendar.html">Calendar</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="11-integrations.html">Integrations</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="12-bot.html">Meeting Bot</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="13-analytics.html">Analytics</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="14-admin.html">Admin</a></li>
          <li><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="15-help.html">Help</a></li>
          <li className="pt-2"><a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-brand-50" href="01-auth.html">Sign in / out</a></li> */}
        </ul>
      </nav>
      <div className="p-4 mt-auto">
        <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white p-4">
          <div className="text-sm opacity-90">Minutes used</div>
          <div className="mt-1 flex items-end gap-2"><div className="text-2xl font-semibold">0</div><div className="text-xs opacity-80"></div></div>
     <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full" style={{ width: `${percentUsed}%`, backgroundColor: "rgba(255,255,255,0.9)" }}></div>
            </div>
          {/* <a href="08-billing.html" className="mt-3 inline-flex items-center gap-2 text-xs font-medium underline">Upgrade plan →</a> */}
        </div>
      </div>
    </aside>
        </>

    )
}

export default Sidebar;