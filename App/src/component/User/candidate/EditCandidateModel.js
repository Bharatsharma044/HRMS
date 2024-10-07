import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
// import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css';
import Modal from 'react-modal';
import { BASE_API_URL } from '../../../lib/constants.js';


const ModalBox = ({ isOpen, onRequestClose, candidateId }) => {

    const [data, setData] = useState([])
    useEffect(() => {

        if (isOpen) {
            console.log('model open', candidateId)
            // Fetch data for the given candidateId
            if (candidateId) {
                const fetchData = async () => {
                    try {
                        const response = await axios.get(`${BASE_API_URL}candidate/getById?_id=${candidateId}`);
                        setData(response.data.data)
                        console.log('data', data)

                    } catch (error) {
                        console.log('model open error')
                        console.error('Error fetching candidate data:', error);
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

    const handleSubmit = (e) => {
        console.log("data", data)
        e.preventDefault();
        // Handle form submission here
        try {
            const response = axios.put(`${BASE_API_URL}candidate/update`, data);
            console.log(response.data); // Handle the response as needed
        } catch (error) {
            console.error('Error:', error);
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
                                <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Edit Your Candidate Data </h4>

                            </div>
                            <div class="row">
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="candidate_first_name" value={data.candidate_first_name} onChange={handleInputChange} class="form-control" placeholder="First Name" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="candidate_last_name" value={data.candidate_last_name} onChange={handleInputChange} class="form-control" placeholder="Last Name" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="candidate_mobile" value={data.candidate_mobile} onChange={handleInputChange} class="form-control" placeholder="Mobile Number" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="candidate_alternate_mobile" value={data.candidate_alternate_mobile} onChange={handleInputChange} class="form-control" placeholder="Alternate Mobile Number" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="email" name="candidate_email" value={data.candidate_email} onChange={handleInputChange} class="form-control" placeholder="Email" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="candidate_password" value={data.candidate_password} onChange={handleInputChange} class="form-control" placeholder="Password" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="candidate_address" value={data.candidate_address} onChange={handleInputChange} class="form-control" placeholder="Address" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="candidate_city" value={data.candidate_city} onChange={handleInputChange} class="form-control" placeholder="City" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="candidate_state" value={data.candidate_state} onChange={handleInputChange} class="form-control" placeholder="State" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="candidate_other_info" value={data.candidate_other_info} onChange={handleInputChange} class="form-control" placeholder="Employee Other Info" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="date" name="candidate_dob" value={data.candidate_dob} onChange={handleInputChange} class="form-control" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="date" name="candidate_doj" value={data.candidate_doj} onChange={handleInputChange} class="form-control" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="candidate_skills" value={data.candidate_skills} onChange={handleInputChange} class="form-control" placeholder="Skills" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="candidate_experience" value={data.candidate_experience} onChange={handleInputChange} class="form-control" placeholder="Experience" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="employee_resume" value={data.candidate_resume} onChange={handleInputChange} class="form-control" placeholder="Resume" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="employee_id_proof" value={data.employee_id_proof} onChange={handleInputChange} class="form-control" placeholder="Id Proof" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="employee_permanant_address_proof" value={data.employee_permanant_address_proof} onChange={handleInputChange} class="form-control" placeholder="Permanant Address Proof" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="employee_local_address_proof" value={data.employee_local_address_proof} onChange={handleInputChange} class="form-control" placeholder="Local Address Proof" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="employee_reference_one_name" value={data.employee_reference_one_name} onChange={handleInputChange} class="form-control" placeholder="Reference One Name" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="employee_reference_one_mobile" value={data.employee_reference_one_mobile} onChange={handleInputChange} class="form-control" placeholder="Reference One Mobile" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="employee_reference_two_name" value={data.employee_reference_two_name} onChange={handleInputChange} class="form-control" placeholder="Reference Two Name" />
                                </div>
                                <div class="mb-3 col-md-6">
                                    <input type="text" name="employee_reference_two_mobile" value={data.employee_reference_two_mobile} onChange={handleInputChange} class="form-control" placeholder="Reference Two Mobile" />
                                </div>
                            </div>
                            <div class="col-md-12">
                                <button type="submit">EDit here</button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalBox;


// export default ModalBox;Id }) => {

//     const [data, setData] = useState([])
//     useEffect(() => {

//         if (isOpen) {
//             console.log('model open', employeeId)
//             // Fetch data for the given employeeId
//             if (employeeId) {
//                 const fetchData = async () => {
//                     try {
//                         const response = await axios.get(`${BASE_API_URL}employee/getById?_id=${employeeId}`);
//                         setData(response.data.data)
//                         console.log('data', data)

//                     } catch (error) {
//                         console.log('model open error')
//                         console.error('Error fetching employee data:', error);
//                     }
//                 };

//                 fetchData();
//             }
//         }
//     }, [isOpen]);


//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setData((prevState) => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         console.log("data", data)
//         e.preventDefault();
//         // Handle form submission here
//         try {
//             const response = axios.put(`${BASE_API_URL}employee/update`, data);
//             console.log(response.data); // Handle the response as needed
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return (
//         <Modal
//             isOpen={isOpen}
//             onRequestClose={onRequestClose}
//             ariaHideApp={false}
//             style={{
//                 overlay: {

//                     backgroundColor: 'rgba(0, 0, 0, 0.5)'
//                 },
//                 content: {
//                     width: '90%',
//                     height: '90%',
//                     margin: 'auto',
//                     borderRadius: '8px',
//                     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
//                     padding: '20px'
//                 }
//             }}
//         >
//             <button onClick={onRequestClose}>Close</button>

//             <div class="row">
//                 <div class="col-md-6 offset-md-3">
//                     <div class="signup-form">
//                         <form onSubmit={handleSubmit} class="mt-5 border p-4 bg-light shadow">
//                             <div style={{ textAlign: 'center' }}>
//                                 <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Edit Your profile</h4>

//                             </div>
//                             <div class="row">
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_first_name" value={data.employee_first_name} onChange={handleInputChange} class="form-control" placeholder="First Name" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_last_name" value={data.employee_last_name} onChange={handleInputChange} class="form-control" placeholder="Last Name" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_mobile" value={data.employee_mobile} onChange={handleInputChange} class="form-control" placeholder="Mobile Number" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_alternate_mobile" value={data.employee_alternate_mobile} onChange={handleInputChange} class="form-control" placeholder="Alternate Mobile Number" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="email" name="employee_email" value={data.employee_email} onChange={handleInputChange} class="form-control" placeholder="Email" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_password" value={data.employee_password} onChange={handleInputChange} class="form-control" placeholder="Password" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_address" value={data.employee_address} onChange={handleInputChange} class="form-control" placeholder="Address" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_city" value={data.employee_city} onChange={handleInputChange} class="form-control" placeholder="City" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_state" value={data.employee_state} onChange={handleInputChange} class="form-control" placeholder="State" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_other_info" value={data.employee_other_info} onChange={handleInputChange} class="form-control" placeholder="Employee Other Info" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="date" name="employee_dob" value={data.employee_dob} onChange={handleInputChange} class="form-control" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="date" name="employee_doj" value={data.employee_doj} onChange={handleInputChange} class="form-control" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_skills" value={data.employee_skills} onChange={handleInputChange} class="form-control" placeholder="Skills" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_experience" value={data.employee_experience} onChange={handleInputChange} class="form-control" placeholder="Experience" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_resume" value={data.employee_resume} onChange={handleInputChange} class="form-control" placeholder="Resume" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_id_proof" value={data.employee_id_proof} onChange={handleInputChange} class="form-control" placeholder="Id Proof" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_permanant_address_proof" value={data.employee_permanant_address_proof} onChange={handleInputChange} class="form-control" placeholder="Permanant Address Proof" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_local_address_proof" value={data.employee_local_address_proof} onChange={handleInputChange} class="form-control" placeholder="Local Address Proof" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_reference_one_name" value={data.employee_reference_one_name} onChange={handleInputChange} class="form-control" placeholder="Reference One Name" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_reference_one_mobile" value={data.employee_reference_one_mobile} onChange={handleInputChange} class="form-control" placeholder="Reference One Mobile" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_reference_two_name" value={data.employee_reference_two_name} onChange={handleInputChange} class="form-control" placeholder="Reference Two Name" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_reference_two_mobile" value={data.employee_reference_two_mobile} onChange={handleInputChange} class="form-control" placeholder="Reference Two Mobile" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_info1" value={data.employee_info1} onChange={handleInputChange} class="form-control" placeholder="info 1" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_info2" value={data.employee_info2} onChange={handleInputChange} class="form-control" placeholder="info 2" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_info3" value={data.employee_info3} onChange={handleInputChange} class="form-control" placeholder="info 3" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_info4" value={data.employee_info4} onChange={handleInputChange} class="form-control" placeholder="info 4" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_info5" value={data.employee_info5} onChange={handleInputChange} class="form-control" placeholder="info 5" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_info6" value={data.employee_info6} onChange={handleInputChange} class="form-control" placeholder="info 6" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_info7" value={data.employee_info7} onChange={handleInputChange} class="form-control" placeholder="info 7" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_info8" value={data.employee_info8} onChange={handleInputChange} class="form-control" placeholder="info 8" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_info9" value={data.employee_info9} onChange={handleInputChange} class="form-control" placeholder="info 9" />
//                                 </div>
//                                 <div class="mb-3 col-md-6">
//                                     <input type="text" name="employee_info10" value={data.employee_info10} onChange={handleInputChange} class="form-control" placeholder="info 10" />
//                                 </div>
//                             </div>
//                             <div class="col-md-12">
//                                 <button type="submit">EDit here</button>
//                             </div>
//                         </form>


//                     </div>
//                 </div>
//             </div>
//         </Modal>
//     );
// };


// export default ModalBox;




















// // EditCandidateModel.js
// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios'; 
// import Modal from 'react-modal';
// import { BASE_API_URL } from '../../../lib/constants.js';

// const EditCandidateModal = ({ isOpen, onRequestClose, candidateId }) => {

//     const [data, setData] = useState({});

//     useEffect(() => {
//         if (isOpen && candidateId) {
//             const fetchCandidateData = async () => {
//                 try {
//                     const response = await axios.get(`${BASE_API_URL}candidate/getById?_id=${candidateId}`);
//                     setData(response.data.data);
//                 } catch (error) {
//                     console.error('Error fetching candidate data:', error);
//                 }
//             };
//             fetchCandidateData();
//         }
//     }, [isOpen, candidateId]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setData((prevState) => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.put(`${BASE_API_URL}candidate/update`, data);
//             console.log('Candidate updated:', response.data);
//         } catch (error) {
//             console.error('Error updating candidate:', error);
//         }
//     };

//     return (
//         <Modal
//             isOpen={isOpen}
//             onRequestClose={onRequestClose}
//             ariaHideApp={false}
//             style={{
//                 overlay: {
//                     backgroundColor: 'rgba(0, 0, 0, 0.5)'
//                 },
//                 content: {
//                     top: '50%',
//                     left: '50%',
//                     right: 'auto',
//                     bottom: 'auto',
//                     marginRight: '-50%',
//                     transform: 'translate(-50%, -50%)'
//                 }
//             }}
//         >
//             <div className="container">
//                 <h2>Edit Candidate</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="row">
//                         <div className="mb-3 col-md-6">
//                             <input
//                                 type="text"
//                                 name="candidate_first_name"
//                                 value={data.candidate_first_name || ''}
//                                 onChange={handleInputChange}
//                                 className="form-control"
//                                 placeholder="First Name"
//                             />
//                         </div>
//                         <div className="mb-3 col-md-6">
//                             <input
//                                 type="text"
//                                 name="candidate_last_name"
//                                 value={data.candidate_last_name || ''}
//                                 onChange={handleInputChange}
//                                 className="form-control"
//                                 placeholder="Last Name"
//                             />
//                         </div>
//                         <div className="mb-3 col-md-6">
//                             <input
//                                 type="text"
//                                 name="candidate_mobile"
//                                 value={data.candidate_mobile || ''}
//                                 onChange={handleInputChange}
//                                 className="form-control"
//                                 placeholder="Mobile"
//                             />
//                         </div>
//                         <div className="mb-3 col-md-6">
//                             <input
//                                 type="email"
//                                 name="candidate_email"
//                                 value={data.candidate_email || ''}
//                                 onChange={handleInputChange}
//                                 className="form-control"
//                                 placeholder="Email"
//                             />
//                         </div>
//                         <div className="mb-3 col-md-6">
//                             <input
//                                 type="text"
//                                 name="candidate_skills"
//                                 value={data.candidate_skills || ''}
//                                 onChange={handleInputChange}
//                                 className="form-control"
//                                 placeholder="Skills"
//                             />
//                         </div>
//                         <div className="mb-3 col-md-6">
//                             <input
//                                 type="text"
//                                 name="candidate_experience"
//                                 value={data.candidate_experience || ''}
//                                 onChange={handleInputChange}
//                                 className="form-control"
//                                 placeholder="Experience"
//                             />
//                         </div>
//                     </div>
//                     <div className="col-md-12">
//                         <button type="submit" className="btn btn-primary">Update Candidate</button>
//                     </div>
//                 </form>
//             </div>
//         </Modal>
//     );
// };

// export default EditCandidateModal;
