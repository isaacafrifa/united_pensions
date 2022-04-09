import '../assets/css/investmentform.css'
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useContext, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { BASE_URL } from './urls';
import axios from 'axios';
import InvestmentContext from '../hooks/InvestmentContext';

const InvestmentForm = ({ clientProp }) => {
    const [isSending, setIsSending] = useState(false);
    const { register, handleSubmit,
        formState: { errors }, reset } = useForm();

    const { setRefresh } = useContext(InvestmentContext);

    // TOASTIFY MESSAGES
    const toastifySuccess = () => {
        toast.success('New Investment Created!', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            toastId: 'notifyToast'
        });
    };

    const toastifyFailure = () => {
        toast.error('Oops! Investment Not Created', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            toastId: 'errorToast'
        });
    };

    // FORM SUBMIT
    const onSubmit = (data) => {
        setIsSending(true)

        const params = {
            // --------------------- add investmentDTO PARAMS
            clientName: clientProp.name,
            clientSalary: clientProp.salary,
            clientRate: clientProp.rate,
            interestRate: data.interest_rate
            // ratePercentage: data.interest_rate
        };
        // sent object to backend
        let config = {
            method: "POST",
            url: BASE_URL + "/clients/" + clientProp.id + "/investments",
            data: params
        };

        axios(config)
            .then(function (response) {
                if (response.status === 201) {
                    toastifySuccess();
                    setRefresh(true)
                    reset();
                }
                else {
                    // throw error to go to catch block
                    throw new Error("Unsuccessful Operation");
                }
            })
            .catch(function (e) {
                // handle error
                if (e.response) {
                    if (e.response.status === 409) toastifyFailure();
                    else toastifyFailure();
                }
                else {
                    toastifyFailure();
                }
            })
        setIsSending(false);
    };


    return (
        <>
            <Form id='investment-form' onSubmit={handleSubmit(onSubmit)} noValidate>

                <div className='form-error'>
                    {!errors?.interest_rate && (<br />)}
                    {errors?.interest_rate?.type === "required" && <p>Rate is required</p>}
                    {errors?.interest_rate?.type === "min" && (<p>Rate should be more than 1</p>)}
                    {errors?.interest_rate?.type === "max" && (<p>Rate should be less than 100</p>)}
                </div>
                <InputGroup>
                    <FormControl id='interest_rate' placeholder="Enter interest rate*" type="number" name="interest_rate" required
                        {...register("interest_rate", {
                            required: true,
                            min: 1,
                            max: 100
                        })} />
                    <InputGroup.Text id='percent'>%</InputGroup.Text>
                </InputGroup>

                <Button variant="primary" size="lg" type="submit" id="form_button">
                    {isSending ? 'Submitting…' : 'Create New Investment'}
                </Button>

            </Form>
            <ToastContainer />
        </>
    );
}

export default InvestmentForm;