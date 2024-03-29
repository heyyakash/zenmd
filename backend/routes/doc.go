package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/heyyakash/zenmd/handlers/document"
	"github.com/heyyakash/zenmd/middlewares"
)

func DocumentRoute(c *gin.Engine) {
	c.GET("/docs", middlewares.ValidateUser(), document.GetDocument())
	c.GET("/docs/:id", middlewares.ValidateUser(), document.GetDocumentByID())
	c.POST("/docs/create", middlewares.ValidateUser(), document.CreateDocument())
	c.PATCH("/docs/:id", middlewares.ValidateUser(), document.UpdateDocument())
	c.POST("/docs/collab", middlewares.ValidateUser(), document.AddCollaborator())
	c.GET("/docs/invitations/:id", document.AcceptInvitation())
}
