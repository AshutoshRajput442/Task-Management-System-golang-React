package controllers

import (
	"backend/config"
	"backend/models"
	"backend/utils"
	"encoding/json"
	"net/http"
)

func GetUserProfile(w http.ResponseWriter, r *http.Request) {
	userID, err := utils.ValidateAuthToken(r)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	row := config.DB.QueryRow("SELECT id, name, email FROM users WHERE id = ?", userID)

	var user models.User
	err = row.Scan(&user.ID, &user.Name, &user.Email)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(user)
}
