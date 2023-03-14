import { useState } from "react";


//let myuuid = uuidv4();
function Registration() {
  const [formValues, setFormValues] = useState({
    ID: "",
    Title: "",
    Description: "",
    Schedule: "",
    ClassNumber: "",
    MaxCap: "",
    Credit: "",
    Tuition: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,

    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    
    const neededArray = [formValues.ID,formValues.Title,formValues.Description,formValues.Schedule,formValues.ClassNumber,formValues.MaxCap,formValues.Credit,formValues.Tuition,[]]
    // TODO: submit form data to server
    console.log(neededArray)
    fetch('/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ttype: 'insertClass',
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
    <div style={{ backgroundColor: 'black', padding: '20px', borderRadius: '10px'}}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ color: 'whitesmoke', marginBottom: '5px' }}>
          ID:
          <input
            type="text"
            name="ID"
            value={formValues.ID}
            onChange={handleInputChange}
            style={{ marginLeft: '5px', padding: '5px', borderRadius: '5px', border: '1px solid #C4C4C4', background: 'black',color:'white' }}
          />
        </label>
        <label style={{ color: 'whitesmoke', marginBottom: '5px' }}>
          Title:
          <input
            type="text"
            name="Title"
            value={formValues.Title}
            onChange={handleInputChange}
            style={{ marginLeft: '5px', padding: '5px', borderRadius: '5px', border: '1px solid #C4C4C4', background: 'black',color:'white' }}
          />
        </label>
        <label style={{ color: 'whitesmoke', marginBottom: '5px' }}>
          Description:
          <input
            type="text"
            name="Description"
            value={formValues.Description}
            onChange={handleInputChange}
            style={{ marginLeft: '5px', padding: '5px', borderRadius: '5px', border: '1px solid #C4C4C4', background: 'black',color:'white' }}
          />
        </label>
        <label style={{ color: 'whitesmoke', marginBottom: '5px' }}>
          Schedule Numbers:
          <input
            type="number"
            name="Schedule"
            value={formValues.Schedule}
            onChange={handleInputChange}
            style={{ marginLeft: '5px', padding: '5px', borderRadius: '5px', border: '1px solid #C4C4C4', background: 'black',color:'white' }}
          />
        </label>
        <label style={{ color: 'whitesmoke', marginBottom: '5px' }}>
          Classroom Number:
          <input
            type="number"
            name="ClassNumber"
            value={formValues.ClassNumber}
            onChange={handleInputChange}
            style={{ marginLeft: '5px', padding: '5px', borderRadius: '5px', border: '1px solid #C4C4C4', background: 'black',color:'white' }}
          />
        </label>
        <label style={{ color: 'whitesmoke', marginBottom: '5px' }}>
          Maximum Capacity:
          <input
            type="number"
            name="MaxCap"
            value={formValues.MaxCap}
            onChange={handleInputChange}
            style={{ marginLeft: '5px', padding: '5px', borderRadius: '5px', border: '1px solid #C4C4C4', background: 'black',color:'white' }}
          />
        </label>
        <label style={{ color: 'whitesmoke', marginBottom: '5px' }}>
          Credit Value:
          <input
            type="number"
            name="Credit"
            value={formValues.Credit}
            onChange={handleInputChange}
            style={{ marginLeft: '5px', padding: '5px', borderRadius: '5px', border: '1px solid #C4C4C4', background: 'black',color:'white'  }}
          />
        </label>
        <label style={{ color: 'whitesmoke', marginBottom: '5px' }}>
          Tuition Cost:
          <input
            type="money"
            name="Tuition"
            value={formValues.Tuition}
            onChange={handleInputChange}
            style={{ marginLeft: '5px', padding: '5px', borderRadius: '5px', border: '1px solid #C4C4C4', background: 'black',color:'white' }}
          />
        </label>
        <br />
        <button
          type="submit"
          style={{ backgroundColor: '#4F4F4F', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', marginTop: '10px',cursor: 'pointer' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#3e8e41'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#4F4F4F'}
        >
          Create Class
        </button>
      </form>
    </div>
  )
}
export default Registration