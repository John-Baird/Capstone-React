const {Client} = require('pg')
const express = require('express')
const app = express()
app.use(express.json())




let andrewcrate = ["andrewcrate", 'andrewcrate@example.com', 'ea17c66e-b97a-11ed-afa1-0242ac120002', false, "Andrew", "Crate", "8015551358", '890 Pine St.', "2020-01-01"]

let alexgardener = ["ericgardener", 'alexgarderner@example.com', '4a4d6dfe-e75b-4106-9bbd-8aa8d454390d', true, "Eric", "Gardener", "8015552489", "840 Pineapple St.", "2020-01-01"]

let HistoryI = ["4","History I", "Freshman year history", 12345, 104, 20, 1, 50, []]

const client = new Client({
    user: "postgres",
    password: "capstone",
    host:"localhost",
    port:5432,
    database: "postgres"

})

//app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`))
//app.get("/search", (req, res) => res.sendFile(`${__dirname}/search.html`))
app.get("/users", async (req, res) => {
    try
    {
        const rawUser = req.query.value;
        const amount = req.query.number;

        const resultsUser = await viewUsers(rawUser,amount)
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(resultsUser))
    }
    catch(e)
    {
        console.log(`Something happened when sending a response to port 8080: ${e}`)
        await client.end()
    }
    
})

app.get("/classes", async (req, res) => {
    try
    {
        const rawClass = req.query.value;
        const amount = req.query.number;

        const resultsClass = await viewClasses(rawClass,amount)
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(resultsClass))
    }
    catch(e)
    {
        console.log(`Something happened when sending a response to port 8080: ${e}`)
        await client.end()
    }
    
})


app.patch("/users", async (req, res) => {
    let result = {}
    try
    {
        const reqJson = req.body
        if(reqJson.ttype === "editUser"){
            await editUser(reqJson.hash,reqJson.value,reqJson.newvalue)
            result.success = true
        }
        // else if(reqJson.ttype === "insertUser"){
        //     await insertUser(reqJson.value)
        //     result.success = true
        // }
        
    }
    catch(e)
    {
        console.log(`Something happened when editing a response to port 8080: ${e}`)
        result.success = false
    }
    finally
    {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})

app.patch("/classes", async (req, res) => {
    let result = {}
    try
    {
        const reqJson = req.body
        if(reqJson.ttype === "editClass"){
            await editClass(reqJson.id,reqJson.value,reqJson.newvalue)
            result.success = true
        }
        // else if(reqJson.ttype === "insertUser"){
        //     await insertUser(reqJson.value)
        //     result.success = true
        // }
        
    }
    catch(e)
    {
        console.log(`Something happened when editing a response to port 8080: ${e}`)
        result.success = false
    }
    finally
    {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})


app.post("/users", async (req, res) => {
    let result = {}
    try
    {
        const reqJson = req.body
        // if(reqJson.ttype === "removeUser"){
        //     await removeUser(reqJson.value)
        //     result.success = true
        // }
        // else 
        if(reqJson.ttype === "insertUser"){
            await insertUser(reqJson.value)
            result.success = true
        }

        
    }
    catch(e)
    {
        console.log(`Something happened when sending a response to port 8080: ${e}`)
        result.success = false
    }
    finally
    {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})

app.post("/classes", async (req, res) => {
    let result = {}
    try
    {
        const reqJson = req.body
        if(reqJson.ttype === "insertClass"){
            await insertClass(reqJson.value)
            result.success = true
        }

        
    }
    catch(e)
    {
        console.log(`Something happened when sending a response to port 8080: ${e}`)
        result.success = false
    }
    finally
    {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})



app.delete("/users", async (req, res) => {
    let result = {}
    try
    {
        const reqJson = req.body
        if(reqJson.ttype === "removeUser"){
            await removeUser(reqJson.value)
            result.success = true
        }
        else if(reqJson.ttype === "insertUser"){
            await insertUser(reqJson.value)
            result.success = true
        }    
        
    }
    catch(e)
    {
        console.log(`Something happened when removing a response to port 8080: ${e}`)
        result.success = false
    }
    finally
    {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})

app.delete("/classes", async (req, res) => {
    let result = {}
    try
    {
        const reqJson = req.body
        if(reqJson.ttype === "removeClass"){
            await removeClass(reqJson.value)
            result.success = true
        }
        // else if(reqJson.ttype === "insertUser"){
        //     await insertUser(reqJson.value)
        //     result.success = true
        // }    
        
    }
    catch(e)
    {
        console.log(`Something happened when removing a response to port 8080: ${e}`)
        result.success = false
    }
    finally
    {
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
    
})






app.listen(8080, () => console.log("web server is listening.. on port 8080"))

start()




async function start(){

    try 
    {
        await client.connect()

        
        
        

        //const successinsertUser = await insertUser(andrewcrate)
        //console.log(`Inserting User Was ${successinsertUser}`)
        
        //const successdeleteUser = await removeUser("andrewcrate")
        //console.log(`Deleting User Was ${successdeleteUser}`)

        //const successinsertClass = await insertClass(HistoryI)
        //console.log(`Inserting Class Was ${successinsertClass}`)

        //const successremoveClass = await removeClass("History I")
        //console.log(`Deleting Class Was ${successremoveClass}`)

        // successeditUser = await editUser("931a1c5b-d48e-4a5f-88a7-979c2745a8d2","username", "johnwick")
        //console.log(`Editing User Value Was ${successeditUser}`)

        //const successeditClass = await editClass("1","schedule",123)
        //console.log(`Editing Class Value Was ${successeditClass}`)

        //await viewUsers("",100)

        //await viewClasses("Math",10)

        //await insertStudent("janedoe","Math I")

        //await removeStudent("janedoe","Math I")

        //await  findstudentClasses("johnwick")
    }
    catch(e)
    {
        console.log(`Failed to do something: ${e}`)        
    }
    finally
    {
        //await end()
    }
}


async function end(){
    try
    {
        await client.end()
        console.log("Client disconnected sucessfully")
    }
    catch(e)
    {
        await client.end
        console.log(`Client disconnected with an error: ${e}`)
    }
}

async function login(){

}

async function logout(){

}

async function getcurrentUser(){

}

async function insertUser([username,email,hash,is_admin,first_name,last_name,telephone,address,create_date]){
    try
    {
        await client.query("BEGIN")
        await client.query("insert into users values ($1,$2,$3,$4,$5,$6,$7,$8,$9)", [username,email,hash,is_admin,first_name,last_name,telephone,address,create_date])
        await client.query("COMMIT")
        console.log(`User ${username} Successfully Inserted`)
        return true
    }
    catch(e)
    {
        console.log(`Error When Inserting User ${username} : ${e}`)
        await client.query("ROLLBACK")
        return false
    }
    

}

async function removeUser(username){

    try
    {
        await client.query("BEGIN")
        await client.query("delete from users where username = $1", [username])
        await client.query("COMMIT")
        console.log(`User ${username} Sucessfully Removed`)
        return true
    }
    catch(e)
    {
        console.log(`Error When Removing User ${username} : ${e}`)
        await client.query("ROLLBACK")
        return false
    }
    
}

async function editUser(hash,valuetype,newvalue){

    
    if(!newvalue){
        throw new Error(`New value cannot be empty or null! hash:${hash}, valuetype:${valuetype}, newvalue:${newvalue}`)
    }
    if(valuetype == "hash")
    {
        console.log("Unable to edit hash(uuid) fatal errors will occur if changed")
        return false
    }
    else
    {
        //checking if valuetype is valid
        const {rows:admincount} = await client.query("Select Count(*) from users where is_admin = 'true'")
        let admincountvalue = (admincount[0].count)
        console.log(admincountvalue)
        if(admincountvalue == 1 && newvalue == false)
        {
            console.log("warning you are the last admin")
            allowedColumns = ["username","email","first_name","last_name","telephone","address","create_date"]
            if(!allowedColumns.includes(valuetype))
                if(valuetype == "is_admin")
                {
                    throw new Error("You can not remove your admin status, doing so will remove any means of editing the system")
                }
                else
                {
                    throw new Error(`Invalid column name ${valuetype}`)
                }
        }
        else 
        {
            allowedColumns = ["username","email","first_name","last_name","is_admin","telephone","address","create_date"]
            if(!allowedColumns.includes(valuetype))
                {
                    throw new Error(`Invalid column name ${valuetype} or invalid permission`)
                }
        }
        




        try
        {
            //Get the current username from the hash
            await client.query("BEGIN")
            const {rows: name} = await client.query("select username from users where hash = $1", [hash])
            const realname = (name[0].username)
            console.log(realname)

            //Get the current value we are trying to change
            const {rows: value} = await client.query(`select ${valuetype} from users where hash = $1`, [hash])
            const realvalueUser = (value[0][valuetype])
            console.log(`Start value is ${realvalueUser}`)

            //update the value to the newvalue 
            await client.query(`UPDATE users SET ${valuetype} = $1 WHERE hash = $2`,[newvalue, hash])

            //update every other value to the newvalue
            if(valuetype = "username"){
                await client.query(`UPDATE classes set students = array_replace(students, $1, $2) where $1 = any (students)`,[realname,newvalue])
            }

            await client.query("COMMIT")
            console.log(`${realname}'s ${valuetype} was changed from ${realvalueUser} to ${newvalue}`)

            
            return true
        }
        catch(e)
        {            
            console.log(`Something went wrong when editing a user value ${e}`)
            await client.query("ROLLBACK")
            return false
        }
    }
}

async function insertClass([id,title,description,schedule,classroom_number,maximum_capacity,credit_hours,tuition_cost,students]){

    try
    {
        await client.query("BEGIN")
        await client.query("insert into classes values ($1,$2,$3,$4,$5,$6,$7,$8,$9)", [id,title,description,schedule,classroom_number,maximum_capacity,credit_hours,tuition_cost,students])
        await client.query("COMMIT")
        console.log(`Class ${title} sucessfully inserted`)
        return true
    }
    catch(e)
    {
        console.log(`Something went wrong with inserting class ${title} : ${e}`)
        await client.query("ROLLBACK")
        return false
    }

}

async function removeClass(title){

    try
    {
        await client.query("BEGIN")
        await client.query("delete from classes where title = $1", [title])
        await client.query("COMMIT")
        console.log(`Class ${title} has sucessfully been deleted`)
        return true
    }
    catch(e)
    {
        console.log(`Error happened when deleting class ${title}, ${e}`)
        return false
    }
}

async function editClass(id,valuetype,newvalue){

    if(valuetype == "id")
    {
        console.log("Cannot edit original ID for class, it will cause fatal errors")
        return false
    }
    else
    {
        try
        {
            //Get class name through id
            await client.query("BEGIN")
            const {rows: title} = await client.query("select title from classes where id = $1", [id])
            const realtitle = (title[0].title)
            console.log(`${realtitle}`)

            //Get current value we are trying to change
            const {rows: value} = await client.query(`select ${valuetype} from classes where id = $1`, [id])
            const realvalueClass = (value[0][valuetype])
            console.log(`${realvalueClass}`)
            

            //change current value to newvalue
            await client.query(`UPDATE classes SET ${valuetype} = $1 where id = $2`,[newvalue,id])
            await client.query("COMMIT")
            console.log(`${realtitle}'s ${valuetype} was changed from ${realvalueClass} to ${newvalue}`)
            return true
        }
        catch(e)
        {
            console.log(`Something went wrong when trying to edit a class value ${e}`)
            await client.query("ROLLBACK")
            return false
        }    
    }
}

async function viewUsers(sortcall,amount){

    try
    {
        const realamount = await client.query("select COUNT(*) from users")

        if(amount > realamount){
            amount = realamount
        }
        if(sortcall !== undefined && sortcall !== null)
        {
            if(sortcall == "")
            {
                const {rows: allUsers} = await client.query("select * from users limit $1",[amount])
                console.log("All users have been returned")
                return allUsers
                
            }
            else
            {
                const {rows: resultsUser} = await client.query({
                    text:`select * from users where lower(first_name) like lower($1) or lower(last_name) like lower($1) or lower(username) like lower($1) limit $2`,
                    values: [`%${sortcall}%`,amount]
                })
                console.table(resultsUser)
                
                return resultsUser
            }

        }
        else
        {
            console.log("sortcall is undefined")
            return []
        }
        
    }
    catch(e)
    {
        console.log(`Something went wrong when viewing  users: ${e}`)
        return []
    }
    
    
}

async function viewClasses(sortcall,amount){

    try
    {

        const realamount = await client.query("select COUNT(*) from classes")

        if(amount > realamount){
            amount = realamount
        }

        if(sortcall !== undefined && sortcall !== null)
        {
            if(sortcall == "")
            {
                const {rows: allClasses} = await client.query("select * from classes limit $1",[amount])
                console.log("All classes have been returned")
                return allClasses
                
            }
            else
            {
                const {rows: resultsClass} = await client.query({
                    text:`select * from classes where lower(title) like lower($1) or lower(description) like lower($1) limit $2`,
                    values: [`%${sortcall}%`,amount]
                })
                console.table(resultsClass)
                
                return resultsClass
            }
        }
        else
        {
            console.log("sortcall is undefined")
            return []
        }
    }
    catch(e)
    {
        console.log(`Something went wrong when viewing classes ${e}`)
        return []
    }
    
}

async function insertStudent(student,classname){
    try
    {
        await client.query("BEGIN")
        //const {rows: studentData} = await client.query("select * from users where username = $1", [student])
        await client.query("UPDATE classes set students = array_append(students,$1) where title = $2", [student,classname])
        await client.query("COMMIT")
        console.log(`${student} successfully added to class ${classname}`)
        return true
    }
    catch(e)
    {
        console.log(`Something went wrong when trying to insert student ${e}`)
        await client.query("ROLLBACK")
        return false
    }
}

async function removeStudent(student,classname){

    try
    {
        await client.query("BEGIN")
        await client.query("UPDATE classes set students = array_remove(students,$1) where title = $2", [student,classname])
        await client.query("COMMIT")
        console.log(`${student} successfully removed from class ${classname}`)
        return true
    }
    catch(e)
    {
        console.log(`Something went wrong when trying to remove student ${e}`)
        await client.query("ROLLBACK")
        return false
    }
}


async function findstudentClasses(student){

    try
    {
        await client.query("BEGIN")
        const {rows: studentClasses} = await client.query("select * from classes where students @> array[$1]", [student])
        console.table(studentClasses)
        await client.query("COMMIT")
        console.log(`${student}'s classes have been sucessfully be loaded`)
        return studentClasses
    }
    catch(e)
    {
        console.log(`Something went wrong went getting ${student}'s classes: ${e}`)
        await client.query("ROLLBACK")
        return []
    }
}



async function mynewasyncfunction(){



try 
{

    await client.connect()
    await client.query("BEGIN")
    //await client.query("insert into users values ($1, $2, $3, $4, $5, $6, $7, $8, $9)", andrewcrate)
    const {rows: users} = await client.query("select * from users")
    console.table(users)
    const {rows: students} = await client.query("select students from classes where title = 'Math I'")
    console.table(students)
    await client.query("COMMIT")

}
catch (myerror)
{
    console.log(`Failure to execute something ${myerror}`)
    await client.query("ROLLBACK")
} 
finally
{
    await client.end()
    console.log("Client disconnected sucessfully")
}
}