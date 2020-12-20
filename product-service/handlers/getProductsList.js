const data = require('../mockData');

export default async function getProductList() {
  console.log('sagsdfgsdhsdfgsdgsdfgsdgsdfgsdfgsdfgsdfg');
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
