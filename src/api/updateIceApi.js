
export const updateIceApi = (id, icecrem) => {
  const options = {
    method: "PUT",
    body: JSON.stringify(icecrem),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(`http://localhost:3000/ice-cream/${id}`, options).then((res) =>
    res.json()
  );
};
