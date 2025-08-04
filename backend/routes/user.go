package routes

import (
	"backend/controllers"

	"github.com/gorilla/mux"
)

func RegisterUserRoutes(r *mux.Router) {
	// this is used for get user profile
	r.HandleFunc("/tasks", controllers.GetUserProfile).Methods("GET")
}
