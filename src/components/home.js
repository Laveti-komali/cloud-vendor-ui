import React from 'react';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const items = [
  {
    header: 'Create Vendor',
    link: '/cloud_vendor/createvendor',
  },
  {
    header: 'Update Vendor',
    link: '/cloud_vendor/update',
  },
  {
    header: 'Vendor Details',
    link: '/cloud_vendor/getdetails',
  },
  {
    header: 'All Vendors',
    link: '/cloud_vendor/allvendors',
  },
  {
    header: 'Delete Vendor',
    link: '/cloud_vendor/delete',
  },
];

const Home = () => (
  <Card.Group style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',marginTop:'5rem' }}>
    {items.map((item, index) => (
      <Link to={item.link} key={index}>
        <Card style={{ cursor: 'pointer',margin:'1rem'}}>
          <Card.Content>
            <Card.Header>{item.header}</Card.Header>
          </Card.Content>
        </Card>
      </Link>
    ))}
  </Card.Group>
);

export default Home;
