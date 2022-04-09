import { useEffect, useState } from "react";
import ClientCard from "../components/clientCard";
import Navigation from "../components/navigation";
import PreLoader from '../components/preLoader.js'
import axios from "axios";
import { BASE_URL } from "../components/urls";
import { Link } from "react-router-dom";

const AllClients = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);
    const [clients, setClients] = useState(null);


    const getAllClients = () => {
        setIsLoading(true)
        axios.get(`${BASE_URL}/clients`)
            .then(response => {
                if (response.status === 200) {
                    setClients(response.data.clients)
                    setIsLoading(false)
                }
                else {
                    // throw error to go to catch block
                    throw new Error("Unsuccessful Operation");
                }
            }).catch(function (error) {
                setError(error);
                setIsLoading(false)
            });
    }

    useEffect(() => {
        getAllClients();
    }, []);


    return (
        <div>
            <Navigation />

            <div className='container' style={{ marginTop: "1rem" }}>

                {error &&
                    <div style={{ margin: "2rem 0" }}>
                        <p>Error: {error.message}</p>
                    </div>}


                {isLoading && (<PreLoader />)}

                {/* Show empty list message */}
                {clients && (clients.length === 0) && (
                    <p className="text-muted">no clients yet!</p>
                )}

                {clients && (clients.length > 0) && (
                    <div className="flex-container">
                        {clients.map(
                            client => (
                                <div key={client.id}>
                                    <Link to={`/clients/${client.id}`}>
                                        <ClientCard clientName={client.name} salary={client.salary} rate={client.rate} />
                                    </Link>
                                </div>
                            )
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}

export default AllClients;