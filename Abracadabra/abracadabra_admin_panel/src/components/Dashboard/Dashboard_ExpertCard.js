//react
import Link from 'next/link';
//bootstrap
import {Card, Image } from 'react-bootstrap';
import {FaCheck, FaTimes } from 'react-icons/fa'

export default function Dashboard_SubjectCard({Username}) {

    return (
        <>

            <Card bg="secondary" className="mb-2 w-100">
                <Card.Body className="p-1 d-flex">
                    <Image src="https://via.placeholder.com/150" height={35} className="my-auto mr-1" roundedCircle />
                    <h5 className="my-auto mr-auto BoxContentText">{Username}</h5>
                    <Link href={"/expertverification/" + Username}><a className="my-auto BoxContentLink mr-2">View details</a></Link>
                    <Link href={"/expertverification/" + Username + "/accept"}><a className="my-auto mr-1 accept"><FaCheck /></a></Link>
                    <Link href={"/expertverification/" + Username + "/decline"}><a className="my-auto mr-1 decline"><FaTimes /></a></Link>
                </Card.Body>
            </Card>
        </>
    );
}