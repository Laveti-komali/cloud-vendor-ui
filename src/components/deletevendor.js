import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Header, Icon, Modal } from 'semantic-ui-react'
import MyLoader from './loader';

const DeleteVendorById = () => {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const validateForm = () => {
    const idPattern = /^C\d+$/;

    if (!idPattern.test(id)) {
      alert('Invalid Form, Id must be in the format "C" followed by number');
      return false;
    }
    return true;
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setOpen(false);
    try {
      const mailResponse = await fetch(`/getEmail/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const mail = await mailResponse.text();
      setLoading(true);
      const response = await fetch(`/cloudvendor/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mail),
      });
      const data = await response.text();
      setResult("Vendor Deleted Successfully!");
      const mailstatus=await fetch(`/MailSender`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body:mail,
      });
      console.log(mailstatus);

    } catch (error) {
      console.error('Error fetching data:', error);
      setResult(null);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div>
      <Form unstackable style={{maxWidth:'25%',margin:'auto',marginTop:'4rem',padding:'2rem',fontSize:'20px'}}>
        <Form.Group>
          <Form.Input
            label='Enter Id'
            placeholder='Id'
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>
        {/* <Button type='submit' onClick={handleSubmit}>
          Submit
        </Button> */}
      
      <Modal
      
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button type='submit'>
      Submit
    </Button>
  
    }
    style={{border:'2px solid white',padding:'3rem',borderRadius:'20px',textAlign:'center'}}
    inverted>
      <Header icon>
        <Icon name='trash' color='blue' />
        Delete Data
      </Header>
      <Modal.Content >
        <p style={{textAlign:'center'}}>
          Do you want to delete the vendor details permanently?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='grey'  onClick={() => setOpen(false)}>
          <Icon name='remove's/> No
        </Button>
        
        <Button color='blue' onClick={handleSubmit}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
    </Form>
    {loading && <MyLoader />}

      {result && (
        <div style={{textAlign:'center',fontSize:'20px',color:'navy',textTransform:'capitalize'}}>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default DeleteVendorById;




    