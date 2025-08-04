package routes

import (
	"backend/controllers"

	"github.com/gorilla/mux"
)

func SetupRoutes() *mux.Router {
	r := mux.NewRouter()

	r.HandleFunc("/signup", controllers.Signup).Methods("POST")
	r.HandleFunc("/login", controllers.Login).Methods("POST")

	// This line adds all /task-related routes
	RegisterTaskRoutes(r)

	// This line adds all /user-related routes
	RegisterUserRoutes(r)

	return r
}
