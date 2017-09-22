package models

import (
  "gopkg.in/mgo.v2/bson"
  "sa_share_ms/app/mongodb"
  "time"
)

type Share struct {
  ID        bson.ObjectId `json:"id,omitempty" bson:"_id,omitempty"`
  UserId    int           `json:"user_id" bson:"user_id"`
  FilesId   []int         `json:"files_id" bson:"files_id"`
  CreatedAt time.Time     `json:"created_at,omitempty" bson:"created_at,omitempty"`
  UpdatedAt time.Time     `json:"updated_at,omitempty" bson:"updated_at,omitempty"`
}

type Response struct {
  UserId    int           `json:"user_id,omitempty" bson:"user_id,omitempty"`
  FileId    int           `json:"file_id" bson:"file_id"`
}

// AddShare insert a new Share into database and returns
// last inserted share on success.
func AddShare(r Response) (Share, error) {
  var (
    currentShare  Share
    err           error
    flag          int
  )
  currentShare, err = GetShare(r.UserId)
  if err != nil {
    currentShare.ID = bson.NewObjectId()
    currentShare.UserId = r.UserId
    currentShare.FilesId = []int{r.FileId}
    currentShare.CreatedAt = time.Now()
    currentShare.UpdatedAt = time.Now()
    return currentShare, mongodb.Shares.Insert(currentShare)
  }
  flag = 0
  for _, v := range currentShare.FilesId {
    if v == r.FileId {
      flag = 1
      break
    }
  }
  if flag == 1 {
    return currentShare, nil
  }
  currentShare.FilesId = append(currentShare.FilesId, r.FileId)
  return currentShare, currentShare.UpdateShare()
}

// UpdateShare update a Share into database and returns
// last nil on success.
func (m Share) UpdateShare() error {
  var (
    err error
  )
  err = mongodb.Shares.Update(bson.M{
    "_id": m.ID,
  }, bson.M{
    "$set": bson.M{
      "files_id": m.FilesId, "updated_at": time.Now()},
  })
  return err
}

// DeleteShare Delete Share from database and returns
// last nil on success.
func (m Share) DeleteShare(fileId int) error {
  var (
    err   error
  )
  err = mongodb.Shares.Update(bson.M{
    "_id": m.ID,
  }, bson.M{ 
    "$pullAll": bson.M{ "files_id": []int{fileId} },
  })
  return err
}

// GetShares Get all Share from database and returns
// list of Share on success
func GetShares() ([]Share, error) {
  var (
    shares []Share
    err    error
  )
  err = mongodb.Shares.Find(bson.M{}).All(&shares)
  return shares, err
}

// GetShare Get a Share from database and returns
// a Share on success
func GetShare(userId int) (Share, error) {
    var (
    share  Share
    err    error
  )
  err = mongodb.Shares.Find(bson.M{"user_id": userId}).One(&share)
  return share, err
}
