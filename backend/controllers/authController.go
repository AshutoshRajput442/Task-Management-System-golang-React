package controllers

import (
	"backend/config"
	"backend/models"
	"backend/utils"
	"encoding/json"
	"net/http"
)

func Signup(w http.ResponseWriter, r *http.Request) {
	var user models.User
	json.NewDecoder(r.Body).Decode(&user)

	hashedPassword, _ := utils.HashPassword(user.Password)

	_, err := config.DB.Exec("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", user.Name, user.Email, hashedPassword)
	if err != nil {
		http.Error(w, "Signup failed", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Signup successful"})
}
func Login(w http.ResponseWriter, r *http.Request) {
	var input models.User
	json.NewDecoder(r.Body).Decode(&input)

	// Now also selecting name and email from DB
	row := config.DB.QueryRow("SELECT id, name, email, password FROM users WHERE email = ?", input.Email)

	var id int
	var name, email, hashedPwd string
	err := row.Scan(&id, &name, &email, &hashedPwd)
	if err != nil {
		http.Error(w, "Invalid email", http.StatusUnauthorized)
		return
	}

	if !utils.CheckPassword(hashedPwd, input.Password) {
		http.Error(w, "Invalid password", http.StatusUnauthorized)
		return
	}

	token, _ := utils.GenerateJWT(id, email)

	// Send full data
	json.NewEncoder(w).Encode(map[string]string{
		"token": token,
		"name":  name,
		"email": email,
	})
}
