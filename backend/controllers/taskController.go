package controllers

import (
	"backend/config"
	"backend/models"
	"backend/utils"
	"encoding/json"
	"fmt"
	"net/http"
)

// func CreateTask(w http.ResponseWriter, r *http.Request) {
// 	userID, err := utils.ValidateAuthToken(r)
// 	if err != nil {
// 		http.Error(w, "Unauthorized", http.StatusUnauthorized)
// 		return
// 	}

// 	var email string
// 	err = config.DB.QueryRow("SELECT email FROM users WHERE id = ?", userID).Scan(&email)
// 	if err != nil {
// 		http.Error(w, "User not found", http.StatusBadRequest)
// 		return
// 	}

// 	var task models.Task
// 	json.NewDecoder(r.Body).Decode(&task)

// 	// generate new task ID
// 	var count int
// 	_ = config.DB.QueryRow("SELECT COUNT(*) FROM tasks").Scan(&count)
// 	task.ID = fmt.Sprintf("T__%04d", count+1)
// 	task.UserEmail = email
// 	task.Status = "pending" // default

// 	_, err = config.DB.Exec("INSERT INTO tasks (id, user_email, title, description, status) VALUES (?, ?, ?, ?, ?)",
// 		task.ID, task.UserEmail, task.Title, task.Description, task.Status)
// 	if err != nil {
// 		http.Error(w, "Failed to create task", http.StatusInternalServerError)
// 		return
// 	}

// 	json.NewEncoder(w).Encode(map[string]string{"message": "Task created successfully", "task_id": task.ID})
// }

func CreateTask(w http.ResponseWriter, r *http.Request) {
	email, err := utils.ValidateAuthToken(r)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var task models.Task
	if err := json.NewDecoder(r.Body).Decode(&task); err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	// generate new task ID
	var count int
	_ = config.DB.QueryRow("SELECT COUNT(*) FROM tasks").Scan(&count)
	task.ID = fmt.Sprintf("T__%04d", count+1)
	task.UserEmail = email
	task.Status = "pending" // default

	_, err = config.DB.Exec("INSERT INTO tasks (id, user_email, title, description, status) VALUES (?, ?, ?, ?, ?)",
		task.ID, task.UserEmail, task.Title, task.Description, task.Status)
	if err != nil {
		http.Error(w, "Failed to create task", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"message": "Task created successfully", "task_id": task.ID})
}

func GetAllTasks(w http.ResponseWriter, r *http.Request) {
	email, err := utils.ValidateAuthToken(r)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	rows, err := config.DB.Query("SELECT id, title, description, status FROM tasks WHERE user_email = ?", email)
	if err != nil {
		http.Error(w, "Failed to fetch tasks", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var tasks []models.Task
	for rows.Next() {
		var t models.Task
		if err := rows.Scan(&t.ID, &t.Title, &t.Description, &t.Status); err != nil {
			http.Error(w, "Error scanning task", http.StatusInternalServerError)
			return
		}
		tasks = append(tasks, t)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}
