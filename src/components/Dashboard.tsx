// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [states, setStates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_HOME_ASSISTANT_API}/api/states`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });

        setStates(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Home Assistant Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>List of States:</h3>
          <ul>
            {states.map((state) => (
              <li key={state.entity_id}>
                {state.entity_id}: {state.state}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
