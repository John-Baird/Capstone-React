import React, { useState, useEffect } from 'react';

const MyComponent2 = () => {
  const [value2, setValue] = useState('');
  const [number2, setNumber] = useState(10);

  useEffect(() => {
    fetchData();
  }, [value2, number2]);

  const fetchData = async () => {
    try{
      const response2 = await fetch(`/classes?value=${value2}&number=${number2}`);
      const data2 = await response2.json();
      console.log(data2);
      const olClasses = document.getElementById("olClasses")
      while (olClasses.firstChild) {
        olClasses.removeChild(olClasses.firstChild);
      }
      data2.forEach(t => {

        //Create a list element
        const li = document.createElement("li")
        li.textContent = `${t.title}`
        li.id = t.id
        li.style.fontSize = "1.2rem"
        li.style.color = "white"

        //Create a button element (Delete)
        const buttonD = document.createElement("button")
        buttonD.textContent = "Delete"
        buttonD.id = t.id
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
        expand.id = t.id
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
            div.id = `expand${t.id}`;

            const data = `
                <div style="margin-top: 1rem; font-size: 1.2rem;color: white;">
                    Id: ${t.id}<br>
                    Title: <input type="text" value="${t.title}" id="TitleInput" style="margin: 0.5rem 0;"><br>
                    Description: <input type="text" value="${t.description}" id="DescInput" style="margin: 0.5rem 0;"><br>
                    Schedule: <input type="text" value="${t.schedule}" id="scheduleInput" style="margin: 0.5rem 0;"><br>
                    Class Number: <input type="text" value="${t.classroom_number}" id="classNumberInput" style="margin: 0.5rem 0;"><br>
                    Max Cap: <input type="text" value="${t.maximum_capacity}" id="maxCapInput" style="margin: 0.5rem 0;"><br>
                    Credit Hours: <input type="text" value="${t.credit_hours}" id="creditHoursInput" style="margin: 0.5rem 0;"><br>
                    Students: ${t.students}<br>
                    <button id="saveButton" style="background-color: #4CAF50; color: #fff; border: none; padding: 0.5rem; cursor: pointer; margin-top: 1rem;">Save</button>
                </div>
                `;
            div.innerHTML = data;
            const existingDiv = document.getElementById(`expand${t.id}`);
            if (existingDiv) {
                existingDiv.remove(); // remove existing div if there is one
            }
            else{
                olClasses.appendChild(div);
            
            const saveButton = document.getElementById("saveButton");
            saveButton.addEventListener("click", async e => {
                const Title = document.getElementById("TitleInput").value;
                const Desc = document.getElementById("DescInput").value;
                const Schedule = document.getElementById("scheduleInput").value;
                const ClassNumber = document.getElementById("classNumberInput").value;
                const MaxCap = document.getElementById("maxCapInput").value;
                const Credits = document.getElementById("creditHoursInput").value;

                const edit = {
                    title: Title,
                    description: Desc,
                    schedule: Schedule,
                    classroom_number: ClassNumber,
                    maximum_capacity: MaxCap,
                    credit_hours: Credits
                };
                
                if(Title !== t.title){
                    const types = "editClass"
                        fetch("/classes", {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            ttype: types,
                            id: t.id,
                            value: "title",
                            newvalue: edit.title

                        })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data));
                        t.title = Title
                }
                if(Desc !== t.description){
                    const types = "editClass"
                        fetch("/classes", {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            ttype: types,
                            id: t.id,
                            value: "description",
                            newvalue: edit.description

                        })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data));
                        t.description = Desc
                }
                if(Schedule !== t.schedule){
                    const types = "editClass"
                        fetch("/classes", {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            ttype: types,
                            id: t.id,
                            value: "schedule",
                            newvalue: edit.schedule

                        })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data));
                        t.schedule = Schedule
                }
                if(ClassNumber !== t.classroom_number){
                    const types = "editClass"
                        fetch("/classes", {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            ttype: types,
                            id: t.id,
                            value: "classroom_number",
                            newvalue: edit.classroom_number

                        })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data));
                        t.classroom_number = ClassNumber
                }
                if(MaxCap !== t.maximum_capacity){
                    const types = "editClass"
                        fetch("/classes", {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            ttype: types,
                            id: t.id,
                            value: "maximum_capacity",
                            newvalue: edit.maximum_capacity

                        })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data));
                        t.maximum_capacity = MaxCap
                }
                if(Credits !== t.credit_hours){
                    const types = "editClass"
                        fetch("/classes", {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            ttype: types,
                            id: t.id,
                            value: "credit_hours",
                            newvalue: edit.credit_hours

                        })
                        })
                        .then(response => response.json())
                        .then(data => console.log(data));
                        t.credit_hours = Credits
                }



                div.remove();
                
            });
            }
        });

        //Listen for a click on the delete button element
        buttonD.addEventListener("click", async e =>{
            const types = "removeUser"
            fetch("/classes", {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                ttype: types,
                value: t.id
            })
            })
            .then(response => response.json())
            .then(data => console.log(data));
            //deletes the selected button and list
            const a = document.querySelectorAll(`li#${t.id}, button#${t.id}`)
            a.forEach(o => o.remove())
        })

        //Listen for a click on the edit button

        
        
        //Add the list and button element
        olClasses.appendChild(li)
        olClasses.appendChild(buttonD)
        //olClasses.appendChild(buttonE)
        olClasses.appendChild(expand)

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
      <h1 style={{color: "white"}}>Classes</h1>
      <div>
        <input type="text" id="input-box" placeholder="Search for User..." value={value2} onChange={handleValueChange} />
        <input type="range" id="slider" min="0" max="20" value={number2} onChange={handleNumberChange} />
      </div>
      <ol id="olClasses"></ol>


      
    </div>
  );
};

export default MyComponent2;