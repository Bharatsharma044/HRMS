import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import { BASE_API_URL } from '../../../lib/constants';


const ModalBox = ({ isOpen, onRequestClose, helpcenterId }) => {
    const [message, setMessage] = useState('');
    const [data, setData] = useState([])
    useEffect(() => {

        if (isOpen) {
            console.log('model open', helpcenterId)
            // Fetch data for the given helpcenterId
            if (helpcenterId) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${BASE_API_URL}helpcenter/getTicketById?id=${helpcenterId}`);
                        setData(response.data.data)
                        console.log('data', data)

                    } catch (error) {
                        console.log('model open error')
                        console.error('Error fetching helpcenter data:', error);
                    }
                };

                fetchData();
            }
        }
    }, [isOpen]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("data", data);
        
        try {
            const response = await axios.put(`${BASE_API_URL}helpcenter/update`, data);
    
            if (response && response.data && response.data.msg) {
                setMessage(response.data.msg);
            } else {
                setMessage("No message returned from the server");
            }
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while updating the helpcenter');
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
                                <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Edit helpcenter</h4>

                            </div>
                            <div class="row">


                            <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_ticket_id" value={data.helpcenter_ticket_id} onChange={handleInputChange} class="form-control" placeholder="helpcenter ID" />
                                                                    {/* {errors.helpcenter_ticket_id && <span className="error" style={{ color: 'red' }}>{errors.helpcenter_ticket_id}</span>} */}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_employee_id" value={data.helpcenter_employee_id} onChange={handleInputChange} class="form-control" placeholder="Employee Id" />
                                                                    {/* {errors.helpcenter_employee_id && <span className="error" style={{ color: 'red' }}>{errors.helpcenter_employee_id}</span>} */}
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_employee_code" value={data.helpcenter_employee_code} onChange={handleInputChange} class="form-control" placeholder="helpcenter Amount" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_ticket_description" value={data.helpcenter_ticket_description} onChange={handleInputChange} class="form-control" placeholder="helpcenter Voucher" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_ticket_priority" value={data.helpcenter_ticket_priority} onChange={handleInputChange} class="form-control" placeholder="helpcenter Remark" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_ticket_department" value={data.helpcenter_ticket_department} onChange={handleInputChange} class="form-control" placeholder="helpcenter By Cash" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_ticket_created_date" value={data.helpcenter_ticket_created_date} onChange={handleInputChange} class="form-control" placeholder="helpcenter_ticket_created_date" />
                                                                </div>
                                                                <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_ticket_status" value={data.helpcenter_ticket_status} onChange={handleInputChange} class="form-control" placeholder="helpcenter_ticket_status" />
                                                                </div>
                                                                {/* <div class="mb-3 col-md-6" style={{ textAlign: 'left', display: 'flex', flexDirection: 'row', justifyContent: "space-between" , width: '50%'}}>
                                                                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Date Of helpcenter</label>
                                                                    <input type="date" name="helpcenter_ticket_solved_date" value={data.helpcenter_ticket_solved_date} onChange={handleInputChange} class="form-control" style={{ width: 'auto' }}/>
                                                                </div> */}
                                                                {/* <div class="mb-3 col-md-6">
                                                                    <input type="text" name="helpcenter_ticket_solved_by" value={data.helpcenter_ticket_solved_by} onChange={handleInputChange} class="form-control" placeholder="helpcenter_ticket_solved_by" />
                                                                    {errors.helpcenter_ticket_solved_by && <span className="error" style={{ color: 'red' }}>{errors.helpcenter_ticket_solved_by}</span>}
                                                                </div> */}


                            </div>
                            <div class="col-md-12">
                                <button type="submit" >EDit here</button>
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






