import { Box } from "@mui/material"
import UserForm from "./UserForm"
import UsersTable from "./UsersTable"
import { useEffect, useState } from "react"
import  Axios  from "axios"

const Users =() => {
    const[users,setUsers]=useState([]);
    const[submitted,setSubmitted]=useState(false);
    const[selectedUser,setSelectedUser]=useState({})
    const[isEdit,setIsEdit]=useState(false)
    
    useEffect(()=>{
        getUsers()
    },[])

    const getUsers = () =>{
        Axios.get('http://localhost:8080/api/v1/getusers')
            .then(response => {
                setUsers(response.data || []);
            })
            .catch(error => {
                console.error("Axios Error : ",error)
            })
    }

    const addUser = (data) =>{
        setSubmitted(true)

        const payload={
            id:data.id,
            username:data.name
        }

        Axios.post('http://localhost:8080/api/v1/adduser',payload)
            .then(() => {
                getUsers()
                setSubmitted(false)
                setIsEdit(false)
            })
            .catch(error => {
                console.error("Axios Error : ",error)
            })        
    }

    const updateUser=(data)=>{
        setSubmitted(true)
        
        const payload={
            id:data.id,
            username:data.name
        }

        Axios.put('http://localhost:8080/api/v1/updateuser',payload)
            .then(() => {
                getUsers()
                setSubmitted(false)
                setIsEdit(false)
            })
            .catch(error => {
                console.error("Axios Error : ",error)
            })
    }

    // const deleteUser=(data)=>{
    //     Axios.delete('http://localhost:8080/api/v1/deleteuser',{data}) //delete method you must use data inside the {}.
    //         .then(() => {
    //             getUsers()
    //         })
    //         .catch(error => {
    //             console.error("Axios Error : ",error)
    //         })   
    // }//1st methode

    const deleteUser=(data)=>{
        Axios.delete(`http://localhost:8080/api/v1/deleteuser/${data.id}`) //delete method you must use data inside the {}.
            .then(() => {
                getUsers()
            })
            .catch(error => {
                console.error("Axios Error : ",error)
            })   
    }

    return(
        <Box
            sx={{
                width:'calc(100% - 100px)',
                margin:'auto',
                marginTop:'100px',
            }}
        >
            <UserForm 
                addUser={addUser} 
                updateUser={updateUser}
                submitted={submitted}
                data={selectedUser}
                isEdit={isEdit}
            />
            <UsersTable 
                rows={users}
                selectedUser={data=>{
                    setSelectedUser(data)
                    setIsEdit(true)
                }}
                deleteUser={data => window.confirm("Are You Sure ?") && deleteUser(data)}
            />
        </Box>
    )
}

export default Users