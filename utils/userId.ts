export function userId() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decodedToken = JSON.parse(atob(token.split(".")[1] || ""));
    return decodedToken?.entityId || null;
  } catch {
    return null;
  }
}
