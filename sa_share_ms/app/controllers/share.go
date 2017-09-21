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

func (c ShareController) Show(user_id string) revel.Result {
	var (
		shares  []models.Share
		err     error
		UserId 	int
	)
	
	if user_id == "" {
		errResp := buildErrResponse(errors.New("Invalid user id format"), "400")
		c.Response.Status = 400
		return c.RenderJSON(errResp)
	}
	
	UserId, err = parseInt(user_id)
	if err != nil {
		errResp := buildErrResponse(errors.New("Invalid user id format"), "400")
		c.Response.Status = 400
		return c.RenderJSON(errResp)
	}

	shares, err = models.GetShare(UserId)
	if err != nil {
		errResp := buildErrResponse(err, "500")
		c.Response.Status = 500
		return c.RenderJSON(errResp)
	}

	c.Response.Status = 200
	return c.RenderJSON(shares)
}

func (c ShareController) Create() revel.Result {
	var (
		share models.Share
		err   error
	)
	err = json.Unmarshal(c.Params.JSON, &share)
	if err != nil {
		errResp := buildErrResponse(err, "400")
		c.Response.Status = 400
		return c.RenderJSON(errResp)
	}

	share, err = models.AddShare(share)
	if err != nil {
		errResp := buildErrResponse(err, "500")
		c.Response.Status = 500
		return c.RenderJSON(errResp)
	}
	c.Response.Status = 201
	return c.RenderJSON(share)
}

func (c ShareController) Delete(user_id string, file_id string) revel.Result {
	var (
		err     error
		share   models.Share
		UserId  int
		FileId  int
	)
	if user_id == "" || file_id == "" {
		errResp := buildErrResponse(errors.New("Invalid ids format"), "400")
		c.Response.Status = 400
		return c.RenderJSON(errResp)
	}
	UserId, err = parseInt(user_id)
	if err != nil {
		errResp := buildErrResponse(errors.New("Invalid user id format"), "400")
		c.Response.Status = 400
		return c.RenderJSON(errResp)
	}
	FileId, err = parseInt(file_id)
	if err != nil {
		errResp := buildErrResponse(errors.New("Invalid file id format"), "400")
		c.Response.Status = 400
		return c.RenderJSON(errResp)
	}
	share, err = models.GetShareByFile(UserId, FileId)
	if err != nil {
		errResp := buildErrResponse(err, "500")
		c.Response.Status = 500
		return c.RenderJSON(errResp)
	}
	err = share.DeleteShare()
	if err != nil {
		errResp := buildErrResponse(err, "500")
		c.Response.Status = 500
		return c.RenderJSON(errResp)
	}
	c.Response.Status = 204
	return c.RenderJSON("ok")
}