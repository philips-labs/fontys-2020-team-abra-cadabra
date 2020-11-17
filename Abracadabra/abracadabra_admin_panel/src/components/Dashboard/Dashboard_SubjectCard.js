//react

//bootstrap
import {Card, Image } from 'react-bootstrap';
import {FaEdit } from 'react-icons/fa'
//import image
import Logo from 'public/images/Abra_Logo_Centered.png';

export default function Dashboard_SubjectCard({SubjectName}) {

    return (
        <>

            <Card bg="secondary" className="mb-2 w-100">
                <Card.Body className="pl-1 pr-1 p-0 d-flex">
                    <Image src={Logo} height={35} className="my-auto" />
                    <h5 className="my-auto mr-auto BoxContentText">{SubjectName}</h5>
                    <a className="my-auto BoxContentLink mr-2">View details</a>
                    <a href={"/subjectmanagement/" + SubjectName} className="my-auto"><FaEdit /></a>
                </Card.Body>
            </Card>
        </>
    );
}