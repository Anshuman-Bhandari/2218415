import axios from 'axios';

export const Log = async (stack, level, packageName, message) => {
  try {
    await axios.post('http://20.244.56.144/evaluation-service/log', {
      stack,
      level,
      package: packageName,
      message
    });
  } catch (error) {
  }
};
