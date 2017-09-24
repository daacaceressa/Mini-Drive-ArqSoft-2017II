// GENERATED CODE - DO NOT EDIT
package routes

import "github.com/revel/revel"


type tApp struct {}
var App tApp


func (_ tApp) Index(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("App.Index", args).URL
}


type tDocuments struct {}
var Documents tDocuments


func (_ tDocuments) Create(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("Documents.Create", args).URL
}

func (_ tDocuments) Index(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("Documents.Index", args).URL
}

func (_ tDocuments) ShowCategories(
		id string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "id", id)
	return revel.MainRouter.Reverse("Documents.ShowCategories", args).URL
}

func (_ tDocuments) Delete(
		id string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "id", id)
	return revel.MainRouter.Reverse("Documents.Delete", args).URL
}

func (_ tDocuments) AddCategories(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("Documents.AddCategories", args).URL
}

func (_ tDocuments) RemoveCategories(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("Documents.RemoveCategories", args).URL
}

func (_ tDocuments) GetFilesWithCategory(
		category_name string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "category_name", category_name)
	return revel.MainRouter.Reverse("Documents.GetFilesWithCategory", args).URL
}


type tStatic struct {}
var Static tStatic


func (_ tStatic) Serve(
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.Serve", args).URL
}

func (_ tStatic) ServeModule(
		moduleName string,
		prefix string,
		filepath string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "moduleName", moduleName)
	revel.Unbind(args, "prefix", prefix)
	revel.Unbind(args, "filepath", filepath)
	return revel.MainRouter.Reverse("Static.ServeModule", args).URL
}


type tTestRunner struct {}
var TestRunner tTestRunner


func (_ tTestRunner) Index(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("TestRunner.Index", args).URL
}

func (_ tTestRunner) Suite(
		suite string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "suite", suite)
	return revel.MainRouter.Reverse("TestRunner.Suite", args).URL
}

func (_ tTestRunner) Run(
		suite string,
		test string,
		) string {
	args := make(map[string]string)
	
	revel.Unbind(args, "suite", suite)
	revel.Unbind(args, "test", test)
	return revel.MainRouter.Reverse("TestRunner.Run", args).URL
}

func (_ tTestRunner) List(
		) string {
	args := make(map[string]string)
	
	return revel.MainRouter.Reverse("TestRunner.List", args).URL
}


