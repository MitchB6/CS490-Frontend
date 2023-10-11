import React , { useState } from 'react'

const Add = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address_1, setAddress_1] = useState('');
  const [address_2, setAddress_2] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [postal_code, setPostal_code] = useState('');
  const [phone, setPhone] = useState('');

  const backHandle = () => {
    window.location.reload();
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/add_customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          address_1: address_1,
          address_2: address_2,
          city: city,
          district: district,
          postal_code: postal_code,
          phone: phone,
        }),
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        // console.log(jsonResponse.customer);
        console.log(jsonResponse.status)
        window.location.reload();
      } else {
        throw new Error('Add failed.');
      }
    } catch (error) {
      console.error('Add failed:', error);
    }
  };

  return (
    <div>
      <h3>Add User</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Joy" required />
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Burton" required />
        </div>
        <div>
          <label htmlFor="email">E-Mail: </label>
          <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="joy_burton@aol.com" required />
        </div>
        <div>
          <div>
            <label htmlFor="address_1">Address: </label>
            <input type="text" value={address_1} onChange={(event) => setAddress_1(event.target.value)} placeholder="1234 Main St" required />
            <label htmlFor="address_2">Address 2: </label>
            <input type="text" value={address_2} onChange={(event) => setAddress_2(event.target.value)} />
            <label htmlFor="city">City: </label>
            <input type="text" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Vineland" required />
            <label htmlFor="district">District:</label>
            <input type="text" value={district} onChange={(event) => setDistrict(event.target.value)} placeholder="New Jersey" required />
            <label htmlFor="postal_code">Zip Code</label>
            <input type="text" value={postal_code} onChange={(event) => setPostal_code(event.target.value)} placeholder="12345" required />
          </div>
          <label htmlFor="phone">Phone: </label>
          <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="123-456-7890" required />
        </div>
        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => backHandle()}>Back</button>
        </div>
      </form>
    </div>
  );
};

export default Add