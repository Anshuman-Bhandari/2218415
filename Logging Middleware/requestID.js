import axios from 'axios';

const data = {
  email: "anshuman.23.2004@gmail.com",
  name: "Anshuman Bhandari",
  mobileNo: "9557868051",
  githubUsername: "Anshuman-Bhandari",
  rollNo: "2218415",
  accessCode: "QAhDUr"
};

axios.post('http://20.244.56.144/evaluation-service/register', data)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.response?.data || error.message);
  });
