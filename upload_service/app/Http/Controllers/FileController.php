<?php

namespace App\Http\Controllers;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of FileController
 *
 * @author MSI

 */
use Input;
use Session;
use Storage;
use File;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class FileController extends Controller {

    public function getImage($one, $two, $three, $four = null, $five = null) {

        $disk = Storage::disk();
        $path = $one . "/" . $two . "/" . $three . "/" . $four . "/" . $five;
        $response = new StreamedResponse;
        $fs = Storage::getDriver();
        $type = $fs->getMimetype($path);

        $response->setCallBack(function() use($disk, $path) {
            //dd($file);
            echo $disk->get($path);
        });



        $response->headers->set('Content-Type', $type);
        return $response;
    }

    public function uploadFile(Request $request, $id) {

        $file = $request->file('file');

        if ($file != null) {
            $name = $file->getClientOriginalName();
            $name = $this->limpiarCaracteresEspeciales($name);
            $name = str_replace(' ', '_', $name);
            $path = "files/" . $id . '/' . $name;
        } else {
            return json_encode(['status' => 400, 'message' => 'No se ha cargado ningun archivo']);
        }
        if ($this->verifyFile($path)) {
            return json_encode(['status' => 300, 'message' => 'El nombre de archivo ya existe en el sistema']);
        } else {
            if (Storage::disk()->put($path, File::get($file))) {
                return json_encode(['status' => 200, 'message' => 'El archivo fue cargado exitosamente']);
            } else {
                return json_encode(['status' => 500, 'message' => 'Al parecer hubo un problema en la conexión, no se pudo cargar el archivo']);
            }
        }
    }

    public function downloadFile($one, $two = null, $three = null, $four = null, $five = null) {

        $path = "files/" . $one . "/" . $two . "/" . $three . "/" . $four . "/" . $five;
//        dd($path);

        $disk = Storage::disk();
        $response = new StreamedResponse;
        $fs = Storage::getDriver();
        $type = $fs->getMimetype($path);
        $s = explode("/", $path);
        $name = array_pop($s);
//        dd($name);


        $response->setCallBack(function() use($disk, $path) {
            //dd($file);
            echo $disk->get($path);
        });

        $disposition = $response->headers->makeDisposition(ResponseHeaderBag::DISPOSITION_ATTACHMENT, $name);
        $response->headers->set('Content-Type', $type); //application/pdf, image/jpeg etc.
        $response->headers->set('Content-Disposition', $disposition);
        $response->headers->set('Cache-Control', '');
        $response->headers->set('Last-Modified', gmdate('D, d M Y H:i:s'));

        return $response;
    }

    public function listOfFiles($id) {

//            $files = $item->function_files_id()->getResults();
        $files = Storage::files("files/" . $id . "/");
        dd($files);
        $r = array();
        foreach ($files as $key => $f) {
            $s = explode("/", $f);
            $name = array_pop($s);
            array_push($r, ['id' => $key, 'name' => $name, 'path' => $f]);
        }
        return $r;
    }

    public function deleteFile() {
        $module = Input::get("module");
        $path = Input::get("path");

        if (Storage::delete($path)) {
            return 100;
        }
        return 300;
    }

    public function verifyFile($path) {

//        $object = 'App\\File' . ucfirst($module);
//        $n = $object::where($module . '_id', '=', $id)->where('name', '=', $name)->get();
//        // dd(sizeof($n));

        if (Storage::disk()->exists($path)) {
//            return true;
            return false;
        } else {
            return false;
        }
    }

    function limpiarCaracteresEspeciales($string) {
        $string = htmlentities($string);
        $string = preg_replace('/\&(.)[^;]*;/', '\\1', $string);
        return $string;
    }

}

?>
