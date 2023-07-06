const getJSON = () => {
  return fetch("https://jsonblob.com/api/jsonBlob/1126571113533685760")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

module.exports = getJSON;
