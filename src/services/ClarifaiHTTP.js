const USER_ID = 'fynik';
const PAT = '8836c6f6f4b045529164009e9e521a46';
const APP_ID = 'faceid';
const MODEL_ID = 'face-detection';


const getFaceDetection = (imageURL) => {
  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": imageURL
                }
            }
        }
    ]
  });
  
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  const req = fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, requestOptions);

  return req.then(response => response.json());
}

const ClarifaiHTTP = { getFaceDetection }

export default ClarifaiHTTP;