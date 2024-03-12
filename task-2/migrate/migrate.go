package main

import (
	"sample/task-2/initializers"
	"sample/task-2/models"
)

func init(){
	initializers.LoadEnvVariables()
	initializers.ConnectToDatabase()
}

func main(){
	initializers.DB.AutoMigrate(&models.User{})
}