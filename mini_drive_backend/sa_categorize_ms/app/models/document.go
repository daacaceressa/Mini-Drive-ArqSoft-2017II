package models

/*
Document model
*/
type Document struct {
	ID    string `json:"id" bson:"id"`
	Categories []string `json:"categories" bson:"categories"`
}

func (f Document) GetId() string {
    return f.ID
}

func (f Document) GetCategories() []string {
	return f.Categories
}