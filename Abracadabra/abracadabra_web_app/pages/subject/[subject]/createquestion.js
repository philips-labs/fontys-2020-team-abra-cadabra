import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import Navbar from "src/components/Navbar";
import { Form, Button, Row, Col } from 'react-bootstrap';
import QuestionService from 'src/services/QuestionService';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function QuestionForm() {
    // get the subject from router, to pass to the navbar for navigation button and title
    const router = useRouter();
    const { subject } = router.query;

    const [SubjectSlug, setSubjectSlug] = useState();
    const [validated, setValidated] = useState(false);
    const initialInputState = { title: "", description: "", subjectslug: "" };
    const [question, setQuestion] = useState(initialInputState);
    const { title, description } = question;
    const [tags, setTags] = useState([{ tag: "" }]);


    const handleInputChange = e => {
        setQuestion({ ...question, [e.target.name]: e.target.value, subjectslug: router.query.subject });
    };

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            const { subject } = router.query;
            setQuestion({ ...question, subjectslug: SubjectSlug });
            console.log(question);
            var response = await QuestionService.Question(question);
            Router.push('/subject/' + subject + '/question/' + response?.data?.id);
        }

        setValidated(true);
    };
    const handleInputChangeTags = (e, index) => {
        const { name, value } = e.target;
        const list = [...tags];
        list[index][name] = value;
        setTags(list);
    };
    const handleRemoveClick = index => {
        const list = [...tags];
        list.splice(index, 1);
        setTags(list);
    };
    const handleAddClick = () => {
        setTags([...tags, { tag: "" }]);
    };

    return (
        <>
            <Navbar subjectTitle={subject} />
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="questionForm mx-auto">
                <h4>Submit Your Question</h4>
                <br />
                <Form.Group>
                    <Form.Label className="label">Question:</Form.Label>
                    <Form.Control required className="question createquestion-title" type="text" name="title" onChange={handleInputChange} placeholder="Type Your Question Here" />
                    <Form.Control.Feedback className="feedback">Question Looks Good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" className="feedback">Question is Empty!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="label">Description:</Form.Label>
                    <Form.Control required as="textarea" rows="10" name="description" onChange={handleInputChange} placeholder="Expand on Your Question Here" minLength="25" />
                    <Form.Control.Feedback className="feedback">The Description Looks Good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" className="feedback">The Description Needs to be at least 25 Characters long!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>

                    <Form.Label className="label">Tags:</Form.Label>
                    <br />
                        {tags.map((x, i) => {
                            return (
                            
                                    <div className="badge badge-info p-1 mr-1 tags-margin">
                                        <input className="tags-input"
                                            name="tag"
                                            placeholder="Enter Tag"
                                            value={x.tag}
                                            onChange={e => handleInputChangeTags(e, i)}
                                        />
                                        <a className="badge badge-info p-1 mr-1 tags-button-remove"
                                            onClick={() => handleRemoveClick(i)}> <FontAwesomeIcon icon={faTimes} /></a>
                                    </div>
                                
                            );
                        })}

                    <a className="badge badge-info p-2 mr-2 tags-button-plus" onClick={handleAddClick}>+</a>

            
                </Form.Group>
                <Button className="buttonSubmit" type="submit">Submit Question</Button>
            </Form>
        </>
    );
}


export default QuestionForm