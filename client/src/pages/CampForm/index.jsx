import { useContext, useState } from 'react';
import './index.css';
import { primaryContext } from '../../context/PrimaryProvider';
import axios from 'axios';


const CampForm = () => {

  const { states, camps, setCamps } = useContext(primaryContext)

  const [formData, setFormData] = useState({
    stateId: '',
    name: '',
    price: '',
    img: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the submission logic here
    console.log(formData);

    try {
      let response = await axios({
        method: "POST",
        url: "/server/camps",
        data: formData
      });
      console.log(response);
      setCamps([...camps, response.data])
      // go push this to the camps array in state (useContext?)
      setFormData({
        stateId: '',
        name: '',
        price: '',
        img: ''
      });
    } catch (error) {
      console.error("there was an issue", error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="stateId">State:</label>
        <select
          id="stateId"
          name="stateId"
          value={formData.stateId}
          onChange={handleChange}
        >
          <option value="" disabled>Select a state</option>
          {states.map(state => (
            <option key={state._id} value={state._id}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="img">Image URL:</label>
        <input
          type="text"
          id="img"
          name="img"
          value={formData.img}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create Bootcamp</button>
    </form>
  );


}

export default CampForm