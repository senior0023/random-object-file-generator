const endPoint = process.env.REACT_APP_END_POINT;

/**
 * Get generated summary informaion from backend
 * @returns {Object}
 */
export const generate = async () => {
  const code = "Start Generating";

  return fetch(`${endPoint}/api/service/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};
