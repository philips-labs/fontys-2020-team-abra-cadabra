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
    const [message, setMessage] = useState("");
    const initialInputState = { title: "", description: "", subjectname: "", tags: [] };
    const [question, setQuestion] = useState(initialInputState);
    const { title, description } = question;
    const [tags, setTags] = useState([{ TagName: "" }]);


    const handleInputChange = e => {
        setQuestion({ ...question, [e.target.name]: e.target.value, subjectname: router.query.subject });
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
            setQuestion({ ...question, subjectname: SubjectSlug });
            await QuestionService.Question(question)
            .then((response) => {
              setMessage("Question created");
              Router.push(
                "/subject/" + subject + "/question/" + response?.data?.id
              );
            })
            .catch((error) => {
              console.log(error);
            });
        }
        setValidated(true);
    };
    const handleInputChangeTags = (e, index) => {
        const { name, value } = e.target;
        const list = [...tags];
        list[index][name] = value;
        setTags(list);
        setQuestion({ ...question, tags: tags });
    };
    const handleRemoveClick = index => {
        const list = [...tags];
        list.splice(index, 1);
        setTags(list);
    };
    const handleAddClick = () => {
        setTags([...tags, { TagName: "" }]);
    };

    return (
        <>
            <Navbar subjectTitle={subject} />
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="questionForm mx-auto">
                <h4>Submit Your Question</h4>
                <br />
                <Form.Group>
                    <Form.Label className="label">Question:</Form.Label>
                    <Form.Control  data-testid="question-input-question" required className="question createquestion-title" type="text" name="title" onChange={handleInputChange} placeholder="Type Your Question Here" />
                    <Form.Control.Feedback className="feedback">Question Looks Good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" className="feedback">Question is Empty!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="label">Description:</Form.Label>
                    <Form.Control data-testid="question-input-description" required as="textarea" rows="10" name="description" onChange={handleInputChange} placeholder="Expand on Your Question Here" minLength="25" />
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
                                data-testid={"question-input-tag" + i} 
                                    name="TagName"
                                    placeholder="Enter Tag"
                                    value={x.tag}
                                    onChange={e => handleInputChangeTags(e, i)}
                                />
                                <a data-testid={"question-button-removetag" + i} className="badge badge-info p-1 mr-1 tags-button-remove"
                                    onClick={() => handleRemoveClick(i)}> <FontAwesomeIcon icon={faTimes} /></a>
                            </div>

                        );
                    })}
                    <a data-testid="question-button-plustag" className="badge badge-info p-2 mr-2 tags-button-plus" onClick={handleAddClick}>+</a>
                </Form.Group>
                <div>
                    <Button data-testid="question-button-submit" className="buttonSubmit float-right" type="submit">Submit Question</Button>
                </div>
                <p>{message}</p>
            </Form>
        </>
    );
}


export default QuestionForm