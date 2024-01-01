import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import MyLoader from './loader';

const PostVendorDetails = () => {
  const [formData, setFormData] = useState({
    vendorId: '',
    vendorName: '',
    vendorAddress: '',
    vendorPhoneNumber: '',
  });
  const [formExtraData, setFormExtraData] = useState({
    vendorEmail: '',
    vendorPassword: ''
  });

  const [responseMessage, setResponseMessage] = useState(null);
  const [extraResponseMessage, setExtraResponseMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleExtraChange = (e, { name, value }) => {
    setFormExtraData({ ...formExtraData, [name]: value });
  };
  const validateForm = () => {
    const idPattern = /^C\d+$/;

    if (!idPattern.test(formData.vendorId)) {
      alert('Invalid Form, Id must be in the format "C" followed by number');
      return false;
    }
    if (formData.vendorPhoneNumber.length !== 10) {
      alert('Invalid Form, phone number must be 10 digits');
      return false;
    }
    return true;
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch('/cloudvendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.text();
        setResponseMessage("Cloud Vendor created successfully!");
      } else {
        const errorMessage = `Failed to submit data. Server Error: ${response.statusText}`;
  
        setResponseMessage(errorMessage);
      }
    }catch (error) {
      console.error('Error submitting data:', error);
      setResponseMessage('Error submitting data. Please check your internet connection.');
    }finally{
      setLoading(false);
      setFormExtraData({ ...formExtraData, "vendorId": formData.vendorId });
      
    }
  };
  const handleExtraSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch('/extra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formExtraData),

      });

      if (response.ok) {
        const responseData = await response.text();
        setExtraResponseMessage("Data added successfully!");
      } else {
        console.log(formExtraData);
        const errorMessage = `Failed to submit data. Server Error: ${response.statusText}`;
  
        setExtraResponseMessage(errorMessage);
      }
    }catch (error) {
      console.error('Error submitting data:', error);
      setExtraResponseMessage('Error submitting data. Please check your internet connection.');
    }finally{
      setLoading(false);
    }
  };

  return (
    <div>
    <Form onSubmit={handleSubmit} style={{maxWidth:'70%',margin:'0 auto',marginTop:'5rem',padding:'2rem',fontSize:'20px'}}>
      <Form.Group unstackable widths={2}>
        <Form.Input
          label='Id'
          name='vendorId'
          placeholder='Id'
          value={formData.id}
          onChange={handleChange}
          required={true}
        />
        <Form.Input
          label='Name'
          name='vendorName'
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
          required={true}
          
        />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input
          label='Address'
          name='vendorAddress'
          placeholder='Address'
          value={formData.address}
          onChange={handleChange}
          required={true}
        />
        <Form.Input
          label='Phone Number'
          name='vendorPhoneNumber'
          placeholder='Phone Number'
          value={formData.phoneNumber}
          onChange={handleChange}
          required={true}
        />
      </Form.Group>
      <Modal
      trigger={<Button type='submit' style={{fontSize:'20px'}} onClick={validateForm}>Submit</Button>}
      content={responseMessage}
      actions={[{ key: 'done', content: 'Done', positive: true }]}
      style={{fontSize:'20px',color:'navy'}}
    />
      
    </Form>
    {loading && <MyLoader />}
    {responseMessage && (
      <Form onSubmit={handleExtraSubmit} style={{maxWidth:'70%',margin:'0 auto',marginTop:'5rem',padding:'2rem',fontSize:'20px'}}>
      <Form.Group unstackable widths={2}>
        <Form.Input
          label='Email'
          name='vendorEmail'
          placeholder='abc@example.com'
          value={formData.email}
          onChange={handleExtraChange}
          required={true}
        />
        <Form.Input
          label='Password'
          name='vendorPassword'
          placeholder='password'
          value={formData.password}
          onChange={handleExtraChange}
          required={true}
          
        />
        </Form.Group>
        <Modal
          trigger={<Button type='submit' style={{fontSize:'20px'}}>Submit</Button>}
          content={extraResponseMessage}
          actions={[{ key: 'done', content: 'Done', positive: true }]}
          style={{fontSize:'20px',color:'navy'}}
        />
      </Form>
      
    )}
    </div>
  );
};

export default PostVendorDetails;




