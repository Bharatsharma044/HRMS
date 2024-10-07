import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import { BASE_API_URL } from '../../../lib/constants.js';

const ModalBox = ({ isOpen, onRequestClose, consultancyId }) => {
    const [message, setMessage] = useState('');
    const [data, setdata] = useState([])
    useEffect(() => {
        if (isOpen && consultancyId) {
            const fetchdata = async () => {
                try {
                    const response = await axios.get(`${BASE_API_URL}consultancy/getbyid?id=${consultancyId}`);
                    setdata(response.data.data);
                    console.log('Fetched data', response.data.data); // Log fetched data, not the state.
                    setMessage(response.data.msg);
                } catch (error) {
                    console.error('Error fetching consultancy data:', error);
                }
            };
    
            fetchdata();
        }
    }, [isOpen, consultancyId]);
    

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
            const response = await axios.put(`${BASE_API_URL}consultancy/update`, data);
            if (response && response.data && response.data.msg) {
                setMessage(response.data.msg);
            } else {
                setMessage("No message returned from the server");
            }
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while updating the consultancy');
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
                                                                    <input type="String" name="consultancy_address" value={data.consultancy_address} onChange={handleInputChange} class="form-control" placeholder="Consultancy Address" />
                                                                    {/* {errors.consultancy_address && <span className="error" style={{ color: 'red' }}>{errors.consultancy_address}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="consultancy_name" value={data.consultancy_name} onChange={handleInputChange} class="form-control" placeholder="consultancy name" />
                                                                    {/* {errors.consultancy_name && <span className="error" style={{ color: 'red' }}>{errors.consultancy_name}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="email" name="consultancy_email" value={data.consultancy_email} onChange={handleInputChange} class="form-control" placeholder="consultancy Email" />
                                                                 </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="consultancy_website_url" value={data.consultancy_website_url} onChange={handleInputChange} class="form-control" placeholder="consultancy website url" />
                                                                 </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="number" name="consultancy_mobile" value={data.consultancy_mobile} onChange={handleInputChange} class="form-control" placeholder="consultancy mobile" />
                                                                    {/* {errors.consultancy_mobile && <span className="error" style={{ color: 'red' }}>{errors.consultancy_mobile}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="number" name="consultancy_alternate_mobile" value={data.consultancy_alternate_mobile} onChange={handleInputChange} class="form-control" placeholder="consultancy alternate mobile" />
                                                                    {/* {errors.consultancy_alternate_mobile && <span className="error" style={{ color: 'red' }}>{errors.consultancy_alternate_mobile}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="consultancy_city" value={data.consultancy_city} onChange={handleInputChange} class="form-control" placeholder="consultancy City" />
                                                                    {/* {errors.consultancy_city && <span className="error" style={{ color: 'red' }}>{errors.consultancy_city}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="consultancy_state" value={data.consultancy_state} onChange={handleInputChange} class="form-control" placeholder="consultancy state" />
                                                                    {/* {errors.consultancy_state && <span className="error" style={{ color: 'red' }}>{errors.consultancy_state}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="contract_agreement" value={data.contract_agreement} onChange={handleInputChange} class="form-control" placeholder="contract Agreement" />
                                                                    {/* {errors.contract_agreement && <span className="error" style={{ color: 'red' }}>{errors.contract_agreement}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="contract_person_name" value={data.contract_person_name} onChange={handleInputChange} class="form-control" placeholder="contract person name" />
                                                                    {/* {errors.contract_person_name && <span className="error" style={{ color: 'red' }}>{errors.contract_person_name}</span>} */}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="contract_linkedIn_Profile" value={data.contract_linkedIn_Profile} onChange={handleInputChange} class="form-control" placeholder="contract_linkedIn_Profile" />
                                                                    {/* {errors.contract_linkedIn_Profile && <span className="error" style={{ color: 'red' }}>{errors.contract_linkedIn_Profile}</span>} */}
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










