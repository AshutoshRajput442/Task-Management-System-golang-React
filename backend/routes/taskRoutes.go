package routes

import (
	"backend/controllers"

	"github.com/gorilla/mux"
)

func RegisterTaskRoutes(r *mux.Router) {
	r.HandleFunc("/task", controllers.CreateTask).Methods("POST")
	r.HandleFunc("/tasks", controllers.GetAllTasks).Methods("GET")
	// 	r.HandleFunc("/task/{id}", controllers.GetTask).Methods("GET")
	// 	r.HandleFunc("/task/{id}", controllers.UpdateTask).Methods("PUT")
	// 	r.HandleFunc("/task/{id}", controllers.DeleteTask).Methods("DELETE")
}

