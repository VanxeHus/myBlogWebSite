package controllers

import (
	"log"
	"net/http"
)

//上下文类
type context struct {
	ResponseWriter http.ResponseWriter
	Request        *http.Request
	Params         map[string]string
}

//控制器基类
type Controller struct {
	ctx *context
}

//控制器处理接口
type ControllerInterFace interface {
	Init(ctx *context) //初始化接口
	Handle()           //处理接口
}

func (mc *Controller) Init(ctx *context) {
	mc.ctx = ctx
}
func (mc *Controller) Handle() {
	log.Println("this is main Controller")
}
