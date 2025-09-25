import { useState,lazy,Suspense,useEffect} from 'react';
import './App.css';
import ErrorBoundary from './errors/ErrorBoundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { auth, db } from "./lib/firebaseClient"; 
import { doc } from "firebase/firestore";
import { Spin } from 'antd';
import TagManager from 'react-gtm-module';


const tagManagerArgs = {
  gtmId: 'GTM-T37TCTN8', // replace with your ID
};

TagManager.initialize(tagManagerArgs);




const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;


function App() {

  const [email,setEmail] = useState('');
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userRefe, setUserRef] = useState(null);
       useEffect(() => {
          // Listen to auth state changes
          const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
              setUser(currentUser);
              setUserId(currentUser.uid);
               const userRef = doc(db, "users", currentUser.uid);
               setUserRef(userRef)

              console.log(currentUser.uid)
            } else {
              setUser(null);
            }
          });
          return () => unsubscribe();
        }, []);

const QuickSetup = lazy(() => import("./components/QuickSetup"));
const BusinessInfo = lazy(() => import("./components/BusinessInfo"));
const CustomPage = lazy(() => import("./components/Custom"));
const LoginPage = lazy(() => import("./components/Login"));
const ProductPage = lazy(() => import("./components/Product")); 
const UploadFile = lazy(() => import("./components/UploadFile"));
const Settings = lazy(() => import("./components/Settings"));



  
  return (
     <AuthProvider>
     <Router>
       <Suspense fallback={<Spin tip="Loading" size="large">
        {content}
      </Spin>}>
      <Routes>
        <Route path="/signup" exact element={
          <ErrorBoundary>
            <QuickSetup  setEmail={setEmail}/> 
            </ErrorBoundary>} />
        <Route path="/business" element={
           <ErrorBoundary>
          <BusinessInfo email={email}/>
          </ErrorBoundary>
        }
           />
        <Route path="/custom" element={
             <ErrorBoundary>
               <CustomPage email={email} />
             </ErrorBoundary>
          } />

              <Route path="/login" element={
             <ErrorBoundary>
               <LoginPage/>
             </ErrorBoundary>
          } />
           <Route path="/uploadfile" element={
             <ErrorBoundary>
               <UploadFile/>
             </ErrorBoundary>
          } />

            <Route path="/settings" element={
            
               <Settings/>
             
          } />

             <Route path="/products" element={
             <ErrorBoundary>
               <ProductPage/>
             </ErrorBoundary>
          } />

      </Routes>
      </Suspense>
    </Router>
     </AuthProvider>
  );
}



export default App;
