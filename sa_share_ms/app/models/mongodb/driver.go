package mongodb

import "gopkg.in/mgo.v2"

var Session *mgo.Session
var Shares *mgo.Collection

func CheckAndInitServiceConnection(uri, dbname string) error {
  session, err := mgo.Dial(uri)
  if err != nil {
    return err
  }

  session.SetMode(mgo.Monotonic, true)

  Session = session
  Shares = session.DB(dbname).C("shares")

  return nil
}
