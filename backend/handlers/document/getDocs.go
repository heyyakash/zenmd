package document

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/heyyakash/zenmd/db"
	"github.com/heyyakash/zenmd/helpers"
)

func GetDocument() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		email := ctx.MustGet("email").(string)
		if len(email) == 0 {
			ctx.JSON(http.StatusForbidden, helpers.ResponseGenerator("Access Denied", false))
			return
		}
		_, dataMin, err := db.Database.GetRowsByEmail(email, false)
		if err != nil {
			log.Print(err)
			ctx.JSON(http.StatusInternalServerError, helpers.ResponseGenerator("Error fetching data", false))
			return
		}
		ctx.JSON(http.StatusOK, helpers.ResponseGenerator(dataMin, false))

	}
}

func GetDocumentByID() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		email := ctx.MustGet("email").(string)
		id := ctx.Param("id")
		log.Print(id)
		data, err := db.Database.GetDocumentByID(id, email)
		if err != nil {
			log.Print(err)
			ctx.JSON(http.StatusInternalServerError, helpers.ResponseGenerator("Some error occuered", false))
			return
		}
		ctx.JSON(http.StatusOK, helpers.ResponseGenerator(data, true))
	}
}
