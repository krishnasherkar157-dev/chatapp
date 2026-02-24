import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'   // ✅ added

const ProfilePage = () => {

  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate();

  const [name,setName] = useState("Marathi Jonson")
  const [bio,setBio] = useState("hi everyone ,i am using qchat")



  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        
        <form className='flex flex-col gap-5 p-10 flex-1'>
          
          <h3 className='text-lg'>Profile details</h3>

          <label 
            htmlFor='avatar' 
            className='flex items-center gap-3 cursor-pointer'
          >
            
            <input 
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type='file' 
              id='avatar' 
              accept='.png, .jpg, .jpeg' 
              hidden 
            />

            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : assets.avatar_icon
              }
              alt=''
              className={`w-12 h-12 ${selectedImg ? 'rounded-full' : ''}`} // ✅ fixed
            />
            uploas profile image
          </label>
          <input onChange={(e)=>setName(e.target.vlaue)} value={name}
           type="text"required placeholder='your name' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
           focus:ring-violet-500'/>
           <textarea 
            onChange={(e)=>setBio(e.target.value)} 
            value={bio}
            rows={4}
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'
            placeholder='write profile bio'
            required
          ></textarea>  
          <button type="submit"
          className='bg-gradient-to-r from-purple-400 to-voilet-600 text-white p-2 rounded-full text-lg cursor-pointer' >save</button>    
        </form>
            
      </div>

    </div>
  )
}

export default ProfilePage