package main

import (
	"fmt"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/heyyakash/zenmd/db"
	"github.com/heyyakash/zenmd/helpers"
	"github.com/heyyakash/zenmd/routes"
)

type APIServer struct {
	listenAddr string
}

func NewAPIServer(listenAddr string) *APIServer {
	return &APIServer{
		listenAddr: listenAddr,
	}
}

var Database db.PostgresStore

func (s *APIServer) RunServer() {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{helpers.LoadString("CLIENT_ORIGIN")},
		AllowMethods:     []string{"PUT", "PATCH", "POST", "OPTIONS", "GET", "DELETE"},
		AllowHeaders:     []string{"Origin", "auth-token", "content-type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == helpers.LoadString("CLIENT_ORIGIN")
		},
		MaxAge: 12 * time.Hour,
	}))
	r.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "pong",
		})
	})
	routes.AccountRouter(r)
	if err := db.NewPostgresStore(); err != nil {
		log.Fatal("Could not initalize db")
	}
	r.Run(s.listenAddr)
}

func main() {
	fmt.Print("Hello")
	server := NewAPIServer(":8000")
	server.RunServer()
}
