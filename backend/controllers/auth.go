package controllers

import (
	"backend/config"
	"backend/models"
	"backend/utils"
	"encoding/json"
	"fmt"
	"net/http"
)

// Signup handles user registration
func Signup(w http.ResponseWriter, r *http.Request) {
	var user models.User

	// Decode JSON request body into user struct
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid input data", http.StatusBadRequest)
		return
	}

	// Validate required fields: Name, Email, and Password
	if user.Name == "" || user.Email == "" || user.Password == "" {
		http.Error(w, "Name, Email, and Password are required", http.StatusBadRequest)
		return
	}

	// Hash the plain password using bcrypt
	hashedPwd, err := utils.HashPassword(user.Password)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}

	// Debug: print hashed password (optional)
	fmt.Printf("Hashed password: %s\n", hashedPwd)
	fmt.Printf("user.Name: %s\n", user.Name)
	fmt.Printf("user.Email: %s\n", user.Email)
	fmt.Printf("user.Password: %s\n", user.Password)

	// Insert new user into the database with hashed password
	_, err = config.DB.Exec("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
		user.Name, user.Email, hashedPwd)
	if err != nil {
		http.Error(w, "Signup failed", http.StatusInternalServerError)
		return
	}

	// Send success response with 201 status code
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Signup successful",
	})
}

func Login(w http.ResponseWriter, r *http.Request) {
	var input models.User
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	// Now also selecting name and email from DB
	row := config.DB.QueryRow("SELECT id, name, email, password FROM users WHERE email = ?", input.Email)

	var id int
	var name, email, hashedPwd string
	err := row.Scan(&id, &name, &email, &hashedPwd)
	if err != nil {
		fmt.Println("DB Scan error:", err)
		http.Error(w, "Invalid email", http.StatusUnauthorized)
		return
	}
	fmt.Println("Hashed password from DB:", hashedPwd)
	fmt.Println("--------------------")

	fmt.Println("Password from user input:", input.Password)

	if !utils.CheckPassword(hashedPwd, input.Password) {
		fmt.Println("Password mismatch")
		http.Error(w, "Invalid password", http.StatusUnauthorized)
		return
	}

	// Generate JWT token - assume you have GenerateJWT implemented
	token, err := utils.GenerateJWT(id, email)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// Send full data
	json.NewEncoder(w).Encode(map[string]string{
		"token": token,
		"name":  name,
		"email": email,
	})
}
