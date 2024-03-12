package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID     string  `gorm:"index"`
	Email string `gorm:"primaryKey"`
	Name string
	CreatedAt time.Time
	UpdatedAt time.Time
}
