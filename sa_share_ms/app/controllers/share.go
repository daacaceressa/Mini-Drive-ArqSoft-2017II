package controllers

import (
	"encoding/json"
	"errors"
	"github.com/revel/revel"
	"gopkg.in/mgo.v2/bson"
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

func (c ShareController) Show(id string) revel.Result {
	var (
		share   models.Share
		err     error
		shareID bson.ObjectId
	)

	if id == "" {
		errResp := buildErrResponse(errors.New("Invalid share id format"), "400")
		c.Response.Status = 400
		return c.RenderJSON(errResp)
	}

	shareID, err = convertToObjectIdHex(id)
	if err != nil {
		errResp := buildErrResponse(errors.New("Invalid share id format"), "400")
		c.Response.Status = 400
		return c.RenderJSON(errResp)
	}

	share, err = models.GetShare(shareID)
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
		share models.Share
		err   error
	)

	err = json.NewDecoder(c.Request.Body).Decode(&share)
	if err != nil {
		errResp := buildErrResponse(err, "403")
		c.Response.Status = 403
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

func (c ShareController) Update() revel.Result {
	var (
		share models.Share
		err   error
	)
	err = json.NewDecoder(c.Request.Body).Decode(&share)
	if err != nil {
		errResp := buildErrResponse(err, "400")
		c.Response.Status = 400
		return c.RenderJSON(errResp)
	}

	err = share.UpdateShare()
	if err != nil {
		errResp := buildErrResponse(err, "500")
		c.Response.Status = 500
		return c.RenderJSON(errResp)
	}
	return c.RenderJSON(share)
}

func (c ShareController) Delete(id string) revel.Result {
	var (
		err     error
		share   models.Share
		shareID bson.ObjectId
	)
	if id == "" {
		errResp := buildErrResponse(errors.New("Invalid share id format"), "400")
		c.Response.Status = 400
		return c.RenderJSON(errResp)
	}

	shareID, err = convertToObjectIdHex(id)
	if err != nil {
		errResp := buildErrResponse(errors.New("Invalid share id format"), "400")
		c.Response.Status = 400
		return c.RenderJSON(errResp)
	}

	share, err = models.GetShare(shareID)
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
	return c.RenderJSON(nil)
}
