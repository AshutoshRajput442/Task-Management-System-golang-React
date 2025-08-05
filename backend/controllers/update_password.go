package controllers

import (
	"backend/config"
	"backend/utils"
	"encoding/json"
	"net/http"
)

type UpdatePasswordRequest struct {
	Password string `json:"password"`
}

func UpdatePassword(w http.ResponseWriter, r *http.Request) {
	email, err := utils.ValidateAuthToken(r)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var req UpdatePasswordRequest
	err = json.NewDecoder(r.Body).Decode(&req)
	if err != nil || req.Password == "" {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	hashedPwd, err := utils.HashPassword(req.Password)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}

	_, err = config.DB.Exec("UPDATE users SET password = ? WHERE email = ?", hashedPwd, email)
	if err != nil {
		http.Error(w, "Failed to update password", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Password updated successfully"})
}
