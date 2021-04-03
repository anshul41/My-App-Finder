import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Landing = ({history}) => {
  const BaseUrl = '/api/apps/';
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
      setApps(res.data);
      setUpdationProcess(false);
    });
  };
  apps = apps.map((app) => (
    <div onClick={()=>history.push('/apps/' + app.appid)} className='card' style={{ width: '18rem' }} key={app._id}>
     
        <img src={app.mainImage} className='card-img-top' alt='...' />        <div className='card-body'>
          <h5 className='card-title'>            
            {app.name
              .replace('&amp; ', '')
              .replace('- Apps on Google Play', '')}
          </h5>
          <h5 className='card-title'> Ratings:{app.ratings}</h5>
          <h5 className='card-title'> Developer:{app.OfferedBy}</h5>
        </div>      
    </div>
  ));
  return (
    <div className='App container'>   
        
        <div className='header-right'>
          <span>
            <button
              className='btn btn-success'
              disabled={updationProcess}
              onClick={updateApps}
            >
              {updationProcess ? 'In-Progress' : 'Update Apps'}
            </button>
          </span>
        </div>
    
      <div className='wrapper'>{apps}</div>
    </div>
  );
};

export default Landing;
