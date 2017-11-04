package controllers

import (
	"fmt"
	"net/http"
	"reflect"
	"regexp"
	"strings"
	"sync"

	"../utils"
)

//博客路由器
type BlogServeMux struct {
	lock sync.RWMutex
	m    map[string]*blogMuxEntry
}
type blogMuxEntry struct {
	pattern     string
	regex       *regexp.Regexp
	params      map[int]string
	handlertype reflect.Type
}

//注册路由
func (m *BlogServeMux) RegisterMux(pattern string, c ControllerInterFace) {
	if m.m == nil {
		m.m = make(map[string]*blogMuxEntry)
	}
	//路由url分成不同部分
	strParts := strings.Split(pattern, "/")
	j := 0
	//参数
	params := make(map[int]string)
	//处理url的不同部分,查看是否有正则匹配式
	for i, part := range strParts {
		if strings.HasPrefix(part, ":") {
			if x := strings.Index(part, "("); x != -1 {
				//参数以及对应的正则匹配式
				param := part[1:x]
				expre := part[x:]
				params[j] = param
				strParts[i] = expre
			}
		}
	}
	//重新组合成路由url
	pattern = strings.Join(strParts, "/")
	fmt.Println(pattern)
	//根据url生成正则匹配式
	regex, err := regexp.Compile(pattern)
	//错误检查
	utils.CheckErr("RegisterMux", err)
	//构造路由对象
	rt := reflect.Indirect(reflect.ValueOf(c)).Type()
	muxentry := &blogMuxEntry{}
	muxentry.regex = regex
	muxentry.pattern = pattern
	muxentry.params = params
	muxentry.handlertype = rt

	//添加路由
	m.m[pattern] = muxentry
}

//路由分发处理
func (m *BlogServeMux) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	requestPath := r.URL.Path
	entry, ok := m.m[requestPath]                               //无参数路由
	ctx := &context{ResponseWriter: w, Request: r, Params: nil} //上下文参数
	in := make([]reflect.Value, 1)                              //处理函数的参数
	var resMux *blogMuxEntry                                    //路由的匹配结果
	if ok {
		//匹配无参数路由
		resMux = entry
		fmt.Println("无参数路由匹配中")
	} else {
		//匹配有参数路由
		n := 0 //用于选取最长正则匹配的路由
		for _, entry = range m.m {
			fmt.Println("参数路由匹配中")
			fmt.Println(requestPath)
			//匹配成功
			if matchStr := entry.regex.FindStringSubmatch(requestPath); matchStr != nil {
				//是否为最长
				if len(matchStr) > n {
					fmt.Println("matchstr", matchStr)
					params := make(map[string]string) //匹配的参数
					resMux = entry
					n = len(matchStr)
					//上下文获取参数组
					for x, match := range matchStr {
						params[entry.params[x]] = match
					}
					ctx.Params = params
				}
			}
		}
	}
	if resMux != nil {
		vc := reflect.New(resMux.handlertype) //分发路由的处理函数
		vctx := reflect.ValueOf(ctx)
		in[0] = vctx
		init := vc.MethodByName("Init")
		init.Call(in)
		in = make([]reflect.Value, 0)
		handle := vc.MethodByName("Handle")
		handle.Call(in)
		fmt.Println("分发了路由了" + requestPath)
		return
	}
	//404NotFound
	http.NotFound(w, r)
	fmt.Println("404notfound")
}
