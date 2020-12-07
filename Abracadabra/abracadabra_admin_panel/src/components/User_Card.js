//react
import React from 'react';
import {useEffect, useState} from 'react';
import Link from 'next/link';
//bootstrap
import {Card, Image, Modal, Button, Container, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import {FaBan, FaLockOpen } from 'react-icons/fa';
import UserService from 'src/services/UserService';

// Get Verification info with api call

export default function User_Card({UserRole, Username, UserID, RemoveFunc}) {
    const [UserRoleState, setUserRoleState] = useState("");


    useEffect(() => {
        setUserRoleState(UserRole);
      }, []);


    const deleteUser = () => {
        UserService.BanUser(UserID).then(res => {setUserRoleState("Banned");}).catch(err => {});
        //RemoveFunc(UserID);
    };

    const unbanUser = () => {
        UserService.UnBanUser(UserID).then(res => {setUserRoleState(res.data);}).catch(err => {});
    };

    return (
        <>
            <Card bg="secondary" className="mb-2 w-100">
                <Card.Body className="p-1 d-flex">
                    <Image src="https://via.placeholder.com/150" height={35} className="my-auto mr-1" roundedCircle />
                    <h5 className="my-auto mr-auto BoxContentText">{UserRoleState} | {Username}</h5>
                    {UserRoleState == "Banned" ? 
                        <OverlayTrigger placement={"right"} overlay={<Tooltip><b>Unban user</b></Tooltip>}>                                         
                            <a onClick={unbanUser} className="my-auto mr-1 accept"><FaLockOpen /></a>
                        </OverlayTrigger>  
                    : <OverlayTrigger placement={"right"} overlay={<Tooltip><b>Ban user</b></Tooltip>}>                      
                    <a onClick={deleteUser} className="my-auto mr-1 decline"><FaBan /></a>
                </OverlayTrigger>}
                    
                </Card.Body>
            </Card>
        </>
    );
}