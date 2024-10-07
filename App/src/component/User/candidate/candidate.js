import React, { useState, useEffect } from 'react';
import './Candidate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ModalBox from './EditCandidateModel.js';
// import Nav from '../../component/Navbar/navbar.js';
import Nav from '../../Navbar/navbar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';
import { faEdit, faTrashAlt, faTrash, faSortUp, faSortDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../Footer/footer.js';
import { BASE_API_URL } from '../../../lib/constants.js';
import { Link } from 'react-router-dom';

const CandidateModule = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tableData, settableData] = useState([]);
    const [togle, settogle] = useState([true]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCandidateId, setSelectedCandidateId] = useState(null);
    const [message, setMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('ascending');
    const [ids, setId] = useState([]);
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected); // Update the current page when pagination changes
    };

    const itemsPerPage = 5; // Number of items to display per page
    const offset = currentPage * itemsPerPage;
    const pageCount = tableData?.length ? Math.ceil(tableData.length / itemsPerPage) : 0;
    const currentItems = tableData?.length ? tableData.slice(offset, offset + itemsPerPage) : [];
    // const currentItems = tableData.slice(offset, offset + itemsPerPage);

    // const [data, setData] = useState(formData);
    const openModal = (candidateId) => {
        console.log('candidateId', candidateId)
        setModalIsOpen(true);
        setSelectedCandidateId(candidateId);

    };
    const handleSort = (column) => {
        if (column === sortColumn) {
            // If the same column is clicked again, reverse the sorting direction
            setSortDirection(sortDirection === 'ascending' ? 'descending' : 'ascending');
        } else {
            // If a new column is clicked, set it as the sorting column and reset the direction
            setSortColumn(column);
            setSortDirection('ascending');
        }
    };
    const sortedData = () => {
        if (sortColumn) {
            const sorted = [...tableData].sort((a, b) => {
                const valueA = a[sortColumn];
                const valueB = b[sortColumn];
                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    // Case-insensitive string comparison
                    return sortDirection === 'ascending' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
                } else {
                    // Numerical or other comparison
                    return sortDirection === 'ascending' ? valueA - valueB : valueB - valueA;
                }
            });
            return sortDirection === 'ascending' ? sorted : sorted.reverse();
        }
        return tableData; // Return original data if no sorting column is selected
    };


    const handleCheckboxChange = (e, id) => {
        // If the checkbox is checked, add the ID to the list of selected IDs
        if (e.target.checked) {
            setId(prevIds => [...prevIds, id]);
        } else {
            // If the checkbox is unchecked, remove the ID from the list of selected IDs
            setId(prevIds => prevIds.filter(prevId => prevId !== id));
        }
    };
    const Deletemulti = async () => {
        const data = {
            "ids": ids
        };
        console.log('ids', data);

        try {
            const response = await axios.delete(`${BASE_API_URL}candidate/multi-delete`, {
                data: data // IDs ko data body mein bhejna
            });
            console.log(response.data); // Response ke saath kuch karne ke liye
            settogle(!togle);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const validateForm = () => {
        let isValid = true;
        const newErrors = {};
        if (!formData.candidate_first_name.trim()) {
            newErrors.candidate_first_name = "This is a required field";
            isValid = false;
        }

        if (!formData.candidate_last_name.trim()) {
            newErrors.candidate_last_name = "This is a required field";
            isValid = false;
        }

        if (!formData.candidate_mobile.trim()) {
            newErrors.candidate_mobile = "This is a required field";
            isValid = false;
        }

        if (!formData.candidate_email.trim()) {
            newErrors.candidate_email = "This is a required field";
            isValid = false;
        }

        if (!formData.candidate_skills.trim()) {
            newErrors.candidate_skills = "This is a required field";
            isValid = false;
        }

        if (!formData.candidate_experience.trim()) {
            newErrors.candidate_experience = "This is a required field";
            isValid = false;
        }

        if (!formData.candidate_expected_salary.trim()) {
            newErrors.candidate_expected_salary = "This is a required field";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };


    const closeModal = () => {
        settogle(!togle)
        setModalIsOpen(false);
    };
    const [errors, setErrors] = useState({
        candidate_id: "",
        candidate_first_name: "",
        candidate_last_name: "",
        candidate_mobile: "",
        candidate_email: "",
        candidate_skills: "",
        candidate_experience: "",
        candidate_expected_salary: "",

    });
    const [formData, setFormData] = useState({
        candidate_id: "",
        candidate_first_name: "",
        candidate_last_name: "",
        candidate_mobile: "",
        candidate_alternate_mobile: '',
        candidate_email: "",
        candidate_skills: "",
        candidate_experience: "",
        candidate_expected_salary: "",
        candidate_skype: '',
        candidate_linkedIn_profile: '',
        candidate_expected_joining_date: '',
        candidate_marrital_status: '',
        interview_rounds: '',
        candidate_selection_status: '',
        candidate_feedback: '',
        source_of_candidate: '',
        candidate_address: '',
        candidate_document_proof: '',
        tenth_percentage: '',
        twelfth_percentage: '',
        graduationPercentage: '',
        postGraduationPercentage: '',
        profile: '',
        createdAt: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}candidate/list`);

                console.log(response); // Handle the response as needed
                settableData(response.data.data)
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [togle]);

    const openPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission here, for example, send data to backend or perform validation
        console.log('', formData);
        if (validateForm()) {
            try {
                const response = await axios.post(`${BASE_API_URL}candidate/signup`, formData);
                settogle(!togle)
                console.log(response.data); // Handle the response as needed
                setMessage(response.data.msg);


            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log("Form Validation failed");

        }
    };
    const DeleteData = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this item?');

        // Check if the user confirmed
        if (isConfirmed) {
            // Delete logic here
            try {
                console.log('id', id)
                const response = axios.delete(`${BASE_API_URL}candidate/delete/?_id=${id}`)

                console.log(response.data); // Handle the response as needed
                settogle(!togle)

            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            // User canceled the action
            console.log('Deletion canceled');
        } console.log('', id)

    }

    return (
        <>
            <div >
                <Nav />
                <div style={{ backgroundColor: '#28769a' }}>
                    <h1 className='headerData'>WELCOME TO CANDIDATE PAGE</h1>
                </div>
                <div >
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body text-center">

                                    <div>
                                        <button className="backButton" onClick={openPopup}>
                                            Add &nbsp;<FontAwesomeIcon icon={faPlusCircle} />
                                        </button>
                                    </div>
                                    <div> <span> <button className="multiDeleteButton" onClick={() => { Deletemulti() }}    >
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button></span></div>
                                    {isOpen && (
                                        <div>
                                            <div>
                                                <div>
                                                    <div class="row">
                                                        <div class="col-md-6 offset-md-3">
                                                            <div class="signup-form">


                                                                <form onSubmit={handleSubmit} class="mt-5 border p-4 bg-light shadow">
                                                                    <div style={{ textAlign: 'center' }}>
                                                                        <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Add New Candidate</h4>
                                                                        <button style={{ float: 'right', fontSize: '20px', backgroundColor: '#ddc7c7', border: 'none' }} className="close" onClick={closePopup}>&times;</button>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="candidate_id" value={formData.candidate_id} onChange={handleInputChange} class="form-control" placeholder="Candidate Id" />
                                                                            {errors.candidate_id && <span className="error" style={{ color: 'red' }}>{errors.candidate_id}</span>}
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="candidate_first_name" value={formData.candidate_first_name} onChange={handleInputChange} class="form-control" placeholder="First Name" />
                                                                            {errors.candidate_first_name && <span className="error" style={{ color: 'red' }}>{errors.candidate_first_name}</span>}
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="candidate_last_name" value={formData.candidate_last_name} onChange={handleInputChange} class="form-control" placeholder="Last Name" />
                                                                            {errors.candidate_last_name && <span className="error" style={{ color: 'red' }}>{errors.candidate_last_name}</span>}
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="candidate_mobile" value={formData.candidate_mobile} onChange={handleInputChange} class="form-control" placeholder="Mobile Number" />
                                                                            {errors.candidate_mobile && <span className="error" style={{ color: 'red' }}>{errors.candidate_mobile}</span>}
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="candidate_alternate_mobile" value={formData.candidate_alternate_mobile} onChange={handleInputChange} class="form-control" placeholder="Alternate Mobile Number" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="email" name="candidate_email" value={formData.candidate_email} onChange={handleInputChange} class="form-control" placeholder="Email" />
                                                                            {errors.candidate_email && <span className="error" style={{ color: 'red' }}>{errors.candidate_email}</span>}
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="candidate_skype" value={formData.candidate_skype} onChange={handleInputChange} class="form-control" placeholder="Skype" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="candidate_linkedIn_profile" value={formData.candidate_linkedIn_profile} onChange={handleInputChange} class="form-control" placeholder="LinkdIn Profile" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <select
                                                                                name="candidate_selection_status"
                                                                                value={formData.candidate_selection_status}
                                                                                onChange={handleInputChange}
                                                                                class="form-control"
                                                                            >
                                                                                <option value="Applied">Applied</option>
                                                                                <option value="Shortlisted">Shortlisted</option>
                                                                                <option value="Rejected">Rejected</option>
                                                                                <option value="Selected">Selected</option>
                                                                            </select>
                                                                        </div>

                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="candidate_feedback" value={formData.candidate_feedback} onChange={handleInputChange} class="form-control" placeholder="Feedback" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="source_of_candidate" value={formData.source_of_candidate} onChange={handleInputChange} class="form-control" placeholder="Source of Candidate" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6" style={{ textAlign: 'left' }}>
                                                                            <label >DOJ</label>
                                                                            <input type="date" name="candidate_expected_joining_date" value={formData.candidate_expected_joining_date} onChange={handleInputChange} class="form-control" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="candidate_skills" value={formData.candidate_skills} onChange={handleInputChange} class="form-control" placeholder="Skills" />
                                                                            {errors.candidate_skills && <span className="error" style={{ color: 'red' }}>{errors.candidate_skills}</span>}

                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="candidate_experience" value={formData.candidate_experience} onChange={handleInputChange} class="form-control" placeholder="Experience" />
                                                                            {errors.candidate_experience && <span className="error" style={{ color: 'red' }}>{errors.candidate_experience}</span>}
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="number" name="candidate_expected_salary" value={formData.candidate_expected_salary} onChange={handleInputChange} class="form-control" placeholder="Expected Salary" />
                                                                            {errors.candidate_expected_salary && <span className="error" style={{ color: 'red' }}>{errors.candidate_expected_salary}</span>}

                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <select
                                                                                name="candidate_marrital_status"
                                                                                value={formData.candidate_marrital_status}
                                                                                onChange={handleInputChange}
                                                                                class="form-control"
                                                                            >
                                                                                <option value="Single">Single</option>
                                                                                <option value="Married">Married</option>
                                                                                <option value="Divorced">Divorced</option>
                                                                                <option value="Widowed">Widowed</option>
                                                                            </select>
                                                                        </div>

                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="candidate_address" value={formData.candidate_address} onChange={handleInputChange} class="form-control" placeholder="Address" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="candidate_document_proof" value={formData.candidate_document_proof} onChange={handleInputChange} class="form-control" placeholder="Document proof" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="number" name="tenth_percentage" value={formData.tenth_percentage} onChange={handleInputChange} class="form-control" placeholder="10th percentage" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="number" name="twelfth_percentage" value={formData.twelfth_percentage} onChange={handleInputChange} class="form-control" placeholder="12th percentage" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="number" name="graduationPercentage" value={formData.graduationPercentage} onChange={handleInputChange} class="form-control" placeholder="Graduation percentage" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="number" name="postGraduationPercentage" value={formData.postGraduationPercentage} onChange={handleInputChange} class="form-control" placeholder="Post Graduation Percentage" />
                                                                        </div>
                                                                        <div class="mb-3 col-md-6">
                                                                            <input type="text" name="profile" value={formData.profile} onChange={handleInputChange} class="form-control" placeholder="Profile" />
                                                                        </div>
                                                                        <span style={{ color: 'green' }}>{message && <p>{message}</p>}</span>
                                                                        

                                                                    </div>
                                                                    <div class="col-md-12">
                                                                        <button type="submit">Add Candidate</button>
                                                                    </div>
                                                                </form>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>       </div>
                                        </div>
                                    )}
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="thead-light">
                                            <tr>

                                                <th scope="col" onClick={() => handleSort('id')}>ID {sortColumn === 'id' && (
                                                    <FontAwesomeIcon icon={sortDirection === 'ascending' ? faSortUp : faSortDown} />
                                                )}</th>
                                                <th scope="col" onClick={() => handleSort('name')}>Name {sortColumn === 'name' && (
                                                    <FontAwesomeIcon icon={sortDirection === 'ascending' ? faSortUp : faSortDown} />
                                                )}</th>
                                                <th scope="col" onClick={() => handleSort('email')}>Email {sortColumn === 'email' && (
                                                    <FontAwesomeIcon icon={sortDirection === 'ascending' ? faSortUp : faSortDown} />
                                                )}</th>
                                                <th scope="col" onClick={() => handleSort('mobile')}> mobile {sortColumn === 'mobile' && (
                                                    <FontAwesomeIcon icon={sortDirection === 'ascending' ? faSortUp : faSortDown} />
                                                )}</th>
                                                <th scope="col" >#ACTIONS</th>
                                                <th>
                                                    <label className="customcheckbox m-b-20">
                                                        <input type="checkbox" id="mainCheckbox" />
                                                    </label>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="customtable">
                                            {currentItems.map((data, index) => (
                                                <tr key={index}>

                                                    <td>{data._id}</td>
                                                    <td>{data.candidate_first_name}&nbsp;{data.candidate_last_name}</td>
                                                    <td>{data.candidate_email}</td>
                                                    <td>{data.candidate_mobile}</td>
                                                    <td>
                                                        <button className="editButton" onClick={() => DeleteData(data._id)} >  <FontAwesomeIcon icon={faTrash} /></button>
                                                        <button className="editButton" onClick={() => openModal(data._id)} >
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <label className="customcheckbox">
                                                            <input type="checkbox" className="listCheckbox" onChange={(e) => handleCheckboxChange(e, data._id)} />
                                                            <span className="checkmark"></span>
                                                        </label>
                                                    </td>
                                                    <ModalBox isOpen={modalIsOpen} candidateId={selectedCandidateId} onRequestClose={closeModal}>
                                                        <h2>Modal Title</h2>
                                                        <p>Modal Content</p>
                                                    </ModalBox>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <ReactPaginate
                                    previousLabel={'Previous'}
                                    nextLabel={'Next'}
                                    breakLabel={'...'}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageChange}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                />

                            </div>
                        </div>
                    </div>

                </div>

                <div>

                </div>


            </div>
            <Footer />
        </>
    );
}

export default CandidateModule;