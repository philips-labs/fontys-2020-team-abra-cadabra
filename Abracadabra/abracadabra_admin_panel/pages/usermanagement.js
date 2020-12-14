//react
import React from 'react';
import {useEffect, useState} from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
//bootstrap
import { Container, Row, Col, Form } from 'react-bootstrap';
//components
import NavBar from 'src/components/NavBar';
import SideBar from 'src/components/SideBar'
import {} from 'react-icons/fa';
import {useDate} from 'src/components/Dashboard/Dashboard_Greeting';
import User_Card from 'src/components/User_Card';
import UserService from 'src/services/UserService';

export default function Usermanagement() {
  const [ session, loading ] = useSession();
  // const router = useRouter();
  const { date, time, wish } = useDate();
  const [FoundUsers,setFoundUsers] = useState([]);
  const [Searching,SetSearching] = useState(false);

  const [value, setValue] = useState("");

  function RemoveUser(id){
    let users = FoundUsers;
    const arr = users.filter((item) => item.id !== id);
    setFoundUsers(arr);
  };

  const handleOnChange = (event) => {
    SetSearching(true);
    setValue(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => 
    {
      value.length > 0 ? UserService.GetByName(value)
      .then(res => {setFoundUsers(res.data); SetSearching(false);})
      .catch(err => {setFoundUsers([]); SetSearching(false);}) 
      : setFoundUsers([]); 
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [value]);

  if (loading) return null

  if (!loading && !session) signIn('Credentials')

  if (!loading && session) {
    localStorage.setItem("AdminToken", session.user.image);
return (
    <>
    <NavBar/>
    <Container fluid className="h-100">
    <Row className="h-100">
      {/* Sidebar col xl={2} md={3} */}
      <SideBar />
      {/*Verification Content */}
      <Col xl={9} md={9} className="mx-auto">
              {/* Greetings + time */}
              <Row className="mt-4">
                <Col md={6}><h3 className="WelcomingText"></h3></Col>
                <Col md={2}></Col>
                <Col md={4}><h3 className="WelcomingText text-right">{date} {time}</h3></Col>
              </Row>
              {/* Push */}
              <Row className="mt-2 mb-4">
                </Row>
                {/* Main content */}

                {/* Question reports */}
                <Row className="mx-auto mb-4">
                <Col md={12} xs={12} className="mb-4 pr-auto">
                  {/* Title */}
                  <Row className="mb-2 mx-auto">
                    <Col>
                      <Row className="border-bottom border-secondary Box">
                      <Col md={8} className=""><h3 className="BoxTitle mb-1">Manage users</h3></Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* List of users awaiting verification */}
                  <Row className="mx-auto">
                    <Col className="p-0">
                  <Form.Group>
                    <Form.Control size="md" type="text" placeholder="Search user..." onChange={handleOnChange} value={value}/>
                  </Form.Group>
                  </Col>
                  </Row>
                  <Row className="mx-auto">
                    {/* Possible experts */}
                    {/* Map the users waiting for verification */}
                    
                    {FoundUsers.length > 0 ? FoundUsers.map((fu) => <User_Card key={fu.id} UserRole={fu.role} UserID={fu.id} Username={fu.username} RemoveFunc={RemoveUser}/>) : value.length > 0 && Searching == false ? <h4>No users found</h4> : <></> }
                      
                  </Row>
                </Col>
              </Row>

          </Col>
      </Row>
      </Container>
    </>
  )
  }
}
