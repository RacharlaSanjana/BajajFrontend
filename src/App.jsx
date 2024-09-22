import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Select from 'react-select';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [message, setMessage] = useState('');

  const handleJsonInputChange = (event) => {
    setJsonInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const json = JSON.parse(jsonInput);

  
      setResponseData(null);
      setSelectedFilters([]);
      setMessage('');

      const response = await axios.post('https://bajajbackend-bbbx.onrender.com/bfhl', json);
      setResponseData(response.data);
      setJsonInput('');
      setMessage('Request successful!');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Invalid JSON input');
      setResponseData(null);
    }
  };

  const handleFilterChange = (selectedOptions) => {
    setSelectedFilters(selectedOptions.map(option => option.value));
  };

  const filterOptions = [
    { value: 'characters', label: 'Characters' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highestAlphabet', label: 'Highest Alphabet' },
    { value: 'highestLowercase', label: 'Highest Lowercase' }  
  ];

  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: 'black',
    }),
  };

  return (
    <div className="App">
      <h1>Enter API input</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleJsonInputChange}
          placeholder="Enter JSON"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>

      {responseData && (
        <div className="response-section">
          <h2>Filtered Response</h2>
          <Select
            isMulti
            options={filterOptions}
            onChange={handleFilterChange}
            placeholder="Select filters"
            styles={customStyles}
            value={filterOptions.filter(option => selectedFilters.includes(option.value))}
          />
          <div className="filtered-response">
            {selectedFilters.includes('characters') && responseData.alphabets.length > 0 && (
              <div>
                <h3>Characters</h3>
                <ul>
                  {responseData.alphabets.map((char, index) => (
                    <li key={index}>{char}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedFilters.includes('numbers') && responseData.numbers.length > 0 && (
              <div>
                <h3>Numbers</h3>
                {responseData.numbers.map((num, index) => (
                  <span key={index} style={{ marginRight: '10px' }}>{num}</span>
                ))}
              </div>
            )}

            {selectedFilters.includes('highestAlphabet') && responseData.alphabets.length > 0 && (
              <div>
                <h3>Highest Alphabet</h3>
                <ul>
                  {responseData.alphabets.map((char, index) => (
                    <li key={index}>{char}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedFilters.includes('highestLowercase') && responseData.highest_lowercase.length > 0 && (
              <div>
                <h3>Highest Lowercase Character</h3>
                <ul>
                  {responseData.highest_lowercase.map((char, index) => (
                    <li key={index}>{char}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
