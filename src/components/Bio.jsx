import getPhotoUrl from 'get-photo-url'
import { useState } from 'react'
import { db } from '../dexie'
import { useLiveQuery } from 'dexie-react-hooks'

const Bio = () =>{
    // const[userDetails, setUserDetails]=useState({
    //     name:'Joseph Oduyebo',
    //     about:'Building instagram clone- Learning react, webstack challenge.',
    // })
    const userDetails = useLiveQuery(()=> db.bio.get('info' ), [])

    const [editFormIsOpen, setEditFormIsOpen] =useState(false)
    
    const profilePhoto = useLiveQuery(()=> db.bio.get('profilePhoto' ), [])

    

    
    // useEffect(() =>{
    //         const setDataFromDb = async () =>{
    //             // const userDetailsFromDb = await db.bio.get('info')
    //             const profilePhotoFromDb = await db.bio.get('profilePhoto')
    //             // userDetailsFromDb && setUserDetails (userDetailsFromDb)
    //             profilePhotoFromDb && setProfilePhoto (profilePhotoFromDb)
        
    //         }
    //         setDataFromDb()
    //     }, 
    // [])
    
    const updateUserDetails = async (event) => {
        event.preventDefault()
        const objectData={
            name: document.querySelector('#nameOfUser').value,
            about: document.querySelector('#aboutUser').value,
        }
    
        await db.bio.put(objectData, 'info')
        setEditFormIsOpen(false)
    }

    const updateProfilePhoto = async () => {
        const newProfilePhoto = await getPhotoUrl('#profilePhotoInput')
        // setProfilePhoto(newProfilePhoto)
        await db.bio.put(newProfilePhoto, 'profilePhoto')
    }


    const editForm = (
       <form className='edit-bio-form 'onSubmit={(e)=>updateUserDetails(e)}>
            <input type="text" id='nameOfUser' name='nameOfUser'defaultValue={userDetails?.name} placeholder='Your name' />
            <input type="text" id="aboutUser" name='aboutUser' defaultValue={userDetails?.about}placeholder='About you' />
            <br />
            <button type='button' className='cancel-button'
               onClick={() =>setEditFormIsOpen (false)}
            >
                Cancel
            </button>
            <button type='submit'>
              save
            </button>
       </form>     

    )

    const editButton = <button onClick={() =>setEditFormIsOpen (true)}>Edit</button>

    return(
        <section className="bio">
            <input type="file" accept='image/* name="photo' id='profilePhotoInput'/>
           
            <label htmlFor='profilePhotoInput' onClick={updateProfilePhoto}>
                <div className="profile-photo" role="button" title="click to edit">
                    <img src={profilePhoto} alt="profile"/>
                </div>   
                
            </label>
         
            <div className="profile-info" >
                <p className="name">{userDetails?.name}</p>
                <p className="about">{userDetails?.about}</p>
                {editFormIsOpen ? editForm :  editButton}
            </div>
        </section>
    );
}
export default Bio