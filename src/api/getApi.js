export const getIceApi = () => {
  return fetch("http://localhost:3000/ice-cream").then((res) => res.json());
};
