import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { useRouter } from 'next/router'

export default function FilterNav({ subjectTitle }) {
    const [activeFilter, setActiveFilter] = useState("hot");
    const router = useRouter();

    useEffect(() => {
        let path = router.asPath;
        path = path.split("/");
        if (path[3] == undefined) {
            setActiveFilter("hot")
        }
        else {
            setActiveFilter(path[3])
        }
    }, [])

    return (
        <Nav variant="tabs" className="justify-content-center" activeKey={activeFilter}>
            <Nav.Item>
                <Nav.Link eventKey="hot" href={'/subject/' + subjectTitle}>Hot</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="new" href={'/subject/' + subjectTitle + '/new'}>New</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="answeredByExpert" href={'/subject/' + subjectTitle + '/answeredByExpert'}>Answered by an Expert</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="unanswered" href={'/subject/' + subjectTitle + '/unanswered'}>Unanswered</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}
