package controllers

import (
	"../utils"
)

type ArticleController struct {
	Controller
}

func (ac *ArticleController) Handle() {
	if ac.ctx.Params["class"] != "" {
		db := utils.NewDb(utils.LoadDBConfig("./config/DBConfig"))
		var class int
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
		res, err := db.ReadAbstract(class)
		utils.CheckErr("acontroller", err)
		_, err = ac.ctx.ResponseWriter.Write(res)
		utils.CheckErr("responswrite", err)
	}
}
