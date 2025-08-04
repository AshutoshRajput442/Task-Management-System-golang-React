package main

import (
    "log"
    "net/http"
    "backend/config"
    "backend/routes"

    "github.com/rs/cors"
)

func main() {
    config.ConnectDB()

    r := routes.SetupRoutes()

    // Create CORS handler
    c := cors.New(cors.Options{
        AllowedOrigins:   []string{"*"}, // Allow all origins, for dev only
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
        AllowedHeaders:   []string{"Authorization", "Content-Type"},
        AllowCredentials: true,
    })

    handler := c.Handler(r)

    log.Println("Server started on :8080")
    http.ListenAndServe(":8080", handler)
}
