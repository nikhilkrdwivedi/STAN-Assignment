package controllers

import (
	"net/http"
	"sample/task-2/initializers"
	"sample/task-2/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetUsers(context *gin.Context) {
	var users []models.User
	result := initializers.DB.Find(&users)

	if result.Error != nil {
		context.IndentedJSON(http.StatusBadRequest, gin.H{"error": result.Error})
		return
	}

	context.IndentedJSON(http.StatusOK, gin.H{"data": users})
}

func GetUser(context *gin.Context) {
	id := context.Param("id")
	var user models.User
	result := initializers.DB.First(&user, "id = ?", id)
	if result.Error != nil {
		context.IndentedJSON(http.StatusNotFound, gin.H{"error": "User does not for ID: " + id})
		return
	}
	context.IndentedJSON(http.StatusOK, gin.H{"data": user})
}

func CreateUser(context *gin.Context) {
	var body struct {
		Email string
		Name  string
	}
	context.Bind(&body)
	user := models.User{ID: uuid.NewString(), Email: body.Email, Name: body.Name}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		context.IndentedJSON(http.StatusBadRequest, gin.H{"error": result.Error})
		return
	}

	context.IndentedJSON(http.StatusOK, gin.H{"data": user})
}

func UpdateUser(context *gin.Context) {
	id := context.Param("id")
	var body struct {
		Email string
		Name  string
	}
	context.Bind(&body)
	var user models.User
	initializers.DB.First(&user, "id = ?", id)
	result := initializers.DB.Model(&user).Updates(models.User{
		Email: body.Email,
		Name:  body.Name,
	})

	if result.Error != nil {
		context.IndentedJSON(http.StatusBadRequest, gin.H{"error": result.Error})
		return
	}

	context.IndentedJSON(http.StatusOK, gin.H{"data": user})
}

func DeleteUser(context *gin.Context) {
	id := context.Param("id")
	var user models.User
	result := initializers.DB.Delete(&user, "id = ?", id)
	if result.Error != nil {
		context.IndentedJSON(http.StatusNotFound, gin.H{"error": "User does not for ID: " + id})
		return
	}
	context.IndentedJSON(http.StatusOK, gin.H{"data": user})
}
