const handleRequest = require('../server/server');

module.exports = async (req, res) => {
  return handleRequest(req, res);
};
