import { useState } from "react";
import {v4 as uuidv4} from 'uuid';

//let myuuid = uuidv4();
function Registration() {
  const [formValues, setFormValues] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    telephone: "",
    address: "",
    createdDate: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const createdDate = new Date(); // create a new Date object with the current date and time
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      createdDate: createdDate
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    const uuid = uuidv4()
    console.log(uuid)
    const neededArray = [formValues.userName,formValues.email,uuid,false,formValues.firstName,formValues.lastName,formValues.telephone,formValues.address,formValues.createdDate]
    // TODO: submit form data to server

    fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ttype: 'insertUser',
          value: neededArray
        })
      })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "white" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <label style={{ margin: "10px 0", fontWeight: "bold" }}>
          Username:
          <input
            type="text"
            name="userName"
            value={formValues.userName}
            onChange={handleInputChange}
            style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px", border: "1px solid white" }}
          />
        </label>
        <label style={{ margin: "10px 0", fontWeight: "bold" }}>
          Email:
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            style={{ marginLeft: "35px", padding: "5px", borderRadius: "5px", border: "1px solid white" }}
          />
        </label>
        <label style={{ margin: "10px 0", fontWeight: "bold" }}>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
            style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px", border: "1px solid white" }}
          />
        </label>
        <label style={{ margin: "10px 0", fontWeight: "bold" }}>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleInputChange}
            style={{ marginLeft: "12px", padding: "5px", borderRadius: "5px", border: "1px solid white" }}
          />
        </label>
        <label style={{ margin: "10px 0", fontWeight: "bold" }}>
          Telephone:
          <input
            type="number"
            name="telephone"
            value={formValues.telephone}
            onChange={handleInputChange}
            style={{ marginLeft: "12px", padding: "5px", borderRadius: "5px", border: "1px solid white" }}
          />
        </label>
        <label style={{ margin: "10px 0", fontWeight: "bold" }}>
          Address:
          <input
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleInputChange}
            style={{ marginLeft: "25px", padding: "5px", borderRadius: "5px", border: "1px solid white" }}
          />
        </label>
        <button type="submit" style={{ margin: "20px 0", padding: "10px", backgroundColor: "#4F4F4F", color: "white", fontWeight: "bold", borderRadius: "5px", border: "none" }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#3e8e41'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#4F4F4F'}
        >Register</button>
      </form>
    </div>
  );
}
export default Registration