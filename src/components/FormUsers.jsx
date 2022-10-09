import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import "./styles/formUsers.css"

const defaultValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birthday: "",
}

const FormUsers = ({createNewUser, updateInfo, updateUserById, setUpdateInfo, setFormIsClose}) => {

  const {handleSubmit, reset, register} = useForm()

  useEffect(() => {
    if(updateInfo)
      reset(updateInfo)
  }, [updateInfo])

  const submit = data => {
    if(updateInfo){
      // Update
      updateUserById(updateInfo.id, data)
      setUpdateInfo()
    } else {
      // Create
      createNewUser(data)
    }
    reset(defaultValues)
  }

  const handleFormClose = () => {
    setFormIsClose(true)
  }


  return (
    <form className='form' onSubmit={handleSubmit(submit)}>
      <i onClick={handleFormClose} className='form_x fa-solid fa-xmark'> </i>
      <h2 className='form_title'>{updateInfo ?  "Edit User" : "New User"}</h2>
        <div className='form_div'>
            <label className='form_label' htmlFor="email">Email</label>
            <input className='form_input' placeholder='Enter your email' type="email" id='email' {...register('email')}/>
        </div>
        <div className='form_div'>
            <label className='form_label' htmlFor="password">Password</label>
            <input className='form_input' placeholder='Enter your password' type="password" id='password' {...register('password')} />
        </div>
        <div className='form_div'>
            <label className='form_label' htmlFor="fisrt_name">Fisrt name</label>
            <input className='form_input' placeholder='Enter your first name' type="text" id='first_name' {...register('first_name')}/>
        </div>
        <div className='form_div'>
            <label className='form_label' htmlFor="last_name">Last name</label>
            <input className='form_input' placeholder='Enter your last name' type="text" id='last_name' {...register('last_name')}/>
        </div>
        <div className='form_div'>
            <label className='form_label' htmlFor="birthday">Birthday</label>
            <input className='form_input' type="date" id='birthday' {...register('birthday')}/>
        </div>
        <button  onClick={handleFormClose} className='form_btn'>{updateInfo ?  "Update" : "Create"}</button>
    </form>
  )
}

export default FormUsers