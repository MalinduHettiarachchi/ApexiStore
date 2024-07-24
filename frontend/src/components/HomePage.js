import React, { useState } from 'react';
import axios from 'axios';
import '../components/HomePage.css'; // Adjust path if needed

function HomePage() {
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
    <div className="HomePage">
      <h1>Choose Your Laptop</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Brand:
          <select name="brand" value={formData.brand} onChange={handleChange} required>
            <option value="">Select by Brand</option>
            <option value="Acer">Acer</option>
            <option value="Apple">Apple</option>
            <option value="Asus">Asus</option>
            <option value="Chuwi">Chuwi</option>
            <option value="Dell">Dell</option>
            <option value="HP">HP</option>
            <option value="Lenovo">Lenovo</option>
            <option value="MSI">MSI</option>
          </select>
        </label>
        <label>
          Processor:
          <select name="processor" value={formData.processor} onChange={handleChange} required>
            <option value="">Select by Processor</option>
            <option value="Intel i3">Intel i3</option>
            <option value="Intel Core i5 2.3GHz">Intel Core i5 2.3GHz</option>
            <option value="Intel i7">Intel i7</option>
            <option value="Intel i9">Intel i9</option>
            <option value="AMD Ryzen 3">AMD Ryzen 3</option>
            <option value="AMD Ryzen 5">AMD Ryzen 5</option>
            <option value="AMD Ryzen 7">AMD Ryzen 7</option>
            <option value="AMD Ryzen 9">AMD Ryzen 9</option>
          </select>
        </label>
        <label>
          RAM:
          <select name="ram" value={formData.ram} onChange={handleChange} required>
            <option value="">Select by RAM</option>
            <option value="4GB">4GB</option>
            <option value="8GB">8GB</option>
            <option value="12GB">12GB</option>
            <option value="16GB">16GB</option>
            <option value="32GB">32GB</option>
            <option value="64GB">64GB</option>
          </select>
        </label>
        <label>
          GPU:
          <select name="gpu" value={formData.gpu} onChange={handleChange} required>
            <option value="">Select by GPU</option>
            <option value="Integrated">Integrated</option>
            <option value="Intel Iris Plus Graphics 640">Intel Iris Plus Graphics 640</option>
            <option value="NVIDIA GeForce GTX 1650">NVIDIA GeForce GTX 1650</option>
            <option value="NVIDIA GeForce GTX 1660">NVIDIA GeForce GTX 1660</option>
            <option value="NVIDIA GeForce RTX 2060">NVIDIA GeForce RTX 2060</option>
            <option value="NVIDIA GeForce RTX 3060">NVIDIA GeForce RTX 3060</option>
            <option value="AMD Radeon RX 5500M">AMD Radeon RX 5500M</option>
            <option value="AMD Radeon RX 5600M">AMD Radeon RX 5600M</option>
            <option value="AMD Radeon RX 5700M">AMD Radeon RX 5700M</option>
          </select>
        </label>
        <button type="submit">Search</button>
      </form>
      {predictedPrice && <h2>{predictedPrice}</h2>}
    </div>
  );
}

export default HomePage;
