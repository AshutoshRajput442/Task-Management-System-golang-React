/* package controllers

import (
	"backend/config"
	"backend/models"
	"backend/utils"
	"encoding/json"
	"net/http"
)

func GetUserProfile(w http.ResponseWriter, r *http.Request) {
	email, err := utils.ValidateAuthToken(r)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	row := config.DB.QueryRow("SELECT id, name, email FROM users WHERE email = ?", email)

	var user models.User
	err = row.Scan(&user.ID, &user.Name, &user.Email)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(user)
} */

/*package  controllers

import (
	"backend/config"
	"backend/utils"
	"encoding/json"
	"net/http"
)

type UpdateProfileInput struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

func UpdateUserProfile(w http.ResponseWriter, r *http.Request) {
	email, err := utils.ValidateAuthToken(r)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var input UpdateProfileInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	hashedPassword, err := utils.HashPassword(input.Password)
	if err != nil {
		http.Error(w, "Password hashing failed", http.StatusInternalServerError)
		return
	}

	_, err = config.DB.Exec(
		"UPDATE users SET name = ?, password = ? WHERE email = ?",
		input.Name,
		hashedPassword,
		email,
	)

	if err != nil {
		http.Error(w, "Update failed", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Profile updated successfully"))
}
*/

package controllers

import (
	"backend/config"
	"backend/models"
	"backend/utils"
	"encoding/json"
	"net/http"
)

func GetUserProfile(w http.ResponseWriter, r *http.Request) {
	// Extract email from token
	email, err := utils.ValidateAuthToken(r)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Query user by email
	row := config.DB.QueryRow("SELECT id, name, email FROM users WHERE email = ?", email)

	var user models.User
	err = row.Scan(&user.ID, &user.Name, &user.Email)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Set content-type header
	w.Header().Set("Content-Type", "application/json")

	// Send user data as JSON (password excluded due to json:"-")
	json.NewEncoder(w).Encode(user)
}
