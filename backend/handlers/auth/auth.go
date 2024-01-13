package auth

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/heyyakash/zenmd/db"
	"github.com/heyyakash/zenmd/helpers"
	"github.com/heyyakash/zenmd/modals"
)

func CreateNewAccount() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var user modals.User
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
		token, err := helpers.GenerateJWT(user.Email)
		if err != nil {
			log.Print(err)
			ctx.JSON(http.StatusInternalServerError, helpers.ResponseGenerator("Couldn't Generate Token", false))
			return
		}
		ctx.JSON(http.StatusOK, gin.H{
			"message": token,
			"success": true,
		})
	}
}

func LoginUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var req modals.LoginRequest
		if err := ctx.BindJSON(&req); err != nil {
			ctx.JSON(http.StatusBadRequest, helpers.ResponseGenerator("Bad Fields Provided", false))
			return
		}
		log.Print(req.Email)
		user, err := db.Database.GetAccountByEmail(req.Email)
		if err != nil {
			log.Print(err)
			ctx.JSON(http.StatusBadRequest, helpers.ResponseGenerator("Wrong Credentials", false))
			return
		}
		check := helpers.CheckPassword(user.Password, req.Password)
		if check == false {
			ctx.JSON(http.StatusBadRequest, helpers.ResponseGenerator("Wrong Credentials", false))
			return
		}
		token, err := helpers.GenerateJWT(req.Email)
		if err != nil {
			log.Print(err)
			ctx.JSON(http.StatusInternalServerError, helpers.ResponseGenerator("Couldn't Generate Token", false))
			return
		}
		ctx.JSON(http.StatusOK, helpers.ResponseGenerator(token, true))
	}
}
