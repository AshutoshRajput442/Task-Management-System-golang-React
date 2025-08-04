package config

import (
    "database/sql"
    "log"
    _ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func ConnectDB() {
    var err error
    DB, err = sql.Open("mysql", "root:root@tcp(127.0.0.1:3306)/taskdb")
    if err != nil {
        log.Fatal("Database connection error:", err)
    }

    if err = DB.Ping(); err != nil {
        log.Fatal("Database unreachable:", err)
    }

    log.Println("Database connected successfully!")
}
