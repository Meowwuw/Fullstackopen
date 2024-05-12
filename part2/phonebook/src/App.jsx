import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        showNotification('Failed to fetch data', 'error');
      });
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [notification]);


  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };


  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      axios.delete(`http://localhost:3001/persons/${id}`)
        .then(response => {

          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          showNotification('The person has already been removed from the server', 'error');
          setPersons(persons.filter(person => person.id !== id));
        });

    }
  };

  const handleAddOrUpdate = (event) => {
    event.preventDefault();
    const person = persons.find(p => p.name === newName);
    const personObject = { name: newName, number: newNumber };

    if (person) {
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        axios.put(`http://localhost:3001/persons/${person.id}`, personObject)
          .then(response => {
            setPersons(persons.map(p => p.id !== person.id ? p : response.data));
            showNotification(`Updated ${newName} successfully`, 'success');
            setNewName('');
            setNewNumber('');
          }).catch(error => {
            showNotification('Failed to update person', 'error');
          });
      }
    } else {
      axios.post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          showNotification(`Added ${newName} successfully`, 'success');
          setNewName('');
          setNewNumber('');
        }).catch(error => {
          showNotification('Failed to add person', 'error');
        });
    }
  };


  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddOrUpdate}>
        {notification && (
          <div style={{ color: notification.type === 'success' ? 'green' : 'red' }}>
            {notification.message}
          </div>
        )}
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          number: <input value={newNumber} onChange={handleNumberChange} />
          <button type="submit">add</button>
          <input value={filter} onChange={handleFilterChange} placeholder="Search..." />
        </div>
      </form>

      <h2>Numbers</h2>
      {personsToShow.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );

};

export default App;
