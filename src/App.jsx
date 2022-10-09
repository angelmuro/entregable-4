import axios from 'axios'
import {useEffect, useState} from 'react'
import './App.css'
import FormUsers from './components/FormUsers'
import UserCard from './components/UserCard'

const baseURL = 'https://users-crud1.herokuapp.com'

function App() {

  const [users, setUsers] = useState()

  const [updateInfo, setUpdateInfo] = useState()
  const [formIsClose, setFormIsClose] = useState(true)

   // para hacer el get de todos los users
  const getAllUsers = () => {
    const URL = `${baseURL}/users/`
    axios.get(URL)
       .then(res => setUsers(res.data))
       .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  //para crear un nuevo users

  const createNewUser = data => {
    const URL = `${baseURL}/users/`
    axios.post(URL, data)
      .then(res => {
        console.log(res.data)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }
 
  //para eliminar un usuario espesifico
 const deleteUserById = id => {
   const URL = `${baseURL}/users/${id}/`
   axios.delete(URL)
     .then(res => {
      console.log(res.data)
      getAllUsers()
    })
     .catch(err => console.log(err))
 }

  // para crear un usuario en espesifico
  const updateUserById =  (id, data) => {
    const URL =`${baseURL}/users/${id}/`
    axios.patch(URL, data)
      .then(res => {
        console.log(res)
        getAllUsers()
      })
      .catch(err => console.log(err))
  }

  const handleOpenForm = () => {
    setFormIsClose(false)
    setUpdateInfo()
  }

  return (
    <div className="App">
      <div className='App_container-title'>
        <h1 className='App_title'>Users</h1>
        <button onClick={handleOpenForm} className='App_btn'> + Create a New User</button> 
      </div>
       
      <div className={`form-container ${formIsClose && "disable_form" }`}>
         <FormUsers 
         createNewUser={createNewUser} 
         updateInfo={updateInfo}     
         updateUserById={updateUserById} 
         setUpdateInfo={setUpdateInfo}
         setFormIsClose={setFormIsClose}
      />
      </div>
     
      <div className='users-container'>
        {
        users?.map(user => (
          <UserCard 
             key={user.id}
             user={user}
             deleteUserById={deleteUserById}
             setUpdateInfo={setUpdateInfo}
             setFormIsClose={setFormIsClose}
          />
        ))
      }
      </div>
      
    </div>
  )
}

export default App
