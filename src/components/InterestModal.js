import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import '../assets/css/interestmodal.css'
import { Col, Container, Row } from "react-bootstrap";
import { BASE_URL } from "./urls";
import axios from "axios";
import { useEffect, useState } from "react";


const InterestModal = (props) => {
    const investmentId = props.investmentid;
    const [interest, setInterest] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const getLatestInterest = () => {
        setIsLoading(true)
        axios.get(`${BASE_URL}/investments/${investmentId}/latest-interest`)
            .then(response => {
                if (response.status === 200) {
                    setInterest(response.data)
                }
                else {
                    throw new Error("Unsuccessful Operation");
                }
            }).catch(function (error) {
                if (error.response.status === 417) {
                    // 417 denotes investment has been terminated
                    setError(error)
                }
                else {
                    setError(error);
                }
            }).then(function () {
                // always executed
                setIsLoading(false)
            });
    }

    // re-render only if investmentId changes
    useEffect(() => {
        if(investmentId!==0){
                getLatestInterest()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [investmentId])


    return (
        <div >
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Current interest amount of this investment as of today is</p>
                    {interest && (<p id="interest">${interest}</p>)}
                    {error && (<p>Error: {error.message}</p>)}
                </Modal.Body>
                <Modal.Footer>
                    <Container fluid>
                        <Row>
                            <Col><Button variant="danger" size="lg" id="modal-close-button" onClick={props.onHide}>{isLoading ? 'Loading' : 'Close'}</Button></Col>
                        </Row>
                    </Container>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default InterestModal;