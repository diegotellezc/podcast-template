const getJson = () => {
  fetch("https://jsonblob.com/api/jsonBlob/1126571113533685760")
    .then((res) => res.json())
    .then((data) => console.log(data));
};

getJson();
