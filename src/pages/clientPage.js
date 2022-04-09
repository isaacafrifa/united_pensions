import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import '../assets/css/clientpage.css'
import DataTable from "../components/DataTable";
import InvestmentForm from "../components/InvestmentForm";
import Navigation from "../components/navigation";
import Preloader from "../components/preLoader";
import Totals from "../components/Totals";
import { BASE_URL } from "../components/urls";

const ClientPage = () => {
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [client, setClient] = useState(null)
    const [clientError, setClientError] = useState(null);


    const getClientInfo = (clientId) => {
        // setIsLoading(true)
        axios.get(`${BASE_URL}/clients/${clientId}`)
            .then(response => {
                if (response.status === 200) {
                    setClient(response.data)
                    setIsLoading(false)
                }
                else {
                    // throw error to go to catch block
                    throw new Error("Unsuccessful Operation");
                }
            }).catch(function (error) {
                setClientError(error);
                setIsLoading(false)
            });
    }


    useEffect(() => {
        getClientInfo(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div id="client-page">
            <Navigation />

            {clientError &&
                <div style={{ margin: "2rem 0" }}>
                    <p>Error: {clientError.message}</p>
                </div>}

            {isLoading && (<Preloader />)}

            {client && (
                <section className="client-info">
                    <Row>
                        <Col md={{ span: 3, offset: 2 }} className="profile-column">
                            <div className="profile-card">
                                <div className="profile-card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                        <div className="mt-3">
                                            <h1>{client.name}</h1>
                                            <p className="text-secondary mb-1">Salary: <b>${client.salary}</b></p>
                                            <p className="text-muted font-size-sm">percentage: <b>{client.rate}%</b></p>
                                            {/* Create New Investment Form */}
                                            <InvestmentForm clientProp={client} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        <Col md={{ span: 5, offset: 0 }}>
                            {/* Totals - Principals, Interests and Investments */}
                            <Totals clientId={id} />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={{ span: 10, offset: 1 }}>
                            <div className="investments-block">
                                <h1><b>My Investments</b></h1>
                                <DataTable clientId={id} />
                            </div>
                        </Col>
                    </Row>

                </section>
            )}
        </div>
    );
}

export default ClientPage;