import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Landing = () => {
  const BaseUrl = 'http://localhost:4200/apps/';
  let [apps, setApps] = useState([]);
  let [updationProcess, setUpdationProcess] = useState(false);
  useEffect(() => {
    axios.get(BaseUrl).then((res) => {
      setApps(res.data);
    });
  }, []);

  const updateApps = () => {
    setUpdationProcess(true);
    axios.get(`${BaseUrl}update`).then((res) => {
      console.log('apps updated');
      setApps(res.data);
      setUpdationProcess(false);
    });
  };
  apps = apps.map((app) => (
    <div key={app._id}>
      <a href={BaseUrl + app.appid}>{app.name}</a>
      <h1>{app.name}</h1>
      <img alt={app.name} src={app.mainImage} height='100' width='100' />
    </div>
  ));
  return (
    <div className='App container'>
      <button disabled={updationProcess} onClick={updateApps}>
        Update Apps
      </button>
      Total Apps: {apps.length}
      {apps}
    </div>
  );
};

export default Landing;
