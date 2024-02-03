package document

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/heyyakash/zenmd/db"
	"github.com/heyyakash/zenmd/helpers"
	"github.com/heyyakash/zenmd/modals"
)

func AddCollaborator() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		type request struct {
			Id    string `json:"id"`
			Email string `json:"email"`
		}
		var req request
		if err := ctx.BindJSON(&req); err != nil {
			log.Print(err)
			ctx.JSON(http.StatusBadGateway, helpers.ResponseGenerator("Error parsing json", false))
			return
		}
		exists, err := db.Database.CheckEmailExistence(req.Email)
		log.Print(req.Email)
		if err != nil {
			log.Print(err)
			ctx.JSON(http.StatusInternalServerError, helpers.ResponseGenerator("Couldn't check email's existence", false))
			return
		}
		if exists == false {
			ctx.JSON(http.StatusNotFound, helpers.ResponseGenerator("User has not signed up on zenmd", false))
			return
		}
		mail := modals.Email{
			To:      req.Email,
			Content: "Hello!! accept the inviation - ",
			Subject: "Invitation to collaborate - ZenMD",
		}
		if err := helpers.SendEmail(&mail); err != nil {
			log.Print(err)
			ctx.JSON(http.StatusInternalServerError, helpers.ResponseGenerator("Couldn't send invitation", false))
			return
		}
		ctx.JSON(http.StatusOK, helpers.ResponseGenerator("Invitation sent", true))
	}
}
