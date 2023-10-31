import React, { useContext } from 'react'
import './index.css'
import { primaryContext } from '../../context/PrimaryProvider'
import UpdateForm from '../../components/UpdateForm';
import axios from 'axios';

const CampsDisplay = () => {

  const { camps, setCamps, campToEdit, setCampToEdit } = useContext(primaryContext);


  
  const handleDelete = async (id) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `/server/camps/${id}`
      });

      console.log("Delete successful:", response);

      let newCamps = camps.filter((camp) => {
        return camp._id !== id
      });
      setCamps(newCamps);

    } catch (err) {
      console.error("Error deleting camp:", err.response ? err.response.data : err.message);
    }
  }


  return (
    <div>

      {campToEdit && <UpdateForm />}

      {camps.map((camp) => {
        return <div className='camp' key={camp._id}>
          <h3>{camp.name}</h3>
          <button onClick={() => handleDelete(camp._id)}>DELETE</button>
          <button onClick={() => setCampToEdit(camp)}>EDIT</button>
          <p>{camp.stateId.name}</p>
          <p>${camp.price}</p>
          <p>Price After Tax: ${camp.price * (1 + camp.stateId.tax)}</p>
        </div>
      })}
    </div>
  )
}

export default CampsDisplay