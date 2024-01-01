import React, { useState } from "react";
import { Button, Form} from "semantic-ui-react";
import MyLoader from "./loader";


const GetVendorById = () => {
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);
  const [errorMessage,setErrorMessage]=useState(null);
  const [loading, setLoading] = useState(false);
  const validateForm = () => {
    const idPattern = /^C\d+$/;

    if (!idPattern.test(id)) {
      alert('Invalid Form, Id must be in the format "C" followed by number');
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/cloudvendor/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(response.status===500){
        setErrorMessage("Vendor Not Found");
        setResult(null);
      }
      else {
        const data = await response.json();
        setResult(data);
        setErrorMessage(null);
      }
      
      // setResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult(null);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div>
      <Form
        unstackable
        style={{
          maxWidth: "25%",
          margin: "auto",
          marginTop: "4rem",
          padding: "2rem",
          fontSize: "20px",
        }}
      >
        <Form.Group>
          <Form.Input
            label="Enter Id"
            placeholder="Id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" onClick={handleSubmit} style={{fontSize:'20px'}}>
          Submit
        </Button>
      </Form>
      
      {errorMessage && (
        <div style={{ color: 'red', textAlign: 'center', marginTop: '1rem',fontSize:'20px'}}>
          {errorMessage}
        </div>
      )}
      {loading && <MyLoader />}
      {result && (
      <div class="card" style={{padding:'2rem 5rem',boxShadow:' rgba(149, 157, 165, 0.2) 0px 8px 24px',margin:'auto',width:'30%',fontSize:'20px',textAlign:'center'}}>
        <h1 style={{fontWeight:'100',fontSize:'30px'}}>VENDOR DETAILS</h1>
          <p style={{fontWeight:'100'}}><b style={{color:'navy',fontWeight:'600'}}>Name: </b>{result.vendorName}</p>
          <p style={{fontWeight:'100'}}><b style={{color:'navy',fontWeight:'600'}}>Id: </b>{result.vendorId}</p>
          <p style={{fontWeight:'100'}}><b style={{color:'navy',fontWeight:'600'}}>Address: </b>{result.vendorAddress}</p>
          <p style={{fontWeight:'100'}}><b style={{color:'navy',fontWeight:'600'}}>Phone Number: </b>{result.vendorPhoneNumber}</p>
      </div>
        // <div>
        //   <pre>{JSON.stringify(result, null, 2)}</pre>
        // </div>
      )}
    </div>
  );
};

export default GetVendorById;
