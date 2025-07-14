// test_similarity_api.js
// Test script for the /api/similarity_qwer endpoint using axios and form-data

const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function testSimilarityApi(imagePath) {
  const form = new FormData();
  form.append('image', fs.createReadStream(imagePath));

  try {
    const response = await axios.post('http://localhost:5000/api/similarity_qwer', form, {
      headers: form.getHeaders(),
    });
    console.log('API Response:', response.data);
  } catch (err) {
    if (err.response) {
      console.error('API Error:', err.response.data);
    } else {
      console.error('Request Error:', err.message);
    }
  }
}

// Usage: node test_similarity_api.js /path/to/image.jpg
if (require.main === module) {
  const imagePath = process.argv[2];
  if (!imagePath) {
    console.error('Usage: node test_similarity_api.js /path/to/image.jpg');
    process.exit(1);
  }
  testSimilarityApi(imagePath);
}
