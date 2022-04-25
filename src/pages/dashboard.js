import Navigation from "../components/navigation";
import '../assets/css/dashboard.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from '../components/urls'
import Preloader from "../components/preLoader";

const Dashboard = () => {
    const [totalInvestments, setTotalInvestments] = useState(null)
    const [totalClients, setTotalClients] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);

    // make multiple api calls to backend
    const getBackendData = () => {
        setIsLoading(true)
        let endpoints = [
            `${BASE_URL}/clients/total`,
            `${BASE_URL}/investments/total`
        ];
        // if one of our promises fails, the entire request fail
        Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{ data: clients }, { data: investments }]) => {
            setTotalClients(clients)
            setTotalInvestments(investments)
        }).catch(error => {
            console.log(error);
            setError(error);
        }).then(function () {
            // always executed
                setIsLoading(false)     
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

                {isLoading && (<Preloader />)}

                <section className="flex-container">
                    {(totalClients >= 0) && (totalInvestments >= 0) && (
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