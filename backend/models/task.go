package models

import "time"

type Task struct {
	ID          string    `json:"id"`
	UserEmail   string    `json:"user_email"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"createdAt"`
}
