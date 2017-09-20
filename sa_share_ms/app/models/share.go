package models

import (
	"gopkg.in/mgo.v2/bson"
	"sa_share_ms/app/models/mongodb"
	"time"
)

type Share struct {
	ID        bson.ObjectId `json:"id,omitempty" bson:"_id,omitempty"`
	UserId    int           `json:"user_id" bson:"user_id"`
	FileId    int           `json:"file_id" bson:"file_id"`
	CreatedAt time.Time     `json:"created_at" bson:"created_at"`
	UpdatedAt time.Time     `json:"updated_at" bson:"updated_at"`
}

// AddShare insert a new Share into database and returns
// last inserted share on success.
func AddShare(m Share) (share Share, err error) {
	// c := newShareCollection()
	// defer c.Close()
	m.ID = bson.NewObjectId()
	m.CreatedAt = time.Now()
	return m, mongodb.Shares.Insert(m)
}

// UpdateShare update a Share into database and returns
// last nil on success.
func (m Share) UpdateShare() error {
	// c := newShareCollection()
	//defer c.Close()

	err := mongodb.Shares.Update(bson.M{
		"_id": m.ID,
	}, bson.M{
		"$set": bson.M{
			"user_id": m.UserId, "file_id": m.FileId, "updated_at": time.Now()},
	})
	return err
}

// DeleteShare Delete Share from database and returns
// last nil on success.
func (m Share) DeleteShare() error {
	// c := newShareCollection()
	//defer c.Close()

	err := mongodb.Shares.Remove(bson.M{"_id": m.ID})
	return err
}

// GetShares Get all Share from database and returns
// list of Share on success
func GetShares() ([]Share, error) {
	var (
		shares []Share
		err    error
	)

	// c := newShareCollection()
	//defer c.Close()

	//err = mongodb.Shares.Find(bson.M{}).All(&shares)
	return shares, err
}

// GetShare Get a Share from database and returns
// a Share on success
func GetShare(id bson.ObjectId) (Share, error) {
	var (
		share Share
		err   error
	)

	// c := newShareCollection()
	//defer c.Close()

	err = mongodb.Shares.Find(bson.M{"_id": id}).One(&share)
	return share, err
}
