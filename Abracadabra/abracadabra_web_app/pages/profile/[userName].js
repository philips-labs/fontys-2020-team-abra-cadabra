import React, { useState, useEffect } from 'react';
import Profile from "../../src/components/Profile.js";
import BlankNavBar from "../../src/components/BlankNavBar.js";

function ProfilePage() {
    const [username, setUsername] = useState(null)
    useEffect(() => {
        setUsername(window.location.pathname.split("/")[2]);
    }, [])
    return (
        <>
            <BlankNavBar />
            {username != null ? <Profile usrNm={username} /> : <></>}
        </>
    );
}

export default ProfilePage;
