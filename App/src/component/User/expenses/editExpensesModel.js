import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import { BASE_API_URL } from '../../../lib/constants.js';

const ModalBox = ({ isOpen, onRequestClose, ExpensesId }) => {
    const [message, setMessage] = useState('');
    const [data, setdata] = useState([])
    useEffect(() => {
        if (isOpen && ExpensesId) {
            const fetchdata = async () => {
                try {
                    const response = await axios.get(`${BASE_API_URL}expenses/getById?id=${ExpensesId}`);
                    setdata(response.data.data);
                    console.log('Fetched data', response.data.data); // Log fetched data, not the state.
                    setMessage(response.data.msg);
                } catch (error) {
                    console.error('Error fetching expenses data:', error);
                }
            };
    
            fetchdata();
        }
    }, [isOpen, ExpensesId]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setdata((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("data", data);
        try {
            const response = await axios.put(`${BASE_API_URL}expenses/update`, data);
            if (response && response.data && response.data.msg) {
                setMessage(response.data.msg);
            } else {
                setMessage("No message returned from the server");
            }
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while updating the expenses');
        }
    };
   

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            style={{
                overlay: {

                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    width: '90%',
                    height: '90%',
                    margin: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    padding: '20px'
                }
            }}
        >
            <button onClick={onRequestClose}>Close</button>

            <div class="row">
                <div class="col-md-6 offset-md-3">
                    <div class="signup-form">
                        <form onSubmit={handleSubmit} class="mt-5 border p-4 bg-light shadow">
                            <div style={{ textAlign: 'center' }}>
                                <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Edit Your profile</h4>

                            </div>
                            <div class="row">
                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="transaction_id" value={data.transaction_id} onChange={handleInputChange} class="form-control" placeholder="Transaction Id" />
                                                                    {/* {errors.transaction_id && <span className="error" style={{ color: 'red' }}>{errors.transaction_id}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="expenses_purpose" value={data.expenses_purpose} onChange={handleInputChange} class="form-control" placeholder="Expenses Purpose" />
                                                                    {/* {errors.expenses_purpose && <span className="error" style={{ color: 'red' }}>{errors.expenses_purpose}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="Number" name="expenses_bill" value={data.expenses_bill} onChange={handleInputChange} class="form-control" placeholder="Expenses Bill" />
                                                                    {/* {errors.expenses_bill && <span className="error" style={{ color: 'red' }}>{errors.expenses_bill}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="expenses_amount" value={data.expenses_amount} onChange={handleInputChange} class="form-control" placeholder="Expenses Amount" />
                                                                    {/* {errors.expenses_amount && <span className="error" style={{ color: 'red' }}>{errors.expenses_amount}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="expenses_voucher" value={data.expenses_voucher} onChange={handleInputChange} class="form-control" placeholder="Expenses Voucher" />
                                                                    {/* {errors.expenses_voucher && <span className="error" style={{ color: 'red' }}>{errors.expenses_voucher}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="expenses_remark" value={data.expenses_remark} onChange={handleInputChange} class="form-control" placeholder="Expenses Remark" />
                                                                    {/* {errors.expenses_remark && <span className="error" style={{ color: 'red' }}>{errors.expenses_remark}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="expenses_by_cash" value={data.expenses_by_cash} onChange={handleInputChange} class="form-control" placeholder="Expenses By Cash" />
                                                                    {/* {errors.expenses_by_cash && <span className="error" style={{ color: 'red' }}>{errors.expenses_by_cash}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="expenses_by_cheque" value={data.expenses_by_cheque} onChange={handleInputChange} class="form-control" placeholder="Expenses By cheque" />
                                                                    {/* {errors.expenses_by_cheque && <span className="error" style={{ color: 'red' }}>{errors.expenses_by_cheque}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="expenses_cash_recieved_by" value={data.expenses_cash_recieved_by} onChange={handleInputChange} class="form-control" placeholder="Expenses Cash Received By" />
                                                                    {/* {errors.expenses_cash_recieved_by && <span className="error" style={{ color: 'red' }}>{errors.expenses_cash_recieved_by}</span>} */}
                                                                </div>
                                        
                            </div>
                            <div class="col-md-12">
                                <button type="submit">Edit here</button>
                            </div>
                            <span style={{ color: 'green' }}>{message && <p>{message}</p>}</span>
                        </form>


                    </div>
                </div>
            </div>
        </Modal>
    );
};


export default ModalBox;










