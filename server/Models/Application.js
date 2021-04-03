const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  mainImage: {
    type: String,    
  },
  images: {
    type: [String],
  },
  videos: {
    type: [String],
  },
  description:{
    type: String,  
  },
  Updated: {
    type: String,    
  },
Size: {
    type: String,    
  },
Installs: {
    type: String,    
  },
CurrentVersion: {
    type: String,    
  },
RequiresAndroid: {
    type: String,    
  },
ContentRating: {
    type: String,    
  },
OfferedBy: {
    type: String,    
  },
  ratings: {
    type: String,    
  },
  appid: {
    type: String,    
  }
});

module.exports = mongoose.model('app', AppSchema);
