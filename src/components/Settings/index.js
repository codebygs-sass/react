import { useState,useEffect } from 'react';
import { auth } from "../../lib/firebaseClient";
import { updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc,getDoc } from "firebase/firestore";
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import './index.css';


const Settings = () => {
  
 const db = getFirestore();
 const [user, setUser] = useState(null);
 const [section,setSection] = useState('Profile')

 const [inputs,setInputs] = useState({
   org:"",
   timezone: "",
   displayName:"",
   email: ""
 })
  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log(currentUser)
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          console.log("Updated user data:", docSnap.data());
          setInputs({...inputs,timezone:docSnap.data().timezone, org:docSnap.data().org,displayName:currentUser.displayName,email:currentUser.email})
        }else{
          setInputs({...inputs,displayName:currentUser.displayName,email:currentUser.email})
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  
  console.log(user);

  
  const [file,setFile] = useState(null);
  const [url,setUrl] = useState(null);
const [uploading, setUploading] = useState(false);

  const handleChangeInputs = (e) => {
        const {name,value} = e.target;
  setInputs({...inputs,[name]:value})
  }

   const handleUpload = async () => {
    if (!file) return;

    
    const idToken = await auth.currentUser?.getIdToken(true);
    console.log(idToken,"token");


    
  const formData = new FormData();
    formData.append("file", file);
    formData.append('token', sessionStorage.getItem('token'));

    // Send URL to backend to update user profile
    const res = await fetch(`${serverUrl}/api/profileupload`, {
      method: "POST",
      body: formData,
    });

       const data = await res.json();

    if (data.success) {
  if (!user) throw new Error('User not logged in');
  const photoURL = data?.photoURL;
  setUrl(photoURL);
  await updateProfile(user, { photoURL });
      alert("Profile picture updated!");
    }
  };

  const handleDataSave = async () => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
              console.log(userRef);
  await setDoc(doc(db, "users", user.uid), {
      org: inputs.org,
      timezone: inputs.timezone
  }, { merge: true });

  console.log("Firestore user data updated!");

}
const docRef = doc(db, "users", user.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Updated user data:", docSnap.data());
}
}




const handleProfile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
}

    return (
        <>
            <div className="bg-gradient-to-br from-brand-50/70 via-white to-brand-100/40 text-slate-800">
  <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr]">
  <Sidebar />
    <main className="flex flex-col min-h-screen">
    
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="px-4 lg:px-8 py-3 flex items-center gap-3">
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">Settings</h1>
          <div className="ml-auto flex items-center gap-2 text-sm">
            {/* <a href="03-record.html" className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white px-3 py-1.5 shadow-soft hover:bg-brand-700">New recording</a> */}
            <a href="07-settings.html" className="inline-flex items-center gap-2 p-1.5 rounded-full border border-slate-200 hover:bg-brand-50"><img id="header_profilePic" alt="avatar" src={ user?.photoURL ?`${serverUrl}${user?.photoURL}`: `${serverUrl}/uploads/default.png`} className="h-8 w-8 rounded-full" /></a>
          </div>
        </div>
      </header>

  
      <section className="flex-1 px-4 lg:px-8 py-6">
    
        <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-soft">
          {/* <div className="px-4 py-3 border-b flex flex-wrap items-center gap-2">
            <button className="tab-btn px-3 py-1.5 rounded-lg border text-sm" onClick={() => setSection('Profile')} data-tab="profile" aria-selected="true">Profile</button>
            <button className="tab-btn px-3 py-1.5 rounded-lg border text-sm" onClick={() => setSection('Preferences')} data-tab="preferences">Preferences</button>
            <button className="tab-btn px-3 py-1.5 rounded-lg border text-sm" data-tab="vocab">Custom vocabulary</button>
            <button className="tab-btn px-3 py-1.5 rounded-lg border text-sm" data-tab="notifications">Notifications</button>
            <button className="tab-btn px-3 py-1.5 rounded-lg border text-sm" data-tab="shortcuts">Shortcuts</button>
            <button className="tab-btn px-3 py-1.5 rounded-lg border text-sm" data-tab="devices">Devices</button>
            <button className="tab-btn px-3 py-1.5 rounded-lg border text-sm" data-tab="privacy">Privacy</button>
          </div> */}

       
          <div className="p-4 space-y-6">
       
       {
        section==='Profile' && (
    <section id="panel-profile">
              <h2 className="font-semibold">Profile</h2>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 rounded-xl border p-4 bg-white">
                     <div id="profile-form" className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <label className="block">
                      <span className="text-slate-600">Full name</span>
                      <input  className="mt-1 w-full rounded-lg border px-3 py-2" name="displayName" value={inputs.displayName}  onChange={(e) => handleChangeInputs(e)} />
                    </label>
                    <label className="block">
                      <span className="text-slate-600">Email</span>
                      <input  className="mt-1 w-full rounded-lg border px-3 py-2" name="email"  value={inputs.email} onChange={(e) => handleChangeInputs(e)}/>
                    </label>
                    <label className="block">
                      <span className="text-slate-600">Organization</span>
                      <input id="profile_org" className="mt-1 w-full rounded-lg border px-3 py-2" name="org" placeholder="Company"  value={ inputs.org } onChange={(e) => handleChangeInputs(e)}/>
                    </label>
                    <label className="block">
                      <span className="text-slate-600">Time zone</span>
                      <select id="profile_timezone" name="timezone" value={inputs?.timezone ?? ""}  onChange={(e) => handleChangeInputs(e)} className="mt-1 w-full rounded-lg border px-3 py-2">
                        <option  value="IST">Asia/Kolkata (IST)</option>
                        <option value="UTC">UTC</option>
                        <option value="PST">America/Los_Angeles (PT)</option>
                      </select>
                    </label>
                  
                  <div className="mt-4 flex items-center gap-2">
                    <button className="px-4 py-2 rounded-xl bg-brand-600 text-white" onClick={handleDataSave}>Save</button>
                    <button className="px-4 py-2 rounded-xl border">Cancel</button>
                  </div>
                  </div>
                </div>
                  <div  className="rounded-xl border p-4 bg-white">
                    <div  className="flex items-center gap-3">
                      <img id="profile-img" className="h-12 w-12 rounded-full" src={ user?.photoURL ?`${serverUrl}${user?.photoURL}`: `${serverUrl}/uploads/default.png`} alt="avatar"/>
                      <div>
                        <div className="font-medium">Your avatar</div>
                        <div className="text-xs text-slate-500">PNG/JPG up to 2MB</div>
                        <input className="my-2 w-48 p-2 text-sm border border-gray-300 rounded" id="file" type="file" accept="image/*" onChange={(e) => handleProfile(e)} required />
                      </div>
                    </div>
                  
                  <div id="status"></div>
                    <div className="mt-3 flex items-center gap-2 text-sm">
                      <button  className="px-3 py-1.5 rounded-lg border" onClick={() => handleUpload()}>Upload</button>
                      <button  className="px-3 py-1.5 rounded-lg border">Remove</button>
                    </div>
                  </div>
              </div>
            </section>
        )
       }
{/* 
       {
        section === 'Preferences' && (
            <section id="panel-preferences" >
              <h2 className="font-semibold">Preferences</h2>
              <form id="preference-form" className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border p-4 bg-white space-y-3 text-sm">
                  <div  className="flex items-center justify-between">
                    <span className="text-slate-700">Default language</span>
                    <select  id="preference_langauge" className="rounded-lg border px-2 py-1">
                      <option value="en-us">English (US)</option>
                      <option value="en-in" selected>English (India)</option>
                      <option value="hindi">Hindi (India)</option>
                      <option value="tamil">Tamil (India)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Auto-punctuation</span>
                    <input id="preference_punctuation" type="checkbox" className="toggle" checked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Speaker diarization</span>
                    <input id="preference_diarization" type="checkbox" className="toggle" checked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Show word timestamps</span>
                    <input id="preference_timestamps" type="checkbox" className="toggle" checked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Theme</span>
                    <select id="preference_Theme" className="rounded-lg border px-2 py-1">
                      <option value="light" selected>Light (Blue)</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                </div>
                <div className="rounded-xl border p-4 bg-white text-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Skip silence on playback</span>
                    <input id="preference_playback" type="checkbox" className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Auto-start recording page</span>
                    <input id="preference_recording" type="checkbox" className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Auto-open summary panel</span>
                    <input id="preference_summary" type="checkbox" className="toggle" checked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700">Default export format</span>
                    <select id="preference_format" className="rounded-lg border px-2 py-1">
                      <option value=".txt">.txt</option>
                      <option value=".docx" selected>.docx</option>
                      <option value=".pdf">.pdf</option>
                      <option value=".srt">.srt</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <button className="px-4 py-2 rounded-xl bg-brand-600 text-white">Save</button>
                    <button className="px-4 py-2 rounded-xl border">Cancel</button>
                  </div>
              </form>
            </section>
        )
       }
       {
        section === 'Custom vocabulary' && (
          <>
            <section id="panel-vocab" className="hidden">
              <h2 className="font-semibold">Custom vocabulary</h2>
              <div className="mt-3 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
                <div className="rounded-xl border p-4 bg-white">
                  <form id="vocabulary-form" className="flex items-center gap-2">
                    <input id="termInput" type="text" className="flex-1 rounded-lg border px-3 py-2 text-sm" placeholder="Add names, jargon, product terms… e.g., Zoho, Urapakkam, raga"/>
                    <button id="addTerm" className="px-3 py-2 rounded-xl bg-brand-600 text-white text-sm">Add</button>
                  </form>
                  <div id="terms" className="mt-3 flex flex-wrap gap-2 text-sm">
                    <span className="term px-2 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">Otter</span>
                    <span className="term px-2 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">diarization</span>
                    <span className="term px-2 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">IST</span> 
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <button id="exportTerms" className="px-3 py-1.5 rounded-lg border">Export .json</button>
                    <label className="px-3 py-1.5 rounded-lg border cursor-pointer">Import .json
                      <input id="importTerms" type="file" accept=".json" className="hidden" />
                    </label>
                    <button id="clearTerms" className="px-3 py-1.5 rounded-lg border">Clear all</button>
                  </div>
                </div>
                <div className="rounded-xl border p-4 bg-white">
                  <div className="font-medium">Tips</div>
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
                    <li>One word or short phrase per entry.</li>
                    <li>Add names and domain-specific terms to boost accuracy.</li>
                    <li>Case-insensitive; avoid duplicates.</li>
                  </ul>
                </div>
              </div>
            </section>
          </>
        )
       }
       {
        section === 'Notifications' && (
          <>
            <section id="panel-notifications" className="hidden">
              <h2 className="font-semibold">Notifications</h2>
              <form id="notifications-form" className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl border p-4 bg-white space-y-3">
                  <div className="flex items-center justify-between"><span>Recording finished</span><input id="notifications_Recording" type="checkbox" className="toggle" checked/></div>
                  <div className="flex items-center justify-between"><span>Transcript ready</span><input id="notifications_Transcript" type="checkbox" className="toggle" checked/></div>
                  <div className="flex items-center justify-between"><span>Mentions in comments</span><input id="notifications_Mentions" type="checkbox" className="toggle" checked/></div>
                  <div className="flex items-center justify-between"><span>Shared with you</span><input id="notifications_Shared"t type="checkbox" className="toggle"/></div>
                </div>
                <div className="rounded-xl border p-4 bg-white space-y-3">
                  <div className="flex items-center justify-between"><span>Email</span><input id="notifications_Email" type="checkbox" className="toggle" checked/></div>
                  <div className="flex items-center justify-between"><span>Push (mobile)</span><input id="notifications_Push" type="checkbox" className="toggle" checked/></div>
                  <div className="flex items-center justify-between"><span>Desktop</span><input id="notifications_Desktop" type="checkbox" className="toggle"/></div>
                  <div className="flex items-center justify-between"><span>Weekly summary</span><input id="notifications_summary" type="checkbox" className="toggle"/></div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <button className="px-4 py-2 rounded-xl bg-brand-600 text-white">Save</button>
                    <button className="px-4 py-2 rounded-xl border">Cancel</button>
                  </div>
              </form>
            </section>
          </>
        )
       }
       {
        section === 'Keyboard shortcuts' && (
          <>
            <section id="panel-shortcuts" className="hidden">
              <h2 className="font-semibold">Keyboard shortcuts</h2>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border p-4 bg-white">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center justify-between border rounded-lg px-3 py-2"><span>Start/Stop</span><kbd className="px-2 py-1 rounded bg-slate-100 border">Space</kbd></div>
                    <div className="flex items-center justify-between border rounded-lg px-3 py-2"><span>Pause</span><kbd className="px-2 py-1 rounded bg-slate-100 border">P</kbd></div>
                    <div className="flex items-center justify-between border rounded-lg px-3 py-2"><span>Bookmark</span><kbd className="px-2 py-1 rounded bg-slate-100 border">B</kbd></div>
                    <div className="flex items-center justify-between border rounded-lg px-3 py-2"><span>Highlight</span><kbd className="px-2 py-1 rounded bg-slate-100 border">H</kbd></div>
                    <div className="flex items-center justify-between border rounded-lg px-3 py-2"><span>Find</span><kbd className="px-2 py-1 rounded bg-slate-100 border">Ctrl/⌘ F</kbd></div>
                    <div className="flex items-center justify-between border rounded-lg px-3 py-2"><span>Replace</span><kbd className="px-2 py-1 rounded bg-slate-100 border">Ctrl/⌘ R</kbd></div>
                  </div>
                </div>
                <div className="rounded-xl border p-4 bg-white">
                  <div className="font-medium">Try it</div>
                  <p className="text-sm text-slate-600">Focus the box and press a key combo. We'll show what we detected.</p>
                  <div id="tester" tabindex="0" className="mt-2 h-28 rounded-xl border-2 border-dashed grid place-items-center text-slate-500">Click here, then press keys</div>
                  <div id="pressed" className="mt-2 text-sm text-slate-700">—</div>
                </div>
              </div>
            </section>

          </>
        )
       } */}
        
                   

       

           

            

            
            {/* <section id="panel-devices" className="hidden">
              <h2 className="font-semibold">Devices</h2>
              <form id="devices-form" className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl border p-4 bg-white space-y-3">
                  <div className="text-slate-700 font-medium">Microphone</div>
                  <select id="devices_microphone" className="w-full rounded-lg border px-3 py-2">
                    <option value="default" selected>Default microphone</option>
                    <option value="external">External USB mic</option>
                  </select>
                  <div className="mt-2 h-3 rounded-full bg-slate-200 overflow-hidden"><div id="vu" className="h-full w-1/3 bg-brand-600"></div></div>
                  <div className="text-xs text-slate-500">Speak to test input levels.</div>
                </div>
                <div className="rounded-xl border p-4 bg-white space-y-3">
                  <div className="text-slate-700 font-medium">Speaker</div>
                  <select id="devices_speaker" className="w-full rounded-lg border px-3 py-2">
                    <option value="default" selected>Default output</option>
                    <option value="headphones">Headphones</option>
                  </select>
                  <button className="px-3 py-1.5 rounded-lg border">Play test sound</button>
                </div>
                <div className="mt-4 flex items-center gap-2">
                    <button className="px-4 py-2 rounded-xl bg-brand-600 text-white">Save</button>
                    <button className="px-4 py-2 rounded-xl border">Cancel</button>
                  </div>
              </form>
            </section> */}

        
            {/* <section id="panel-privacy" className="hidden">
              <h2 className="font-semibold">Privacy & data</h2>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <form id="privacy-form" className="rounded-xl border p-4 bg-white space-y-3">
                  <div className="flex items-center justify-between"><span>Make new recordings private</span><input  id="privacy_recording" type="checkbox" className="toggle" checked /></div>
                  <div className="flex items-center justify-between"><span>Allow link sharing by default</span><input id="privacy_sharing" type="checkbox" className="toggle" /></div>
                  <div className="flex items-center justify-between"><span>Auto-delete trashed items</span><select id="privacy_trash" className="rounded-lg border px-2 py-1"><option>Never</option><option>30 days</option><option>60 days</option></select></div>
                  <div className="mt-4 flex items-center gap-2">
                    <button className="px-4 py-2 rounded-xl bg-brand-600 text-white">Save</button>
                    <button className="px-4 py-2 rounded-xl border">Cancel</button>
                  </div>
                </form>
                <div className="rounded-xl border p-4 bg-white space-y-3">
                  <div className="font-medium">Account data</div>
                  <button className="px-3 py-1.5 rounded-lg border">Export account data</button>
                  <button className="px-3 py-1.5 rounded-lg border">Delete account</button>
                </div>
              </div>
            </section>    */}
          </div>
          </div>
          </section>
          
        

     <Footer/>
    </main>
  </div>
</div>
        </>
    )
}

export default Settings;