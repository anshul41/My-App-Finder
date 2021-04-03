const axios = require('axios');
const express = require('express');
const { default: parse } = require('node-html-parser');
const connectDB = require('./config/db');
const Apps = require('./Models/Application');
const cors = require('cors');
const mongoUri = process.env.Mongo_Key || "dev_uri";
connectDB(mongoUri);
console.log(mongoUri);
const app = express();
const port = process.env.PORT || 4200;
app.use(cors());

const getAllApps = async () => {
  const response = await axios.get(
    'https://play.google.com/store/apps/collection/topselling_free'
  );
  const data = response.data;
  const root = parse(data);
  const body = root.querySelector('body');
  const apps = Array.from(body.querySelectorAll('.b8cIId.ReQCgd.Q9MA7b')).map(
    (app) => app.firstChild._attrs['href']
  );
  for (let i = 0; i < apps.length; i++) await getAppData(apps[i]);
};

const getAppData = async (appid) => {
  const response = await axios.get('https://play.google.com' + appid);
  const data = response.data;
  const parsed = parse(data);
  const body = parsed.querySelector('body');
  const Datakeys = Array.from(body.querySelectorAll('.BgcNfc')).map((app) =>
    app.firstChild.rawText.replace(' ', '')
  );
  const Datavalues = Array.from(body.querySelectorAll('.IQ1z0d > .htlgb')).map(
    (app) => app.firstChild.rawText
  );
  const appName = parsed.querySelector('title').firstChild.rawText.toString().replace('&amp; ','').replace('- Apps on Google Play','');
  const images = Array.from(body.querySelectorAll('.Q4vdJd')).map((app) => {
    if (
      app.firstChild._attrs['src'] &&
      app.firstChild._attrs['src'].toString().startsWith('https')
    )
      return app.firstChild._attrs['src'];
    return app.firstChild._attrs['data-src'];
  });
  const image = Array.from(body.querySelectorAll('.xSyT2c')).map(
    (app) => app.firstChild._attrs['src']
  );
  const videos = Array.from(body.querySelectorAll('.TdqJUe')).map(
    (app) => app.firstChild._attrs['data-trailer-url']
  );
  const description = Array.from(body.querySelectorAll('.W4P4ne'))[0][
    'childNodes'
  ][1]._attrs.content;
  const ratings = Array.from(body.querySelectorAll('.BHMmbe'))[0][
    'childNodes'
  ][0]['rawText'];
  let singleAppData = {
    name: appName,
    mainImage: image[0],
    images: images,
    videos: videos,
    description: description,
    ratings: ratings,
    appid:appid.replace('/store/apps/details?id=','')
  };
  Datakeys.forEach((key, index) => {
    singleAppData[key] = Datavalues[index];
  });

  await Apps.findOneAndUpdate(
    { name: singleAppData.name },
    { $set: singleAppData },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return singleAppData;
};



app.get('/api', async (req, res) => {
  res.json({ msg: 'Api Is Running' });
});

app.get('/api/apps', async (req, res) => {
  try{
  let apps = await Apps.find().select(['name', 'mainImage','ratings','OfferedBy','appid']);
  if (Array.from(apps).length == 0) {
    await getAllApps();
    apps = await Apps.find().select(['name', 'mainImage','ratings','OfferedBy','appid']);
  }
  res.json(apps);
}
  catch(err)
  {
    console.log(err);
    res.status(400).json({msg:'server error'});
  }
});

app.get('/api/apps/update', async (req, res) => {
  try{
    await getAllApps();
  let apps = await Apps.find().select(['name', 'mainImage','ratings','OfferedBy','appid']);
  res.json(apps);
  }
  catch(err)
  {
    console.log(err);
    res.status(400).json({msg:'server error'});
  }
  
});

app.get('/api/apps/:id', async (req, res) => {
  const app = await Apps.findOne({ appid: req.params.id })
  res.json(app);
});


app.use(express.static('build'));
app.use('*', express.static('build/index.html'));
app.listen(port, () => console.log(`Example app listening on ${port} port!`));
