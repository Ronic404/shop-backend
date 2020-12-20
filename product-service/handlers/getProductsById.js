const data = require('../mockData');

export default async function getProductById(id) {
  const product = data.find(el => el.id === id);

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
