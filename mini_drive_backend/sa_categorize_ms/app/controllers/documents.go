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

func (c Documents) ShowCategories(id string) revel.Result {
	result := models.Document{}
	if err := database.Documents.Find(bson.M{"id": id}).One(&result); err != nil {
		// Not found.
		log.Print(err)
		c.Response.Status = http.StatusNotFound
		return c.RenderText("id is not valid")
	}
	c.Response.Status = http.StatusOK
	return c.RenderJSON(result)
}

func (c Documents) Delete(id string) revel.Result {
	result := models.Document{}
	if err := database.Documents.Find(bson.M{"id": id}).One(&result); err != nil {
		// Not found.
		log.Print(err)
		c.Response.Status = http.StatusNotFound
		return c.RenderText("id is not valid")
	} else if err := database.Documents.Remove(bson.M{"id": id}); err != nil {
	    log.Print(err)
	    c.Response.Status = http.StatusInternalServerError
	    return c.RenderText("Internal Server Error")
	}
	c.Response.Status = http.StatusOK
	return c.RenderJSON(result)
}

func (c Documents) AddCategories() revel.Result {
	document := &models.Document{}
	body := c.Params.JSON
	existingDocument := []models.Document{}
	if err := json.Unmarshal(body, document); err != nil {
		log.Print(err)
		c.Response.Status = http.StatusBadRequest
		return c.RenderText("could not parse request")
	}
	if err := database.Documents.Find(bson.M{"id": document.GetId()}).All(&existingDocument); err != nil {
		// Internal Server Error
		log.Print(err)
		c.Response.Status = http.StatusInternalServerError
		return c.RenderText("could not be saved")
	}
	if len(existingDocument) == 0 {
		// Not found, execute insert:
		if err := database.Documents.Insert(document); err != nil {
			// Internal Server Error
			log.Print(err)
			c.Response.Status = http.StatusInternalServerError
			return c.RenderText("could not be saved")
		}
		c.Response.Status = http.StatusCreated
		return c.RenderJSON(document)
	}
	log.Print(existingDocument)
	// Document already exists in the DB, execute update:
	colQuerier := bson.M{"id": document.GetId()}
	change := bson.M{"$push":bson.M{"categories":bson.M{"$each":document.GetCategories()}}}
	err := database.Documents.Update(colQuerier, change)
	if err != nil {
		// Internal Server Error
		log.Print(err)
		c.Response.Status = http.StatusInternalServerError
		return c.RenderText("could not be updated")
	}
	result := models.Document{}
	err = database.Documents.Find(bson.M{"id": document.GetId()}).One(&result);
	c.Response.Status = http.StatusOK
	return c.RenderJSON(result)
}

func (c Documents) RemoveCategories() revel.Result {
	document := &models.Document{}
	body := c.Params.JSON
	if err := json.Unmarshal(body, document); err != nil {
		log.Print(err)
		c.Response.Status = http.StatusBadRequest
		return c.RenderText("could not parse request")
	}
	existingDocument := []models.Document{}
	if err := database.Documents.Find(bson.M{"id": document.GetId()}).All(&existingDocument); err != nil {
		// Internal Server Error
		log.Print(err)
		c.Response.Status = http.StatusInternalServerError
		return c.RenderText("could not be saved")
	}
	if len(existingDocument) == 0 {
		log.Print("Not found")
		c.Response.Status = http.StatusNotFound
		return c.RenderText("could not found a file with the given id.")
	}
	colQuerier := bson.M{"id": document.GetId()}
	change := bson.M{"$pullAll":bson.M{"categories":document.GetCategories()}}
	err := database.Documents.Update(colQuerier, change)
	if err != nil {
		// Internal Server Error
		log.Print(err)
		c.Response.Status = http.StatusInternalServerError
		return c.RenderText("could not be updated")
	}
	result := models.Document{}
	err = database.Documents.Find(bson.M{"id": document.GetId()}).One(&result);
	c.Response.Status = http.StatusOK
	return c.RenderJSON(result)
}

func (c Documents) GetFilesWithCategory(category_name string) revel.Result {
	results := []models.Document{}
	if err := database.Documents.Find(bson.M{"categories": category_name}).All(&results); err != nil {
		// Internal Server Error
		log.Print(err)
		c.Response.Status = http.StatusInternalServerError
		return c.RenderText("Internal Server Error")
	}
	c.Response.Status = http.StatusOK
	return c.RenderJSON(results)
}
