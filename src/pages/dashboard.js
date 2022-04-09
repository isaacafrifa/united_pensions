import Navigation from "../components/navigation";
import '../assets/css/dashboard.css'
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";
const Dashboard = () => {
    const [totalInvestments, setTotalInvestments] = useState(null)
    const [totalClients, setTotalClients] = useState(null)
    const [error, setError] = useState(null);

    // make multiple api calls to backend
    const getBackendData = () => {
        let endpoints = [
            `${baseURL}/clients/total`,
            `${baseURL}/investments/total`
        ];
        // if one of our promises fails, the entire request fail
        Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{ data: clients }, { data: investments }]) => {
            setTotalClients(clients)
            setTotalInvestments(investments)
        }).catch(error => {
            console.log(error);
            setError(error);
        });
    }

    useEffect(() => {
        // invalid url will trigger an 404 error
        getBackendData();
    }, []);

    return (
        <div>
            <Navigation />
            <div className='container'>

                {error &&
                    <div style={{ margin: "2rem" }}>
                        <p>Error: {error.message}</p>
                    </div>}

                <section className="flex-container">
                    {(totalClients>=0) && (totalInvestments>=0) && (
                        <>
                            <div className="cards investments-card">
                            <div className="card-body">
                                <p className=" text-muted">total investments</p>
                                <h1>{totalInvestments}</h1>
                            </div>
                        </div>

                        <div className="cards client-card">
                            <div className="card-body">
                                <p className=" text-muted">total clients</p>
                                <h1>{totalClients}</h1>
                            </div>
                        </div>

                        </>
                    )}
                </section>

               
            </div>
        </div>
    );
}

export default Dashboard;