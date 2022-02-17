import React,{ Fragment, useState } from "react";

function Users(){

    const usersInit=[
        {
            name:'hakki',
            email:'hakki@email.com'
        },
        {
            name:'soufiane',
            email:'soufiane@email.com'
        },
        {
            name:'youcef',
            email:'youcef@email.com'
        },
    ]
    const [users, setUsers]=useState(usersInit)
    const [isEdit,setIsEdit]=useState(false);
    const [indexOfEditedUser,setIndexOfEditedUser]=useState(null);
    const[userToAdd, setUserToAdd]=useState(
        {
            name:'',
            email:''
        }
    )
    const[userToEdit, setUserToEdit]=useState(
        {
            name:'',
            email:''
        }
    )

    const addModal=()=>{
        setIsEdit(false)
    }

    const submitForm=(e)=>{
        e.preventDefault();        
        isEdit?
        updateUser(indexOfEditedUser,userToEdit)
        :setUsers([...users,userToAdd])
        setUserToEdit({
            name:'',
            email:''
        })
        setUserToAdd({
            name:'',
            email:''
        })
    }

    const removeUser=(index)=>{
        setUsers(users.filter((user)=>users.indexOf(user)!==index))
        
    }
    const editUser=(user,index)=>{        
        console.log('editing')        
        setUserToEdit(user)
        setIndexOfEditedUser(index)
        setIsEdit(true);
    }

    const updateUser=(index,user)=>{
        setUsers(users.map((item)=>users.indexOf(item)==index?user:item))
    }

    return(
        <Fragment>
            <div className="card">
                <div className="card-header">
                    <h4 className='float-start'>Gestion des utilisateurs</h4>
                    
                    <button 
                        className="btn btn-success float-end"
                        data-bs-toggle="modal" 
                        data-bs-target="#staticBackdrop"
                        onClick={addModal}
                    >
                        Add
                    </button>
                </div>
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>                            
                            <tr>
                                <th>N°</th>
                                <th>Name</th>
                                <th>email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user,i)=>{
                                    return <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            
                                            <button 
                                                className="btn btn-primary me-2"
                                                data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop"
                                                onClick={()=>editUser(user,i)}
                                            >
                                            edit
                                            </button>
                                            <button 
                                                className="btn btn-danger"
                                                onClick={()=>removeUser(i)}
                                            >
                                            &times;
                                            </button>
                                        </td>
                                    </tr>                                    
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>



        <div  className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">Adding User</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form onSubmit={submitForm}>
                    <div className="form-group">
                        <label htmlFor="name">name</label>
                        <input  type="text" 
                                name="name" 
                                className="form-control" 
                                placeholder='type the name'                                
                                onChange={
                                    isEdit?
                                    (e)=>setUserToEdit({...userToEdit,name:e.target.value})
                                    :(e)=>setUserToAdd({...userToAdd,name:e.target.value})
                                    }
                                value={userToEdit.name}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">email</label>
                        <input  type="text" 
                                name="email" 
                                className="form-control" 
                                placeholder="type the mail"
                                onChange={
                                    isEdit?
                                    (e)=>setUserToEdit({...userToEdit,email:e.target.value})
                                    :(e)=>setUserToAdd({...userToAdd,email:e.target.value})
                                    }
                                value={userToEdit.email}
                        />
                    </div>                    
                    <div className="modal-footer">
                        {isEdit?
                        <button type="submit" className="btn btn-primary">Update</button>
                        :<button type="submit" className="btn btn-primary">Save</button>                        
                        }
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>            
            </div>
        </div>
        </div>


        </Fragment>
    )
}

export default Users;