import React,{ useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Reports = () => {
  const [customerList, setCustomerList] = useState([]);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Customer Report',
    onAfterPrint: () => alert('Report Printed')
  });
  useEffect( () => {
    const fetchCustomers = async () => {
      try{
        const customerRes = await fetch('http://localhost:5000/report_layout');
        if(customerRes.ok){
          const customerData = await customerRes.json();
          setCustomerList(customerData);
        }else{
          throw new Error("Customer Retrieval Failed");
        }
      }catch (error){
        console.error("Customer Retrieval Failed:", error);
      }
    }
    fetchCustomers();
  }, []);

  return (
    <>
      <p><button onClick={handlePrint}>Print</button></p>
      <div ref={componentRef} style={{width:'100%', height: window.innerHeight}}>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>E-Mail</th>
              <th>Phone</th>
              <th>Movie Rented</th>
              <th>Movies Amount Returned</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((customer) => (
              <tr>
                <td>{customer[1]}</td>
                <td>{customer[2]}</td>
                <td>{customer[3]}</td>
                <td>{customer[4]}</td>
                <td>{customer[5]}</td>
                <td>{customer[7]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
  );
}
export default Reports;