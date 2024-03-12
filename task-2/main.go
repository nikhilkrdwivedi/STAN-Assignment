package main

import (
	"sample/task-2/controllers"
	"sample/task-2/initializers"

	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDatabase()
}
func main() {
	//init server
	router := gin.Default()

	/*
	API Endpoints [V1]
	*/
	router.GET("/v1/users", controllers.GetUsers)
	router.GET("/v1/user/:id", controllers.GetUser)
	router.POST("/v1/user", controllers.CreateUser)
	router.PUT("/v1/user/:id", controllers.UpdateUser)
	router.DELETE("/v1/user/:id", controllers.DeleteUser)

	router.Run()
}
