import React, { useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import MyLoader from "./loader";

const AllVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/cloudvendor', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setVendors(responseData);
          setResponseMessage('success');
        } else {
          const errorMessage = `Failed to retrieve data. Server Error: ${response.statusText}`;
          setResponseMessage(errorMessage);
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
        setResponseMessage('Error retrieving data. Please check your internet connection!');
      }finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* <Button onClick={() => setResponseMessage('success')}>Click Here For All Vendors</Button> */}
      {responseMessage === 'success' ? (
        <Card.Group style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
          {vendors.map((vendor, index) => (
            <Card key={index}>
              <Card.Content>
                <p><b>Id: </b>{vendor.vendorId}</p>
                <p><b>Name: </b>{vendor.vendorName}</p>
                <p><b>Address: </b>{vendor.vendorAddress}</p>
                <p><b>Phone Number: </b>{vendor.vendorPhoneNumber}</p>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      ) : (
        <div style={{color: 'red',boxShadow:' rgba(149, 157, 165, 0.2) 0px 8px 24px',padding:'5rem',fontSize:'20px',width:'50%',margin:'5rem auto'}}>{responseMessage}</div>
      )}
    {loading && <MyLoader />}
    
    </div>
  );
};

export default AllVendors;
