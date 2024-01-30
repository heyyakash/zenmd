package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/heyyakash/zenmd/helpers"
)

func ValidateUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		token := ctx.Request.Header["Token"]
		if len(token) == 0 {
			ctx.JSON(http.StatusUnauthorized, helpers.ResponseGenerator("User Logged Out", false))
			return
		}
		values, err := helpers.DecodeJWT(token[0])
		if err != nil {
			ctx.JSON(http.StatusUnauthorized, helpers.ResponseGenerator("Couldn't process JWT", false))
			return
		}

		ctx.Set("email", values)
		ctx.Next()
	}
}
