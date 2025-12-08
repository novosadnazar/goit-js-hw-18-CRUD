
export const getIceApi = async () => {
  const res = await fetch("http://localhost:3000/ice-cream")
  return res.json()
};
