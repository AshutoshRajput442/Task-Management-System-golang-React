package controllers

import (
	"backend/config"
	"backend/models"
	"backend/utils"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

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

/* func GetAllTasks(w http.ResponseWriter, r *http.Request) {
	email, err := utils.ValidateAuthToken(r)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	rows, err := config.DB.Query(`
  SELECT id, title, description, status, CAST(created_at AS DATETIME)
  FROM tasks WHERE user_email = ?`, email)

	if err != nil {
		http.Error(w, "Failed to fetch tasks", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var tasks []models.Task
	for rows.Next() {
		var t models.Task
		var createdAtRaw []byte

		if err := rows.Scan(&t.ID, &t.Title, &t.Description, &t.Status, &t.CreatedAt); err != nil {
			log.Printf("Scan error: %v", err)
			http.Error(w, "Error scanning task", http.StatusInternalServerError)
			return
		}

		// Parse created_at manually
		createdAtStr := string(createdAtRaw)
		t.CreatedAt, err = time.Parse("2006-01-02 15:04:05", createdAtStr)
		if err != nil {
			log.Printf("Time parse error: %v", err)
			http.Error(w, "Invalid time format", http.StatusInternalServerError)
			return
		}

		tasks = append(tasks, t)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}
*/

func GetAllTasks(w http.ResponseWriter, r *http.Request) {
	email, err := utils.ValidateAuthToken(r)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	rows, err := config.DB.Query(`
		SELECT id, title, description, status, created_at 
		FROM tasks WHERE user_email = ?`, email)
	if err != nil {
		http.Error(w, "Failed to fetch tasks", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var tasks []models.Task
	for rows.Next() {
		var t models.Task
		var createdAtRaw []byte // Step 1: created_at ko []byte mein lo

		// Step 2: Scan into variables, created_at ko createdAtRaw mein lo
		if err := rows.Scan(&t.ID, &t.Title, &t.Description, &t.Status, &createdAtRaw); err != nil {
			log.Printf("Scan error: %v", err)
			http.Error(w, "Error scanning task", http.StatusInternalServerError)
			return
		}

		// Step 3: Parse []byte to time.Time
		t.CreatedAt, err = time.Parse("2006-01-02 15:04:05", string(createdAtRaw))
		if err != nil {
			log.Printf("Time parse error: %v", err)
			http.Error(w, "Invalid time format", http.StatusInternalServerError)
			return
		}

		tasks = append(tasks, t)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tasks)
}
