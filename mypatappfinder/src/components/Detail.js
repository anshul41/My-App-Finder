import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Detail = ({ match }) => {
  let [app, setApp] = useState([]);
  let [images, setImages] = useState([]);
  let [videos, setVideos] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:4200/apps/${match.params.id}`).then((res) => {
      setApp(res.data);
      setImages(
        res.data.images.map((image) => (
          <div className='col-md-3'>
            <img key={app._id} alt='' src={image} height='300' width='200' />
          </div>
        ))
      );
      setVideos(
        res.data.videos.map((video) => (
          <div className='col-md-3'>
            <iframe
              key={app._id}
              className='iframe'
              title={app.name}
              width='300'
              height='200'
              src={video}
            ></iframe>
          </div>
        ))
      );
    });
  }, [match.params.id, app.name, app._id]);

  return (
    <div className='App container'>
      <div className='row'>
        <div className='col-md-4'>
          <img alt={app.name} src={app.mainImage} height='300' width='300' />
        </div>
        <div className='col-md-8 center'>
          <span>{app.name}</span>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6 desc descScroll'>
        <div className='row'>
            <div className='col-md-12'>Description:</div>
          </div>
          <div className='row'>
            <div className='col-md-12'>{app.description}</div>
          </div>
          </div>
        <div className='col-md-6 desc'>
          <div className='row'>
            <div className='col-md-12'>Details</div>
          </div>
          <div className='row'>
            <div className='col-md-6'>Size:</div>
            <div className='col-md-6'>{app.Size}</div>
          </div>
          <div className='row'>
            <div className='col-md-6'>Ratings:</div>
            <div className='col-md-6'>{app.ratings}</div>
          </div>
          <div className='row'>
            <div className='col-md-6'>Last Updated:</div>
            <div className='col-md-6'>{app.Updated}</div>
          </div>
          <div className='row'>
            <div className='col-md-6'>Android version required:</div>
            <div className='col-md-6'>{app.RequiresAndroid}</div>
          </div>
          <div className='row'>
            <div className='col-md-6'>Installs:</div>
            <div className='col-md-6'>{app.Installs}</div>
          </div>
          <div className='row'>
            <div className='col-md-6'>Developer:</div>
            <div className='col-md-6'>{app.OfferedBy}</div>
          </div>
        </div>
      </div>
      <div
        className='row'
        style={{
          display: 'inline-flex',
          maxWidth: '116rem',
          overflowX: 'scroll',
        }}
      >
        {videos}
        {images}
      </div>
    </div>
  );
};

export default Detail;
