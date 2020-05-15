export const getUUID = () => { // UUID v4 generator in JavaScript (RFC4122 compliant)
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 3 | 8);
    return v.toString(16);
  });
};
