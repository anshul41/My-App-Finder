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
          <img src={image} height='300' width='100' />
        ))
      );
      setVideos(
        res.data.videos.map((video) => (
          <iframe width='300' height='200' src={video}></iframe>
        ))
      );
      console.log(res.data);
    });
  }, []);

  return (
    <div className='App container'>
      <img alt={app.name} src={app.mainImage} height='100' width='100' />
      {app.name}
      {app.description}
      {app.Updated}
      {app.ratings}
      {images}
      {videos}
      {app.Installs}
      {app.OfferedBy}
      {app.RequiresAndroid}
      {app.Size}
    </div>
  );
};

export default Detail;
