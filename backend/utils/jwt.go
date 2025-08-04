package utils

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("mysecretkey")

func GenerateJWT(userID int, email string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"email":   email,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtKey)
}

// func ValidateToken(tokenStr string) (int, error) {
// 	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
// 		return jwtKey, nil
// 	})
// 	if err != nil || !token.Valid {
// 		return 0, err
// 	}

//		claims := token.Claims.(jwt.MapClaims)
//		userID := int(claims["user_id"].(float64))
//		return userID, nil
//	}
func ValidateToken(tokenStr string) (string, error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil || !token.Valid {
		return "", err
	}

	claims := token.Claims.(jwt.MapClaims)
	email := claims["email"].(string)
	return email, nil
}

// func ValidateAuthToken(r *http.Request) (int, error) {
// 	token := r.Header.Get("Authorization")
// 	if token == "" {
// 		return 0, fmt.Errorf("no token")
// 	}

//		return ValidateToken(token)
//	}
// func ValidateAuthToken(r *http.Request) (string, error) {
// 	token := r.Header.Get("Authorization")
// 	if token == "" {
// 		return "", fmt.Errorf("no token")
// 	}
// 	return ValidateToken(token)
// }

func ValidateAuthToken(r *http.Request) (string, error) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return "", fmt.Errorf("no token")
	}

	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || parts[0] != "Bearer" {
		return "", fmt.Errorf("invalid token format")
	}

	return ValidateToken(parts[1])
}
