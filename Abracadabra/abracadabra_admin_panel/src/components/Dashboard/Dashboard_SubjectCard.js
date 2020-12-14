//react
import Link from 'next/link';
//bootstrap
import {Card, Image } from 'react-bootstrap';
import {FaEdit } from 'react-icons/fa'
//import image
// import Logo from 'public/images/Abra_Logo_Centered.png';

export default function Dashboard_SubjectCard({SubjectName, SubjectID}) {

    return (
        <>

            <Card bg="secondary" className="mb-2 w-100">
                <Card.Body className="pl-1 pr-1 p-0 d-flex">
                    <Image src={"/images/Abra_Logo_Centered.png"} height={35} className="my-auto" />
                    <h5 className="my-auto mr-auto BoxContentText">{SubjectName}</h5>
                    {/* <Link href={"/subjectmanagement/" + SubjectID}><a className="my-auto BoxContentLink mr-2 disabled">View details</a></Link> */}
                    <a className="my-auto BoxContentLinkDisabled mr-2">View details</a>
                    {/* <Link href={"/subjectmanagement/" + SubjectID + "/edit"}><a className="my-auto disabled"><FaEdit /></a></Link> */}
                    <a className="my-auto BoxContentLinkDisabled" disabled><FaEdit /></a>
                </Card.Body>
            </Card>
        </>
    );
}