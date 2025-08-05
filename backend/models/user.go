package models

type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UpdateProfileInput struct {
	Name     string `json:"name"`
	Password string `json:"password"`
}

type UpdatePasswordRequest struct {
	Password string `json:"password"`
}

type UserResponse struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}
