package controllers

import (
	"fmt"

	"../utils"
)

type ArticleController struct {
	Controller
}

func (ac *ArticleController) Handle() {
	if ac.ctx.Params["class"] != "" {
		db := utils.NewDb(utils.LoadDBConfig("./config/DBConfig")) //建立db实例
		var class int
		//映射
		switch ac.ctx.Params["class"] {
		case "/program":
			class = 0
		case "/mathematics":
			class = 1
		case "/psychology":
			class = 2
		case "/raspbarryPi":
			class = 3
		}
		res, err := db.ReadAbstract(class) //读取数据
		utils.CheckErr("acontroller", err)
		ac.ctx.ResponseWriter.Header().Set("Access-Control-Allow-Origin", "*")
		fmt.Println(res)
		_, err = ac.ctx.ResponseWriter.Write(res) //响应
		utils.CheckErr("responswrite", err)
	}
}
