package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/heyyakash/zenmd/handlers/auth"
)

func AccountRouter(c *gin.Engine) {
	c.POST("/user/create", auth.CreateNewAccount())
	c.POST("/user/login", auth.LoginUser())
}
