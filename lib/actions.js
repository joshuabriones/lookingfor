export const register = async (email, password) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
