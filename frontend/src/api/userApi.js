const API_BASE_URL = "http://localhost:8080";

// Fetch the user profile
export const fetchUserProfile = async (token) => {
  const res = await fetch(`${API_BASE_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return res.json();
};

// Update user password
export const updateUserPassword = async (token, password) => {
  const res = await fetch(`${API_BASE_URL}/update-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  });

  if (!res.ok) {
    throw new Error("Failed to update password");
  }

  return res.json();
};
