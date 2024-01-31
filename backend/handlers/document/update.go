package document

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/heyyakash/zenmd/db"
	"github.com/heyyakash/zenmd/helpers"
)

func UpdateDocument() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		type req struct {
			Data string `json:"data"`
		}
		id := ctx.Param("id")
		email := ctx.MustGet("email").(string)
		var request req
		if err := ctx.BindJSON(&request); err != nil {
			ctx.JSON(http.StatusBadRequest, helpers.ResponseGenerator("Error parsing json", false))
			return
		}
		if len(id) == 0 {
			ctx.JSON(http.StatusBadRequest, helpers.ResponseGenerator("Id not provided", false))
			return
		}
		if err := db.Database.UpdateDocumentByID(id, email, request.Data); err != nil {
			log.Print(err)
			ctx.JSON(http.StatusInternalServerError, helpers.ResponseGenerator("Error in updating data", false))
			return
		}
		ctx.JSON(http.StatusOK, helpers.ResponseGenerator("Updated", true))
	}
}
