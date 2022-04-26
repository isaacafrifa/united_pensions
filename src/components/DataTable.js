import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { DatatableWrapper, Filter, Pagination, PaginationOptions, TableBody, TableHeader } from "react-bs-datatable";
import InvestmentContext from "../contexts/InvestmentContext";
import '../assets/css/datatable.css'

import Preloader from "./preLoader";
import { BASE_URL } from "./urls";
import InterestModal from "./InterestModal";

//headers
const STORY_HEADERS = [
    {
        prop: "createdOn",
        title: "Creation Date",
        isSortable: true,
        isFilterable: true
    },
    {
        prop: "principal",
        title: "Principal($)"
    },
    {
        prop: "interestRate",
        title: "Interest Rate(%)"
    },
    {
        prop: "maturedOn",
        title: "Maturity Date"
    }
];

const DataTable = ({ clientId }) => {
    //Modal state
    const [modalShow, setModalShow] = useState(false);
    const [investmentId, setInvestmentId] = useState(0);

    const [investmentsList, setInvestmentsList] = useState(null)
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasInvestments, setHasInvestments] = useState(true)
    // Get refresh from Context
    const { refresh, setRefresh } = useContext(InvestmentContext);

    const getClientInvestments = (id) => {
        // setIsLoading(true)
        axios.get(`${BASE_URL}/clients/${id}/investments`)
            .then(response => {
                if (response.status === 200) {
                    setInvestmentsList(response.data.investments)
                    setHasInvestments(true)
                    setIsLoaded(true)
                }
                else {
                    // throw error to go to catch block
                    throw new Error("Unsuccessful Operation");
                }
            }).catch(function (error) {
                if (error.response.status === 404) {
                    // 404 denotes client has no investments
                    setHasInvestments(false)
                }
                else {
                    setError(error);
                }
                setIsLoaded(true)
            });
    }

    /* When 'Create New Investment' button is clicked, setRefresh(from context) is set to true and then triggered here. 
    Hence, this component is re-rendered
    */
    useEffect(() => {
        getClientInvestments(clientId);
        // change context's refresh back to false
        setRefresh(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])


    const getLatestInterest = (row) => {
        // alert("You clicked on " + row.id)
        setInvestmentId(row.id)
        setModalShow(true)
    }

    return (
        <div>

            {error && (<div>Error: {error.message}</div>)}

            {!isLoaded && (<Preloader />)}

            {!hasInvestments && (
                <div>Client has no investments</div>
            )}

            {investmentsList && (
                <div>
                    <DatatableWrapper
                        body={investmentsList}
                        headers={STORY_HEADERS}
                        paginationOptionsProps={{
                            initialState: {
                                rowsPerPage: 10,
                                options: [5, 10, 15, 20]
                            }
                        }}>

                        <Row className="mb-4 p-2">
                            <Col
                                xs={12}
                                lg={4}
                                className="d-flex flex-col justify-content-end align-items-end">
                                <Filter placeholder="Filter by creation date..." />
                            </Col>
                            <Col
                                xs={12}
                                sm={6}
                                lg={4}
                                className="d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0">
                                <PaginationOptions />
                            </Col>
                            <Col
                                xs={12}
                                sm={6}
                                lg={4}
                                className="d-flex flex-col justify-content-end align-items-end">
                                <Pagination />
                            </Col>
                        </Row>
                        <Table className="table-hover table-bordered"
                        >
                            <TableHeader />
                            <TableBody onRowClick={getLatestInterest} classes={{
                                tr: "table-row"
                            }} />
                        </Table>

                    </DatatableWrapper>

                 {/* Interest Modal Component */}
                    <InterestModal
                        show={modalShow}
                        investmentid={investmentId}
                        onHide={() => {setModalShow(false)}}
                    />
                </div>
            )}
        </div>);
}

export default DataTable;