package main

import (
	"html/template"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

//var mongoSession *mgo.Session
var templates *template.Template

func init() {
	templates = template.Must(template.ParseGlob("views/*"))
}

func main() {
	router := httprouter.New()
	router.GET("/", handleIndex)

	log.Fatal(http.ListenAndServe(":7070", router))
}

func handleIndex(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	templates.ExecuteTemplate(w, "index.gohtml", nil)
}

// func initMongo() {
// 	mongoSession, err := mgo.Dial("mongodb://admin:admin@ds247479.mlab.com:47479/taskforce")
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// }
