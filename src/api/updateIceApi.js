
export const updateIceApi = async (id, icecrem) => {
  const options = {
    method: "PUT",
    body: JSON.stringify(icecrem),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`http://localhost:3000/ice-cream/${id}`, options);
return res.json()

};
