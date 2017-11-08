package main

import (
	"log"
	"net/http"
	"strconv"

	"./controllers"
	"./utils"
)

func main() {
	Webconfig := utils.LoadWebConfig("./config/WebConfig") //获取配置

	mux := new(controllers.BlogServeMux)
	mux.RegisterMux("/:class(\\b(program|psychology|mathmatic|raspbarrypi)\\b)", &controllers.ArticleController{})
	addr := Webconfig.Host + ":" + strconv.Itoa(Webconfig.Port)

	log.Println("onlisten")

	http.ListenAndServe(addr, mux)
}
