package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/heyyakash/zenmd/db"
	"github.com/heyyakash/zenmd/helpers"
	"github.com/heyyakash/zenmd/modals"
)

func CreateNewAccount() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var user modals.User
		// var existingUser modals.User
		if err := ctx.BindJSON(&user); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "Bad json",
				"success": false,
			})
			return
		}
		hashedPass := helpers.Hash(user.Password)
		user.Password = hashedPass
		if err := db.Database.CreateAccount(&user); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"message": err,
				"success": false,
			})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{
			"message": "received",
			"success": true,
		})
	}
}
