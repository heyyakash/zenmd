package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/heyyakash/zenmd/handlers/document"
	"github.com/heyyakash/zenmd/middlewares"
)

func DocumentRoute(c *gin.Engine) {
	c.POST("/doc/create", middlewares.ValidateUser(), document.CreateDocument())
}
