import React, { useState, useEffect } from 'react';
import Router from "next/router";
import Profile from "../../src/components/Profile.js";
import Navbar from "../../src/components/Navbar.js";

function ProfilePage() {
    const [username, setUsername] = useState(null)
    useEffect(() => {
        setUsername(window.location.pathname.split("/")[2]);
    }, [])
    return (
        <>
            <Navbar />
            {username != null ? <Profile usrNm={username} /> : <></>}
        </>
    );
}

export default ProfilePage;
