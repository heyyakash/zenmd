package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/heyyakash/zenmd/db"
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
