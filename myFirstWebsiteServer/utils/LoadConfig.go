package utils

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
)

//数据库配置类
type DBConfig struct {
	DBname   string
	Name     string
	DBhost   string
	DBport   string
	UserName string
	UserPsd  string
}

//后端地址配置类
type WebConfig struct {
	Host string
	Port int
}

//加载配置信息
func LoadWebConfig(filePath string) *WebConfig {

	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		log.Fatal(err)
	}
	v := new(WebConfig)
	datajson := []byte(data)
	err = json.Unmarshal(datajson, v)
	CheckErr("loadconfig", err)
	fmt.Println(v)
	return v
}
func LoadDBConfig(filePath string) *DBConfig {
	data, err := ioutil.ReadFile(filePath)
	if err != nil {
		log.Fatal(err)
	}
	v := new(DBConfig)
	datajson := []byte(data)
	err = json.Unmarshal(datajson, v)
	CheckErr("loadconfig", err)
	return v
}
