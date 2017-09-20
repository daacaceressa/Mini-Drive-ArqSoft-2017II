package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	// "fmt"
	"sa_categorize_ms/app/database"
	"sa_categorize_ms/app/models"
	"github.com/revel/revel"
	"gopkg.in/mgo.v2/bson"
)

type Documents struct {
	*revel.Controller
}

func (c Documents) Create() revel.Result {
	document := &models.Document{}
	body := c.Params.JSON
	if err := json.Unmarshal(body, document); err != nil {
		return c.RenderText("could not parse request")
	} else if err := database.Documents.Insert(document); err != nil {
		// Internal Server Error
		log.Fatal(err)
		c.Response.Status = http.StatusInternalServerError
		return c.RenderText("could not be saved")
	}
	c.Response.Status = http.StatusCreated
	return c.RenderJSON(document)
}

func (c Documents) Index() revel.Result {
	results := []models.Document{}
	if err := database.Documents.Find(bson.M{}).All(&results); err != nil {
		// Internal Server Error
		log.Fatal(err)
	}
	return c.RenderJSON(results)
}

func (c Documents) ShowCategories(id string) revel.Result {
	result := models.Document{}
	if err := database.Documents.Find(bson.M{"id": id}).One(&result); err != nil {
		// Internal Server Error
		log.Fatal(err)
		return c.RenderText("id is not valid")
	}
	return c.RenderJSON(result)
}

func (c Documents) Delete(id string) revel.Result {

	//TODO: Remove repeated code.
	result := models.Document{}
	if err := database.Documents.Find(bson.M{"id": id}).One(&result); err != nil {
		// Internal Server Error
		log.Fatal(err)
		return c.RenderText("id is not valid")
	} else if err := database.Documents.Remove(bson.M{"id": id}); err != nil {
	    log.Fatal(err)
	    return c.RenderText("id is not valid")
	}
	return c.RenderJSON(result)
}

func (c Documents) AddCategories() revel.Result {

	document := &models.Document{}
	body := c.Params.JSON
	if err := json.Unmarshal(body, document); err != nil {
		return c.RenderText("could not parse request")
	}
	colQuerier := bson.M{"id": document.GetId()}
	change := bson.M{"$push":bson.M{"categories":bson.M{"$each":document.GetCategories()}}}
	err := database.Documents.Update(colQuerier, change)
	if err != nil {
		panic(err)
	}

	result := models.Document{}
	err = database.Documents.Find(bson.M{"id": document.GetId()}).One(&result);

	return c.RenderJSON(result)
}

func (c Documents) RemoveCategories() revel.Result {

	document := &models.Document{}
	body := c.Params.JSON
	if err := json.Unmarshal(body, document); err != nil {
		return c.RenderText("could not parse request")
	}
	colQuerier := bson.M{"id": document.GetId()}
	change := bson.M{"$pullAll":bson.M{"categories":document.GetCategories()}}
	err := database.Documents.Update(colQuerier, change)
	if err != nil {
		panic(err)
	}

	result := models.Document{}
	err = database.Documents.Find(bson.M{"id": document.GetId()}).One(&result);

	return c.RenderJSON(result)
}

func (c Documents) GetFilesWithCategory(category_name string) revel.Result {


	results := []models.Document{}
	if err := database.Documents.Find(bson.M{"categories": category_name}).All(&results); err != nil {
		// Internal Server Error
		log.Fatal(err)
	}
	return c.RenderJSON(results)
}
