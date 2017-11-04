package main

import (
	"fmt"
	"log"
	"net/http"
	"regexp"
	"strconv"

	"./controllers"
	"./utils"
)

func main() {
	Webconfig := utils.LoadWebConfig("./config/WebConfig")
	mux := new(controllers.BlogServeMux)
	mux.RegisterMux("/:class(\\bprogram\\b|\\bpsychology\\b|\\bmathmatic\\b|\\braspbarrypi\\b)", &controllers.ArticleController{})
	addr := Webconfig.Host + ":" + strconv.Itoa(Webconfig.Port)
	log.Println("onlisten")
	http.ListenAndServe(addr, mux)
}
func test() {
	rege, err := regexp.Compile("/(\\bprogram\\b|^psychology|^mathmatic|^raspbarrypi)")
	if err != nil {
		fmt.Println("err", err)
	}
	res := rege.FindStringSubmatch("/program")
	fmt.Println("res", res)
}
