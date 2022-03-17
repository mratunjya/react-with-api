import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

const loadData = (setPersonData, setIsLoading, setIsError, personNumber) => {
  setIsLoading(true);
    axios.get(`https://jsonplaceholder.typicode.com/users/${personNumber}`)
      .then(res => {
        const persons = res.data;
        setIsLoading(false);
        setIsError(false);
        setPersonData(persons);
        console.log(res.data);;
      }).catch(err => {
        setIsLoading(false);
        setIsError(true);
      });
}

function App() {
  const [personData, setPersonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [personNumber, setPersonNumber] = useState(1);

  useEffect(() => {
    loadData(setPersonData, setIsLoading, setIsError, personNumber);
  }, [personNumber])

  /*Do Mapping of personsData */
  // const persons = personData && personData.map(person => {
  //   return (
  //     <div key={person.id}>
  //       <h3>{person.name}</h3>
  //       <p>{person.email}</p>
  //     </div>
  //   )
  // })

  const personDetails = personData && <div key={personData.id}>
    <h3>{personData.name}</h3>
    <p>{personData.email}</p>
    </div>

  return (
    <>
      {isLoading ? <h1>Loading...</h1> : isError ? <h1>Error...</h1> : personDetails}
      <div className="buttons">
        <button onClick={() => setPersonNumber(personNumber - 1)}>Previous</button>
        <button onClick={() => setPersonNumber(personNumber + 1)}>Next</button>
      </div>
    </>
  )
}

export default App