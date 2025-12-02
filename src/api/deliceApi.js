
export const delIceApi = (id) => {
  return fetch(`http://localhost:3000/ice-cream/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
