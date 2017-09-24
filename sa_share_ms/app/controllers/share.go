package controllers

import (
	"encoding/json"
	"errors"
	"github.com/revel/revel"
	//"gopkg.in/mgo.v2/bson"
	"sa_share_ms/app/models"
)

type ShareController struct {
	*revel.Controller
}

func (c ShareController) Index() revel.Result {
	var (
		shares []models.Share
		err    error
	)

	shares, err = models.GetShares()
	if err != nil {
		errResp := buildErrResponse(err, "500")
		c.Response.Status = 500
		return c.RenderJSON(errResp)
	}

	c.Response.Status = 200
	return c.RenderJSON(shares)
}

func (c ShareController) Show(userId string) revel.Result {
	var (
		share   models.Share
		err     error
	)
	
	if userId == "" {
		errResp := buildErrResponse(errors.New("Invalid user id format"), "400")
		c.Response.Status = 400
		return c.RenderJSON(errResp)
	}

	share, err = models.GetShare(userId)
	if err != nil && err.Error() == "not found" {
		errResp := buildErrResponse(err, "404")
		c.Response.Status = 404
		return c.RenderJSON(errResp)
	}

	if err != nil {
		errResp := buildErrResponse(err, "500")
		c.Response.Status = 500
		return c.RenderJSON(errResp)
	}

	c.Response.Status = 200
	return c.RenderJSON(share)
}

func (c ShareController) Create() revel.Result {
	var (
		share 		models.Share
		response 	models.Response
		err   		error
	)

	err = json.Unmarshal(c.Params.JSON, &response)
	if err != nil {
		errResp := buildErrResponse(err, "400")
		c.Response.Status = 400
		return c.RenderJSON(errResp)
	}

	share, err = models.AddShare(response)
	if err != nil {
		errResp := buildErrResponse(err, "500")
		c.Response.Status = 500
		return c.RenderJSON(errResp)
	}

	c.Response.Status = 201
	return c.RenderJSON(share)
}

func (c ShareController) Delete(userId string, fileId string) revel.Result {
	var (
		err     error
		share   models.Share
	)

	if userId == "" || fileId == "" {
		errResp := buildErrResponse(errors.New("Invalid ids format"), "400")
		c.Response.Status = 400
		return c.RenderJSON(errResp)
	}

	share, err = models.GetShare(userId)
	if err != nil && err.Error() == "not found" {
		errResp := buildErrResponse(err, "404")
		c.Response.Status = 404
		return c.RenderJSON(errResp)
	}

	if err != nil {
		errResp := buildErrResponse(err, "500")
		c.Response.Status = 500
		return c.RenderJSON(errResp)
	}

	err = share.DeleteShare(fileId)
	if err != nil {
		errResp := buildErrResponse(err, "500")
		c.Response.Status = 500
		return c.RenderJSON(errResp)
	}

	c.Response.Status = 200
	return c.RenderText("Ok")
}