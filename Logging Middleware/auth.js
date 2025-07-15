import axios from 'axios';

const authData = {
  email: "anshuman.23.2004@gmail.com",
  name: "Anshuman Bhandari",
  rollNo: "2218415",
  accessCode: "QAhDUr",
  clientID: "19ce19ff-bb25-4ffd-b7ce-bf5b31656d2b",
  clientSecret: "bajRuRrerpYwGCcK"
};

axios.post('http://20.244.56.144/evaluation-service/auth', authData)
  .then(response => {
    const token = response.data.access_token;
    console.log("Bearer Token:", token);
    return axios.get('http://20.244.56.144/evaluation-service/some-protected-route', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  })
  .then(res => {
    console.log("Protected API response:", res.data);
  })
  .catch(error => {
    console.error("Error:", error.response?.data || error.message);
  });
