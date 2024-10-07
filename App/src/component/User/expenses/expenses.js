import React, { useState, useEffect } from 'react';
import './expenses.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // For Axios
import ModalBox from './editExpensesModel.js';
import Nav from '../../Navbar/navbar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPaginate from 'react-paginate';
import { faEdit, faTrashAlt, faTrash, faSortUp, faSortDown, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../Footer/footer.js';
import { BASE_API_URL } from '../../../lib/constants.js';
import { Link } from 'react-router-dom';


const ExpensesModule = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tableData, settableData] = useState([]);
    const [togle, settogle] = useState([true]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedExpensesId, setSelectedExpensesId] = useState(null);
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
        const pageCount = Math.ceil(tableData.length / itemsPerPage);
    // const currentItems = tableData.slice(offset, offset + itemsPerPage);

    // const [data, setData] = useState(formData);
    const openModal = (expensesId) => {
        console.log('expensesId', expensesId)
        setModalIsOpen(true);
        setSelectedExpensesId(expensesId);

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
            const response = await axios.delete(`${BASE_API_URL}expenses/multiDelete`, {
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
        if (!formData.expenses_purpose.trim()) {
            newErrors.expenses_purpose = "expenses purpose is required";
            isValid = false;
        }
        if (!formData.expenses_bill.trim()) {
            newErrors.expenses_bill = "expenses bill is required";
            isValid = false;
        }
        if (!formData.transaction_id.trim()) {
            newErrors.transaction_id= "transaction id is required";
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
        expenses_purpose:"",
        expenses_bill:"",
        transaction_id:"",
    });


    const [formData, setFormData] = useState({
        expenses_purpose:'',
        expenses_bill:'',
        expenses_amount:'',
        expenses_voucher:'',
        expenses_remark:'',
        expenses_by_cash:'',
        expenses_by_cheque:'',
        expenses_cash_recieved_by:'',
        transaction_id:'',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}expenses/getAll`);

                console.log(response.data.data); // Handle the response as needed
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
                    const response = await axios.post(`${BASE_API_URL}expenses/create`, formData);
                    settogle(!togle)
                    console.log(response.data); // Handle the response as needed
                    setMessage(response.data.msg);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        const DeleteData = async (id) => {
            console.log('ID to delete:', id); // Log the ID being passed to the function
        
            const isConfirmed = window.confirm('Are you sure you want to delete this item?');
        
            if (isConfirmed) {
                try {
                    // Validate the ID before proceeding
                    if (!id || id.trim() === '') {
                        console.error('Invalid ID:', id); // Log error for invalid ID
                        return; // Exit if ID is invalid
                    }
        
                    // Perform the delete operation
                    // Change from ?_id=${id} to ?id=${id}
                    const response = await axios.delete(`${BASE_API_URL}expenses/delete?id=${id}`);
                    
                    console.log('Response from server:', response.data); // Log the server's response
                    
                    if (response.data.success) {
                        console.log('Deletion successful:', response.data);
                        settogle(!togle); // Toggle state to refresh the list or UI
                    } else {
                        console.error('Deletion failed:', response.data.msg);
                    }
        
                } catch (error) {
                    console.error('Error during deletion:', error);
                }
            } else {
                console.log('Deletion canceled');
            }
        };
        
        
        return (
            <>
            <div >
                 <Nav />
                <div style={{ backgroundColor: '#28769a' }}>
                    <h1 className='headerData'>WELCOME TO Expenses PAGE</h1>
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
                                                                <h4 style={{ display: 'inline', marginRight: '10px' }} className="mb-5 text-secondary">Add New Expenses</h4>
                                                                <button style={{ float: 'right', fontSize: '20px', backgroundColor: '#ddc7c7', border: 'none' }} className="close" onClick={closePopup}>&times;</button>
                                                            </div>
                                                            <div class="row">
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="transaction_id" value={formData.transaction_id} onChange={handleInputChange} class="form-control" placeholder="Transaction Id" />
                                                                    {errors.transaction_id && <span className="error" style={{ color: 'red' }}>{errors.transaction_id}</span>}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="expenses_purpose" value={formData.expenses_purpose} onChange={handleInputChange} class="form-control" placeholder="Expenses Purpose" />
                                                                    {errors.expenses_purpose && <span className="error" style={{ color: 'red' }}>{errors.expenses_purpose}</span>}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="Number" name="expenses_bill" value={formData.expenses_bill} onChange={handleInputChange} class="form-control" placeholder="Expenses Bill" />
                                                                    {errors.expenses_bill && <span className="error" style={{ color: 'red' }}>{errors.expenses_bill}</span>}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="expenses_amount" value={formData.expenses_amount} onChange={handleInputChange} class="form-control" placeholder="Expenses Amount" />
                                                                    {errors.expenses_amount && <span className="error" style={{ color: 'red' }}>{errors.expenses_amount}</span>}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="expenses_voucher" value={formData.expenses_voucher} onChange={handleInputChange} class="form-control" placeholder="Expenses Voucher" />
                                                                    {errors.expenses_voucher && <span className="error" style={{ color: 'red' }}>{errors.expenses_voucher}</span>}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="expenses_remark" value={formData.expenses_remark} onChange={handleInputChange} class="form-control" placeholder="Expenses Remark" />
                                                                    {errors.expenses_remark && <span className="error" style={{ color: 'red' }}>{errors.expenses_remark}</span>}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="expenses_by_cash" value={formData.expenses_by_cash} onChange={handleInputChange} class="form-control" placeholder="Expenses By Cash" />
                                                                    {errors.expenses_by_cash && <span className="error" style={{ color: 'red' }}>{errors.expenses_by_cash}</span>}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="expenses_by_cheque" value={formData.expenses_by_cheque} onChange={handleInputChange} class="form-control" placeholder="Expenses By cheque" />
                                                                    {errors.expenses_by_cheque && <span className="error" style={{ color: 'red' }}>{errors.expenses_by_cheque}</span>}
                                                                </div>
                                                            <div class="mb-3 col-md-6">
                                                                    <input type="String" name="expenses_cash_recieved_by" value={formData.expenses_cash_recieved_by} onChange={handleInputChange} class="form-control" placeholder="Expenses Cash Received By" />
                                                                    {errors.expenses_cash_recieved_by && <span className="error" style={{ color: 'red' }}>{errors.expenses_cash_recieved_by}</span>}
                                                                </div>

                                                  
                                                                <span style={{ color: 'green' }}>{message && <p>{message}</p>}</span>

                                                            </div>
                                                            <div class="col-md-12">
                                                                <button type="submit">Submit</button>
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
                                        <th scope="col" onClick={() => handleSort('name')}>Purpose {sortColumn === 'name' && (
                                            <FontAwesomeIcon icon={sortDirection === 'ascending' ? faSortUp : faSortDown} />
                                        )}</th>
                                        <th scope="col" onClick={() => handleSort('email')}>Bill {sortColumn === 'email' && (
                                            <FontAwesomeIcon icon={sortDirection === 'ascending' ? faSortUp : faSortDown} />
                                        )}</th>
                                        <th scope="col" onClick={() => handleSort('mobile')}> Amount {sortColumn === 'mobile' && (
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
                                    {sortedData().slice(offset, offset + itemsPerPage).map((data, index) => (
                                        <tr key={index}>

                                            <td>{data._id}</td>
                                            <td>{data.expenses_purpose}</td>
                                            <td>{data.expenses_bill}</td>
                                            <td>{data.expenses_amount}</td>
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
                                            <ModalBox isOpen={modalIsOpen} ExpensesId={selectedExpensesId} onRequestClose={closeModal}>
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
    <Footer/>
       </>
  )
}
export default ExpensesModule;