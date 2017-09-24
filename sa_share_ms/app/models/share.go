package models

import (
  "gopkg.in/mgo.v2/bson"
  "sa_share_ms/app/mongodb"
  "time"
)

type Share struct {
  UserId    string        `json:"user_id" bson:"user_id"`
  FilesId   []string      `json:"files_id" bson:"files_id"`
  CreatedAt time.Time     `json:"created_at" bson:"created_at"`
  UpdatedAt time.Time     `json:"updated_at" bson:"updated_at"`
}

type Response struct {
  UserId    string        `json:"user_id,omitempty" bson:"user_id,omitempty"`
  FileId    string        `json:"file_id" bson:"file_id"`
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
    currentShare.UserId = r.UserId
    currentShare.FilesId = []string{r.FileId}
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
    "user_id": m.UserId,
  }, bson.M{
    "$set": bson.M{
      "files_id": m.FilesId, "updated_at": time.Now()},
  })
  return err
}

// DeleteShare Delete Share from database and returns
// last nil on success.
func (m Share) DeleteShare(fileId string) error {
  var (
    err   error
  )
  err = mongodb.Shares.Update(bson.M{
    "user_id": m.UserId,
  }, bson.M{ 
    "$pullAll": bson.M{ "files_id": []string{fileId} },
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
func GetShare(userId string) (Share, error) {
  var (
    share  Share
    err    error
  )
  err = mongodb.Shares.Find(bson.M{"user_id": userId}).One(&share)
  return share, err
}
