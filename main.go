package main

import (
	"fmt"
	"golang.org/x/net/websocket"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
)

func main() {

	http.HandleFunc("/", getPageHandle)
	http.HandleFunc("/goqkit_visualizer.js", getJSHandle)
	http.Handle("/data", websocket.Handler(dataHandler))
	fmt.Println("starting goqkit vsisualizer on http://localhost:8888/")
	err := http.ListenAndServe(":8888", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func getContentFile(filePath string) string {

	bytes, err := ioutil.ReadFile(filePath)
	if err != nil {
		panic(err)
	}

	return string(bytes)
}

func getJsonFile(ftime time.Time) (bool, time.Time, string) {
	filePath := "goqkit.json"

	f, err := os.Open(filePath)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	info, err := f.Stat()
	if err != nil {
		panic(err)
	}
	modTime := info.ModTime()
	if !modTime.After(ftime) {
		return false, ftime, ""
	}

	bytes, err := ioutil.ReadFile(filePath)
	if err != nil {
		panic(err)
	}
	return true, modTime, string(bytes)
}

// send a html content
func getPageHandle(w http.ResponseWriter, r *http.Request) {

	fmt.Fprint(w, getContentFile("goqkit.html"))
}

func getJSHandle(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, getContentFile("goqkit_visualizer.js"))
}

// send json data
func dataHandler(ws *websocket.Conn) {

	fmt.Println("dataHandler start")

	cts := time.Date(2001, 5, 20, 23, 59, 59, 0, time.UTC)
	for {
		modified, modTime, data := getJsonFile(cts)
		if modified {
			cts = modTime
			err := websocket.Message.Send(ws, data)
			if err != nil {
				fmt.Println(err)
				time.Sleep(1000 * time.Millisecond)
				continue
			} else {
				fmt.Println("sent data")
			}
		}
		time.Sleep(1000 * time.Millisecond)
	}
}
