package document

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/heyyakash/zenmd/db"
	"github.com/heyyakash/zenmd/helpers"
)

type Request struct {
	Name string `json:"name"`
}

func CreateDocument() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		email := ctx.MustGet("email").(string)
		var req Request
		if err := ctx.BindJSON(&req); err != nil {
			log.Print(err)
			ctx.JSON(http.StatusBadRequest, helpers.ResponseGenerator("Please provide a document name", false))
			return
		}

		exists, err := db.Database.DoesRowExist(email, req.Name)
		if err != nil {
			ctx.JSON(http.StatusBadRequest, helpers.ResponseGenerator("Error looking for existing doc", false))
			log.Print("Error", err)
			return
		}

		if exists == true {
			ctx.JSON(http.StatusBadRequest, helpers.ResponseGenerator("Document already exists", false))
			return
		}

		id, err := db.Database.CreateDocument(email, req.Name)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, helpers.ResponseGenerator("Error creating a new doc", false))
			log.Print(err)
			return
		}
		ctx.JSON(http.StatusAccepted, helpers.ResponseGenerator(id, true))
	}
}
