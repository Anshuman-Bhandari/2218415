import axios from 'axios';

const userInfo = {
  email: "anshuman.23.2004@gmail.com",
  name: "Anshuman Bhandari",
  mobileNo: "9557868051",
  githubUsername: "Anshuman-Bhandari",
  rollNo: "2218415",
  accessCode: "QAhDUr"
};

axios.post('http://20.244.56.144/evaluation-service/register', userInfo)
  .then(res => {
    console.log("Response:", res.data);
  })
  .catch(err => {
    console.error("Error:", err.response?.data || err.message);
  });
