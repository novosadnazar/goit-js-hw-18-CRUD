
export const delIceApi = async (id) => {
const res = await fetch(`http://localhost:3000/ice-cream/${id}`, {
    method: "DELETE",
  })
  return res.json()
};
