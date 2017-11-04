package utils

import (
	"log"
)

//错误检查函数
func CheckErr(where string, err error) {
	if err != nil {
		log.Fatal(where+":", err)
	}
	return
}
