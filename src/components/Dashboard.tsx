// src/components/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getEnv } from '../env';

const Dashboard: React.FC = () => {
  const [states, setStates] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const homeAssistantApi = getEnv('REACT_APP_HOME_ASSISTANT_API');
      const accessToken = getEnv('REACT_APP_ACCESS_TOKEN');

      if (!homeAssistantApi || !accessToken) {
        console.warn('Missing Home Assistant env vars, skipping dashboard fetch.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${homeAssistantApi}/api/states`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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
