const mockAtomKey = () =>
  Array.from({ length: 10 })
    .map(() => Math.round(Math.random() * 9))
    .join("");

export default mockAtomKey;
