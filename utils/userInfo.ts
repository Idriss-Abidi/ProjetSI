export async function getUserInfo(token: string | null): Promise<any> {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch("http://89.168.40.93/user-info", requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json(); // Assuming the response is JSON
    return result; // Return the fetched data
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
