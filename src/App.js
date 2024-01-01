import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AllVendors from "./components/allvendors"
import DeleteVendorById from "./components/deletevendor"
import GetVendorById from "./components/getvendorById"
import PostVendorDetails from "./components/postvendorDetails"
import UpdateVendorDetails from "./components/updatevendor"
import Home from './components/home'
import Navbar from './components/navbar'

function App() {
    return (
      
      <div style={{backgroundColor:'#f8fafc',height:'100vh'}}>
        <Router>
          <Navbar />
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/cloud_vendor/getdetails" element={<GetVendorById />} />
          <Route path="/cloud_vendor/allvendors" element={<AllVendors />} />
          <Route path="/cloud_vendor/createvendor" element={<PostVendorDetails />} />
          <Route path="/cloud_vendor/delete" element={<DeleteVendorById />} />
          <Route path="/cloud_vendor/update" element={<UpdateVendorDetails />} />
  
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </div>
    )
  }
  export default App