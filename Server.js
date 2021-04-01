const axios = require('axios');
const express = require('express');
const { default: parse } = require('node-html-parser');
const connectDB= require('./config/db');

connectDB();
const app = express();
const port = process.env.PORT || 3000;

const getAllApps=async ()=>{
    const response = await axios.get('https://play.google.com/store/apps/collection/topselling_free');
    const data = response.data;  
    const root = parse(data);
    const output=[]
    const body = root.querySelector('body');
    const apps = Array.from(body.querySelectorAll('.b8cIId.ReQCgd.Q9MA7b')).map(
      (app) => app.firstChild._attrs['href']
    );
      for(let i=0;i<apps.length;i++)
       output.push(await getAppData(apps[i]));
       console.log(output.length)
    return output.length;
}

const getAppData=async (appid)=>{
    const response = await axios.get('https://play.google.com' + appid);
    const data = response.data; 
    const parsed=parse(data);
    const body = parsed.querySelector('body');
    const Datakeys = Array.from(body.querySelectorAll('.BgcNfc')).map(
      (app) => app.firstChild.rawText.replace(" ","")
    );    
    const Datavalues = Array.from(body.querySelectorAll('.IQ1z0d > .htlgb')).map(
      (app) => app.firstChild.rawText
    );
    const appName = parsed.querySelector('title').firstChild.rawText;
    const images=Array.from(body.querySelectorAll('.Q4vdJd')).map(      
      (app) => {
          if(app.firstChild._attrs['src'] && app.firstChild._attrs['src'].toString().startsWith("https"))
          return app.firstChild._attrs['src'];
          return app.firstChild._attrs['data-src'];  
      }
    );
    const image=Array.from(body.querySelectorAll('.xSyT2c')).map(
      (app) => app.firstChild._attrs['src']
    );
    const videos=Array.from(body.querySelectorAll('.TdqJUe')).map(
      (app) => app.firstChild._attrs['data-trailer-url']
    );
    const description=Array.from(body.querySelectorAll('.W4P4ne'))[0]['childNodes'][1]._attrs.content;
      let singleAppData={
      name:appName,
      mainImage:image[0],
      images:images,
      videos:videos,
      description:description
  }
  Datakeys.forEach((key,index)=>{singleAppData[key]=Datavalues[index]});
  return singleAppData;
}

app.get('/', async (req, res) => {     
    res.json({msg:"Api Is Running"});    
  });

app.get('/apps', async (req, res) => {     
  res.json(await getAllApps());    
});

app.get('/apps/details/:name', async (req, res) => {     
    res.json({msg:req.params.name});    
  });

app.listen(port, () => console.log(`Example app listening on port port!`));
