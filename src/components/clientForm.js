import React from 'react'
import { useState } from "react"
import { Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../assets/css/clientform.css'
import axios from "axios";


const ClientForm = () => {
    const [isLoading, setLoading] = useState(false);
    const BACKEND_URL = "http://localhost:8080/api/v1"
    const { register, handleSubmit,
        formState: { errors }, reset } = useForm();

    const toastifySuccess = () => {
        toast.success('Client Added!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            toastId: 'notifyToast'
        });
    };

    const toastifyFailure = () => {
        toast.error('Oops! Something went wrong', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            toastId: 'errorToast'
        });
    };

    const toastifyAlreadyExists = () => {
        toast.warn('Oops! Client already exists', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            toastId: 'errorToast'
        });
    };


    const onSubmit = (data) => {
        setLoading(true)

        const clientParams = {
            name: data.name,
            salary: data.salary,
            rate: data.rate
        };
        // sent object to backend
        const config = {
            method: "POST",
            url: BACKEND_URL + "/clients",
            data: clientParams
        };

        axios(config)
            .then(function (response) {
                if (response.status === 201) {
                    toastifySuccess();
                    reset();
                }
                else {
                    // throw error to go to catch block
                    throw new Error("Unsuccessful Operation");
                }
            })
            .catch(function (e) {
                // handle error
                if(e.response){
                    if (e.response.status === 409)  toastifyAlreadyExists();
                    else toastifyFailure();      
                }              
                else {
                    toastifyFailure();
                }
            })
        setLoading(false);
    };

    return (
       <>
            <h1>Add Client</h1>
            <Form id='client-form' onSubmit={handleSubmit(onSubmit)} noValidate>
                <Form.Group className="mb-3" controlId="form_name">
                    <Form.Label>Name<span className="asterisks">*</span></Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" required
                        {...register("name", {
                            required: true,
                            maxLength: 20
                        })}
                    />
                    <div className='form-error'>
                        {errors?.name?.type === "required" && <p>Name is required</p>}
                        {errors?.name?.type === "maxLength" && (<p>Name cannot exceed 20 characters</p>)}
                    </div>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="form_salary">
                            <Form.Label>Salary<span className="asterisks">*</span></Form.Label>
                            <Form.Control type="number" placeholder="Enter salary" name="salary" required
                                {...register("salary", {
                                    required: true,
                                    maxLength: 6,
                                    min: 1
                                })} />
                            <div className='form-error'>
                                {errors?.salary?.type === "min" && (<p>Salary should be more than 1</p>)}
                                {errors?.salary?.type === "required" && <p>Salary is required</p>}
                                {errors?.salary?.type === "maxLength" && (<p>Salary cannot exceed 6 numbers</p>)}
                            </div>
                        </Form.Group>
                    </Col>
                    <Col xs={4}>
                        <Form.Label>Rate<span className="asterisks">*</span></Form.Label>
                        <InputGroup>
                            <FormControl id="form_rate" placeholder="Rate" type="number" defaultValue={10} name="rate" required
                                {...register("rate", {
                                    required: true,
                                    min: 1,
                                    max: 99
                                })} />
                            <InputGroup.Text>%</InputGroup.Text>

                            <div className='form-error'>
                                {errors?.rate?.type === "required" && <p>Rate is required</p>}
                                {errors?.rate?.type === "min" && (<p>Rate should be more than 1</p>)}
                                {errors?.rate?.type === "max" && (<p>Rate should be less than 100</p>)}
                            </div>
                        </InputGroup>
                    </Col>
                </Row>

                <Button variant="secondary" type="submit" id="form_button">
                    {isLoading ? 'Submitting…' : 'Submit'}
                </Button>
            </Form>
            <ToastContainer />
</>
    );
}

export default ClientForm;
