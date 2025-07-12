import { useState } from 'react';
import './App.css';
import BusinessInfo from './components/BusinessInfo';
import CustomPage from './components/Custom';
import QuickSetup from './components/QuickSetup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [email,setEmail] = useState('')
  
  return (
     <Router>
      <Routes>
        <Route path="/" element={<QuickSetup  setEmail={setEmail}/>} />
        <Route path="/business" element={<BusinessInfo email={email}/>} />
        <Route path="/custom" element={<CustomPage email={email} />} />
      </Routes>
    </Router>
  );
}



export default App;
