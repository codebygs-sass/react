import { useState,lazy,Suspense} from 'react';
import './App.css';
import ErrorBoundary from './errors/ErrorBoundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from "./auth/PrivateRoute";
import { Spin } from 'antd';


const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};
const content = <div style={contentStyle} />;


function App() {

  const [email,setEmail] = useState('');

const QuickSetup = lazy(() => import("./components/QuickSetup"));
const BusinessInfo = lazy(() => import("./components/BusinessInfo"));
const CustomPage = lazy(() => import("./components/Custom"));
const LoginPage = lazy(() => import("./components/Login"));
// const ProductPage = lazy(() => import("./components/Product"));



  
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

      </Routes>
      </Suspense>
    </Router>
     </AuthProvider>
  );
}



export default App;
