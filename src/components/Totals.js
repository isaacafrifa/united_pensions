import axios from "axios";
import { useContext, useEffect, useState } from "react";
import InvestmentContext from "../contexts/InvestmentContext";
import Preloader from "./preLoader";
import { BASE_URL } from "./urls";

const Totals = ({ clientId }) => {
    const [totalPrincipal, setTotalPrincipal] = useState(null)
    const [totalInterest, setTotalInterest] = useState(null)
    const [totalsError, setTotalsError] = useState(null);
    const [hasInvestments, setHasInvestments] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Get refresh from Context
    const { refresh, setRefresh } = useContext(InvestmentContext);

    //use axios call to refresh totals 
    const getTotals = () => {
        let endpoints = [
            `${BASE_URL}/clients/${clientId}/total-principal`,
            `${BASE_URL}/clients/${clientId}/total-interest`
        ];
        // if one of our promises fails, the entire request fail
        Promise.all(
            endpoints.map((endpoint) => axios.get(endpoint)))
            .then(([{ data: totalPrincipal }, { data: totalInterest }]) => {
            setTotalPrincipal(totalPrincipal)
            setTotalInterest(totalInterest)
            setHasInvestments(true)
        }).catch(error => {
            if (error.response.status === 404) {
                // 404 denotes client has no investments
                setHasInvestments(false)
            }
            else {
                setTotalsError(error)
            }
        }).then(function () {
            // always executed
            setIsLoading(false)
        });
    }

    /* When 'Create New Investment' is clicked, setRefresh(from context) is set to true and then triggered here. 
    Hence, this component is re-rendered
    */
    useEffect(() => {
        getTotals();
        // change context's refresh back to false
        setRefresh(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])



    if (isLoading) return <Preloader />

    else if (totalsError) return (<div>Error: {totalsError.message}</div>)

    else {
        return (
            <>
                {hasInvestments ? (
                    <div className="totals-column">
                        <div className="principal-card totals" //onClick={getTotals}
                        >
                            <div className="card-body">
                                <div className="small text-muted">total principal amount</div>
                                <h1>${totalPrincipal}</h1>
                                {/* <p className="small mt-4" >
                                Tap to refresh
                            </p> */}
                            </div>
                        </div>

                        <div className="interest-card totals">
                            <div className="card-body">
                                <div className="small text-muted">total interest</div>
                                <h1>${totalInterest}</h1>
                            </div>
                        </div>

                        <div className="investment-value-card totals">
                            <div className="card-body">
                                <div className="small text-muted">total investment value</div>
                                <h1>$270.00</h1>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="totals-column">
                        {/* has no investments */}
                        <div className="red-card totals">
                            <div className="card-body">
                                <div className="text-danger">Client has no investments</div>
                                <h1 className="mt-4 text-danger">$ 0.00</h1>
                            </div>
                        </div>
                    </div>
                )}
            </>

        );
    }

}

export default Totals;