import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [value, setValue] = useState('');
  const [number, setNumber] = useState(10);

  useEffect(() => {
    fetchData();
  }, [value, number]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/users?value=${encodeURIComponent(value)}&number=${number}`);
      const data = await response.json();
      console.log(data);
      const olUsers = document.getElementById("olUsers")
      while (olUsers.firstChild) {
        olUsers.removeChild(olUsers.firstChild);
      }
      data.forEach(t => {

//Create a list element
const li = document.createElement("li")
li.textContent = `${t.first_name} ${t.last_name}`
li.id = t.username
li.style.fontSize = "1.2rem"
li.style.color = "white"

//Create a button element (Delete)
const buttonD = document.createElement("button")
buttonD.textContent = "Delete"
buttonD.id = t.username
buttonD.style.backgroundColor = "#e3e3e3"
buttonD.style.color = "#555"
buttonD.style.border = "none"
buttonD.style.padding = "0.5rem"
buttonD.style.marginRight = "0.5rem"
buttonD.style.cursor = "pointer"
buttonD.style.transition = "background-color 0.3s"

buttonD.addEventListener("mouseenter", () => {
  buttonD.style.backgroundColor = "#bbb";
});

buttonD.addEventListener("mouseleave", () => {
  buttonD.style.backgroundColor = "#e3e3e3";
});

//Create a button element (Expand)
const expand = document.createElement("button")
expand.textContent = "expand data"
expand.id = t.username
expand.style.backgroundColor = "#3d3d3d"
expand.style.color = "#fff"
expand.style.border = "none"
expand.style.padding = "0.5rem"
expand.style.cursor = "pointer"
expand.style.transition = "background-color 0.3s"

expand.addEventListener("mouseenter", () => {
  expand.style.backgroundColor = "#555";
});

expand.addEventListener("mouseleave", () => {
  expand.style.backgroundColor = "#3d3d3d";
});

        expand.addEventListener("click", async e => {
            const div = document.createElement("div");
            div.id = `expand${t.username}`;

            const data = `
            <div style="margin-top: 1rem; font-size: 1.2rem;color: white;">
                Username: ${t.username}<br>
                Email: <input type="text" value="${t.email}" id="emailInput" style="margin: 0.5rem 0;"><br>
                Admin: <input type="checkbox" ${t.is_admin ? "checked" : ""} id="adminInput" style="margin: 0.5rem 0;"><br>
                First Name: <input type="text" value="${t.first_name}" id="firstNameInput" style="margin: 0.5rem 0;"><br>
                Last Name: <input type="text" value="${t.last_name}" id="lastNameInput" style="margin: 0.5rem 0;"><br>
                Telephone: <input type="text" value="${t.telephone}" id="telephoneInput" style="margin: 0.5rem 0;"><br>
                Address: <input type="text" value="${t.address}" id="addressInput" style="margin: 0.5rem 0;"><br>
                Create Date: ${t.create_date}<br>
                <button id="saveButton" style="background-color: #4CAF50; color: #fff; border: none; padding: 0.5rem; cursor: pointer; margin-top: 1rem;">Save</button>
            </div>
            `;
            div.innerHTML = data;
            const existingDiv = document.getElementById(`expand${t.username}`);
            if (existingDiv) {
                existingDiv.remove(); // remove existing div if there is one
            }
            else{
                olUsers.appendChild(div);
            
            const saveButton = document.getElementById("saveButton");
            saveButton.addEventListener("click", async e => {
                const email = document.getElementById("emailInput").value;
                const isAdmin = document.getElementById("adminInput").checked;
                const firstName = document.getElementById("firstNameInput").value;
                const lastName = document.getElementById("lastNameInput").value;
                const telephone = document.getElementById("telephoneInput").value;
                const address = document.getElementById("addressInput").value;

                const edit = {
                    email: email,
                    is_admin: isAdmin,
                    first_name: firstName,
                    last_name: lastName,
                    telephone: telephone,
                    address: address
                };
                
                if(email !== t.email){
                    const types = "editUser"
                        fetch("/users", {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            ttype: types,
                            hash: t.hash,
                            value: "email",
                            newvalue: edit.email

                        })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data));
                        t.email = email
                }
                if(isAdmin !== t.is_admin){
                    const types = "editUser"
                        fetch("/users", {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            ttype: types,
                            hash: t.hash,
                            value: "is_admin",
                            newvalue: edit.is_admin

                        })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data));
                        t.is_admin = isAdmin
                }
                if(firstName !== t.first_name){
                    const types = "editUser"
                        fetch("/users", {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            ttype: types,
                            hash: t.hash,
                            value: "first_name",
                            newvalue: edit.first_name

                        })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data));
                        t.first_name = firstName
                }
                if(lastName !== t.last_name){
                    const types = "editUser"
                        fetch("/users", {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            ttype: types,
                            hash: t.hash,
                            value: "last_name",
                            newvalue: edit.last_name

                        })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data));
                        t.last_name = lastName
                }
                if(telephone !== t.telephone){
                    const types = "editUser"
                        fetch("/users", {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            ttype: types,
                            hash: t.hash,
                            value: "telephone",
                            newvalue: edit.telephone

                        })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data));
                        t.telephone = telephone
                }
                if(address !== t.address){
                    const types = "editUser"
                        fetch("/users", {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            ttype: types,
                            hash: t.hash,
                            value: "address",
                            newvalue: edit.address

                        })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data));
                        t.address = address
                }



                div.remove();
                
            });
            }
        });

        //Listen for a click on the delete button element
        buttonD.addEventListener("click", async e =>{
            const types = "removeUser"
            fetch("/users", {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                ttype: types,
                value: t.username
            })
            })
            .then(response => response.json())
            .then(data => console.log(data));
            //deletes the selected button and list
            const a = document.querySelectorAll(`li#${t.username}, button#${t.username}`)
            a.forEach(o => o.remove())
        })

        //Listen for a click on the edit button

        
        
        //Add the list and button element
        olUsers.appendChild(li)
        olUsers.appendChild(buttonD)
        //olUsers.appendChild(buttonE)
        olUsers.appendChild(expand)

    });



    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };


 


  

  return (
    <div>
      <h1 style={{color: "white"}}>Users</h1>
      <div>
        <input type="text" id="input-box" placeholder="Search for User..." value={value} onChange={handleValueChange} />
        <input type="range" id="slider" min="0" max="20" value={number} onChange={handleNumberChange} />
      </div>
      <ol id="olUsers"></ol>


      
    </div>
  );
};

export default MyComponent;