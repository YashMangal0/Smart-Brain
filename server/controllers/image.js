const returnClarifaiRequest=(imageUrl)=>{
  const PAT = '2f9964144a8c410f9c07bf8edf60e9ba';
  const USER_ID = 't1c533y5fyara';       
  const APP_ID = 'my-first-application-a6in7w';
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;
  
  const raw = JSON.stringify({
   "user_app_id": {
       "user_id": USER_ID,
       "app_id": APP_ID
   },
   "inputs": [
       {
           "data": {
               "image": {
                   "url": IMAGE_URL
               }
           }
       }
   ]
  });
  return {
   method: 'POST',
   headers: {
       'Accept': 'application/json',
       'Authorization': 'Key ' + PAT
   },
   body: raw
  };
  }
const handleApiCall=(req,res)=>{
  fetch("https://api.clarifai.com/v2/models/" + 'face-detection'  + "/outputs", returnClarifaiRequest(req.body.input))
  .then(data=>{
    res.json(data);
  })
  .catch(err=>res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}