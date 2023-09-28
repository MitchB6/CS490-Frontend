import React , { useState, useEffect } from 'react'
import Add from './Add'
import Edit from './Edit'
  
const Customer = () => {
  const [search_term, setSearchTerm] = useState('');
  const [customerResults, setCustomerResults] = useState([]);
  const [showCustomer, setShowCustomer] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [customerID, setCustomerID] = useState('');
  
  useEffect(() => {
    const fetchCustomerResults = async () => {
      try {
        const customerResponse = await fetch('http://localhost:5000/customer_search?search_term=' + search_term);
        if(customerResponse.ok){
          const customerData = await customerResponse.json();
          setCustomerResults(customerData);
        }else{
          throw new Error('Search failed.');
        }
      } catch (error) {
        console.error('Search failed:', error);
      }
    };
    fetchCustomerResults();
  }, [search_term]);

  const handleInput = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleAdd = () => {
    setShowCustomer(false);
    setShowAdd(true);
    setShowEdit(false);
  };
  const handleEdit = (customer_id) => {
    setShowCustomer(false);
    setShowAdd(false);
    setShowEdit(true);
    setCustomerID(customer_id);
  }
  
  return (
    <div>
      {showCustomer && 
      <div>
        <label>
          Search for a customer:
          <input type="text" value={search_term} onChange={handleInput} />
        </label>
        <p>
          <button onClick={handleAdd}>Add</button>
        </p>
        <h3>Customers</h3>
        <ul>
          {customerResults.map((customer) => (
            <li key={customer[0]} onClick={() => handleEdit(customer[0])}>{customer[0]}: {customer[1]} {customer[2]}</li>
          ))}
        </ul>
      </div>}
      {showAdd && <Add/>}
      {showEdit && <Edit customer_id={customerID} />}
    </div>
  )
};

export default Customer