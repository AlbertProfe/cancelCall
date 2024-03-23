
import './App.css'
import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = "https://65e82ef64bb72f0a9c4e7caf.mockapi.io/v1/todo";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      // Clean-up function to cancel axios request
      // This function will be called when the component unmounts or re-renders
      // before the new effect is run, allowing us to prevent memory leaks
      // by canceling any pending requests.
      const source = axios.CancelToken.source();
      source.cancel("Operation canceled by cleanup function.");
    };
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h1>My Component to cancel useEffect</h1>
      <ul>
        <li>
          <a href={`${BASE_URL}/link1`}>Link 1</a>
        </li>
        <li>
          <a href={`${BASE_URL}/link2`}>Link 2</a>
        </li>
        <li>
          <a href={`${BASE_URL}/link3`}>Link 3</a>
        </li>
      </ul>
      {data && (
        <div>
          <h2>Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};


export default App
