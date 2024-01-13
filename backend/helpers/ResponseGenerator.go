package helpers

import "github.com/gin-gonic/gin"

func ResponseGenerator(message string, success bool) *gin.H {
	return &gin.H{
		"message": message,
		"success": success,
	}
}
