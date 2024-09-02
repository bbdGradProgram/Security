const handleErrors = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  
  const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    if (err.message.includes("not found")) {
      res.status(404).send(err.message);
    } else if (err.message.includes("Invalid")) {
      res.status(400).send(err.message);
    } else {
      res.status(500).send("Internal Server Error");
    }
  };
  
  module.exports = { handleErrors, errorHandler };
  