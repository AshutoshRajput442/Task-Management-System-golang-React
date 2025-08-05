package routes

import (
	"backend/controllers"

	"github.com/gorilla/mux"
)

func RegisterUserRoutes(r *mux.Router) {
	// this is used for get user profile
	r.HandleFunc("/me", controllers.GetUserProfile).Methods("GET")

	// r.HandleFunc("/me", controllers.UpdateUserProfile).Methods("PUT")
	r.HandleFunc("/update-password", controllers.UpdatePassword).Methods("PUT")

}
