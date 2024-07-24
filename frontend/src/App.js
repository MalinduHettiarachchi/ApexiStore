import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    brand: '',
    processor: '',
    ram: '',
    gpu: ''
  });

  const [predictedPrice, setPredictedPrice] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/predict', formData)
      .then(response => {
        setPredictedPrice(`The predicted price for the specified configuration is: €${response.data.predicted_price}`);
      })
      .catch(error => {
        console.error('There was an error making the request!', error);
      });
  };

  return (
    <div className="App">
      <h1>Laptop Price Predictor</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Brand:
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Processor:
          <input type="text" name="processor" value={formData.processor} onChange={handleChange} required />
        </label>
        <br />
        <label>
          RAM:
          <input type="text" name="ram" value={formData.ram} onChange={handleChange} required />
        </label>
        <br />
        <label>
          GPU:
          <input type="text" name="gpu" value={formData.gpu} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Predict</button>
      </form>
      {predictedPrice && <h2>{predictedPrice}</h2>}
    </div>
  );
}

export default App;
