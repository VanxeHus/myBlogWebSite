package utils

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

//数据库实例类
type Dbbase struct {
	db *sql.DB
}

//文章内容类
type Article struct {
	Id      string
	Title   string
	Content string
	Time    string
	ReadNum int
}

//文章摘要类
type Abstract struct {
	Id      string
	Title   string
	Abstr   string
	Time    string
	ReadNum int
}

const (
	Program = iota
	Mathematics
	Psychology
	RaspbarryPi
)

//生成数据库连接实例
//返回一个数据库连接实例
func NewDb(DbConfig *DBConfig) *Dbbase {
	//取出数据库配置
	dbname := DbConfig.DBname
	name := DbConfig.Name
	dbhost := DbConfig.DBhost
	dbport := DbConfig.DBport
	user := DbConfig.UserName
	psd := DbConfig.UserPsd

	//构造连接数据库的参数
	sqlPara := user + ":" + psd + "@tcp(" + dbhost + ":" + dbport + ")/" + name + "?charset=utf8"
	fmt.Println(sqlPara)
	//连接数据库
	temp, err := sql.Open(dbname, sqlPara)
	CheckErr("NewDb", err)

	res := new(Dbbase)

	res.db = temp
	return res
}

//查询文章函数
//返回相应json文章数据
func (a Dbbase) ReadArticle(classify int, id int) ([]byte, error) {
	var resArt Article
	var err error
	selectPrase := "select id,title,content,time,read_num from "
	condition := " where id=?"

	//确定查询的表
	err = confimTable(classify, &selectPrase)
	if err != nil {
		return nil, err
	}
	selectPrase += condition
	//查询并构造数据
	err = a.db.QueryRow(selectPrase, id).Scan(&resArt.Id, &resArt.Title, &resArt.Content, &resArt.Time, &resArt.ReadNum)
	CheckErr("ReadArt", err)
	return json.Marshal(resArt)
}

//查询摘要函数
//返回相应json列表数据
func (a Dbbase) ReadAbstract(classify int) ([]byte, error) {

	var ablist []Abstract //查询列表
	var err error         //错误
	var rows *sql.Rows

	selectPrase := "select id,abstract,title,time,read_num from "

	//确定查询的表
	err = confimTable(classify, &selectPrase)
	if err != nil {
		return nil, err
	}
	//查询并构造返回数据
	rows, err = a.db.Query(selectPrase)
	CheckErr("readabs", err)
	for rows.Next() {
		var temp Abstract
		err = rows.Scan(&temp.Id, &temp.Abstr, &temp.Title, &temp.Time, &temp.ReadNum)
		CheckErr("readrow", err)
		ablist = append(ablist, temp)
	}
	return json.Marshal(ablist)
}

//确定想要查询的表
func confimTable(classify int, selectPrase *string) error {
	var err error
	switch classify {
	case 0:
		*selectPrase += "program"
	case 1:
		*selectPrase += "mathematics"
	case 2:
		*selectPrase += "psychology"
	case 3:
		*selectPrase += "raspbarryPi"
	default:
		err = errors.New("类型错误")
	}
	return err
}
