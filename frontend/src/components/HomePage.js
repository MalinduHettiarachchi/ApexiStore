import React, { useState } from 'react';
import axios from 'axios';
import { motion, useAnimation } from 'framer-motion';
import '../components/HomePage.css';
import apple from '../assets/apple.png';
import dell from '../assets/dell.png';
import hp from '../assets/hp.png';
import lenovo from '../assets/lenovo.png';

function HomePage() {
  const [formData, setFormData] = useState({
    brand: '',
    processor: '',
    ram: '',
    gpu: ''
  });

  const [result, setResult] = useState({
    details: {}
  });

  const brandControls = useAnimation();
  const processorControls = useAnimation();
  const ramControls = useAnimation();
  const gpuControls = useAnimation();

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
        setResult({
          details: response.data.details
        });
      })
      .catch(error => {
        console.error('There was an error making the request!', error);
      });
  };

  const handleFocus = (controls) => {
    controls.start({
      scale: 1.1,
      transition: { duration: 0.2},
    });
  };

  const handleBlur = (controls) => {
    controls.start({
      scale: 1,
      transition: { duration: 0.5 },
    });
  };

  return (
    <div className="HomePage">
      <div className="logo-container">
        <motion.div
          initial={{x:-100,opacity:0}}
          animate={{x:0,opacity:1}}
          transition={{duration:0.5,delay:0.5}}
        > 
         <img src={apple} alt="Logo" className="apple" />
        </motion.div>
        
        <motion.div
          initial={{x:-100,opacity:0}}
          animate={{x:0,opacity:1}}
          transition={{duration:0.5,delay:1}}
        > 
         <img src={dell} alt="Logo" className="dell" />
        </motion.div>
        <motion.div
          initial={{x:-100,opacity:0}}
          animate={{x:0,opacity:1}}
          transition={{duration:0.5,delay:1.5}}
        > 
         <img src={hp} alt="Logo" className="hp" />
        </motion.div>
        
        <motion.div
          initial={{x:-100,opacity:0}}
          animate={{x:0,opacity:1}}
          transition={{duration:0.5,delay:2}}
        > 
         <img src={lenovo} alt="Logo" className="lenovo" />
        </motion.div>
      </div>
      <h1 className='h1'>Choose Your Laptop</h1>
      <form className = 'form' onSubmit={handleSubmit}>
        <motion.div className="form-group">
          <label>
            <motion.select 
              name="brand" 
              value={formData.brand} 
              onChange={handleChange} 
              onFocus={() => handleFocus(brandControls)}
              onBlur={() => handleBlur(brandControls)}
              required
              animate={brandControls}
              style={{marginTop:'20px'}}
              className="select-brand"
            >
              <option value="">Select by Brand</option>
              <option value="Acer">Acer</option>
              <option value="Apple">Apple</option>
              <option value="Asus">Asus</option>
              <option value="Chuwi">Chuwi</option>
              <option value="Dell">Dell</option>
              <option value="HP">HP</option>
              <option value="Lenovo">Lenovo</option>
              <option value="MSI">MSI</option>
            </motion.select>
          </label>
          <label>
            <motion.select 
              name="processor" 
              value={formData.processor} 
              onChange={handleChange} 
              onFocus={() => handleFocus(processorControls)}
              onBlur={() => handleBlur(processorControls)}
              required
              animate={processorControls}
              style={{marginLeft:'220px',marginTop:'-45px'}}
              className="select-processor"
            >
              <option value="">Select by Processor</option>
              <option value="Intel Core i3">Intel Core i3</option>
              <option value="Intel Core i5">Intel Core i5</option>
              <option value="Intel Core i7">Intel Core i7</option>
              <option value="Intel Celeron Dual Core">Intel Celeron Dual Core</option>
              <option value="Intel Pentium Quad Core">Intel Pentium Quad Core</option>
              <option value="AMD Ryzen 3">AMD Ryzen 3</option>
              <option value="AMD Ryzen 5">AMD Ryzen 5</option>
              <option value="AMD Ryzen 7">AMD Ryzen 7</option>
              <option value="AMD Ryzen 9">AMD Ryzen 9</option>
            </motion.select>
          </label>
          <label>
            <motion.select 
              name="ram" 
              value={formData.ram} 
              onChange={handleChange} 
              onFocus={() => handleFocus(ramControls)}
              onBlur={() => handleBlur(ramControls)}
              required
              animate={ramControls}
              style={{marginLeft:'440px',marginTop:'-53px'}}
              className="select-ram"
            >
              <option value="">Select by RAM</option>
              <option value="4GB">4GB</option>
              <option value="8GB">8GB</option>
              <option value="12GB">12GB</option>
              <option value="16GB">16GB</option>
              <option value="32GB">32GB</option>
              <option value="64GB">64GB</option>
            </motion.select>
          </label>
          <label>
            <motion.select 
              name="gpu" 
              value={formData.gpu} 
              onChange={handleChange} 
              onFocus={() => handleFocus(gpuControls)}
              onBlur={() => handleBlur(gpuControls)}
              required
              animate={gpuControls}
              style={{marginLeft:'660px',marginTop:'-62px'}}
              className="select-gpu"
            >
              <option value="">Select by GPU</option>
              <option value="Intel HD Graphics 400">Intel HD Graphics 400</option>
              <option value="Intel HD Graphics 500">Intel HD Graphics 500</option>
              <option value="Intel HD Graphics 520">Intel HD Graphics 520</option>
              <option value="Intel HD Graphics 620">Intel HD Graphics 620</option>
              <option value="Intel Iris Plus Graphics 640">Intel Iris Plus Graphics 640</option>
              <option value="Nvidia GeForce 940MX">Nvidia GeForce 940MX</option>
              <option value="Nvidia GeForce MX130">Nvidia GeForce MX130</option>
              <option value="Nvidia GeForce MX150">Nvidia GeForce MX150</option>
              <option value="Nvidia GeForce GTX 1050">Nvidia GeForce GTX 1050</option>
              <option value="Nvidia GeForce GTX 1070">Nvidia GeForce GTX 1070</option>
              <option value="NVIDIA GeForce RTX 2060">NVIDIA GeForce RTX 2060</option>
              <option value="NVIDIA GeForce RTX 3060">NVIDIA GeForce RTX 3060</option>
              <option value="AMD Radeon RX 5500M">AMD Radeon RX 5500M</option>
              <option value="AMD Radeon RX 5600M">AMD Radeon RX 5600M</option>
              <option value="AMD Radeon RX 5700M">AMD Radeon RX 5700M</option>
            </motion.select>
          </label>
        </motion.div>
        <button className='submit' type="submit">Search</button>
      </form>
      {result.details && (
        <div className="laptop-details">
          <div className="card">
            <ul>
              {Object.keys(result.details).map(key => (
                <li key={key}><strong>{key}:</strong> {result.details[key]}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
