import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('income');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddTransaction = async () => {
    try {
      await axios.post('http://localhost:5000/api/transactions', {
        description,
        amount,
        type,
      });
      setDescription('');
      setAmount(0);
      setType('income');
      fetchData();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="container">
      <h1>Money Tracker</h1>
      <div>
        <label>Description: &nbsp;
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /></label>
      </div>
      <div>
        <label>Amount: &nbsp;
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        /></label>
      </div>
      <div>
        <label>Type: &nbsp;
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select></label>
      </div>
      <button onClick={handleAddTransaction}>Add Transaction</button>
      <div>
        <h2>Transactions</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              {transaction.description} - {transaction.amount} ({transaction.type})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
