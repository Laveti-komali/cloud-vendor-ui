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

  const [responseMessage, setResponseMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
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
      const mailResponse = await fetch(`/getEmail/${formData.vendorId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const mail = await mailResponse.text();
      setLoading(true);
      const response = await fetch('/cloudvendor', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.text();
        setResponseMessage("Cloud Vendor Updated Successfully!");
      } else {
        const errorMessage = `Failed to submit data. Server Error: ${response.statusText}`;
        setResponseMessage(errorMessage);
      }
      const mailstatus=await fetch(`/MailSender/updatemail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body:mail,
      });
    }catch (error) {
      console.error('Error submitting data:', error);
      setResponseMessage('Error submitting data. Please check your internet connection.');
    }
    finally{
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
        />
        <Form.Input
          label='Name'
          name='vendorName'
          placeholder='Name'
          value={formData.name}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group widths={2}>
        <Form.Input
          label='Address'
          name='vendorAddress'
          placeholder='Address'
          value={formData.address}
          onChange={handleChange}
        />
        <Form.Input
          label='Phone Number'
          name='vendorPhoneNumber'
          placeholder='Phone Number'
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </Form.Group>
      <Modal
        trigger={<Button type='submit' style={{fontSize:'20px'}}>Submit</Button>}
        content={responseMessage}
        actions={[{ key: 'done', content: 'Done', positive: true }]}
        style={{fontSize:'20px',color:'navy'}}
      />
      
    </Form>
    {loading && <MyLoader />}
    {/* {responseMessage && (
        <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <strong>Submission Result:</strong>
          <p>{responseMessage}</p>
        </div>
      )} */}
    </div>
  );
};

export default PostVendorDetails;
