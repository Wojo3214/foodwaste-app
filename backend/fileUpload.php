<?php
    class FileUpload {

        private $file = "";
        private $fileName = "";
        private $fileType = "";
        private $fileSize = "";
        private $newName = "";
        private $targetFolder = "";

        function __construct($file) {
            $this->file = $foodPhoto;
            $this->fileName = $foodPhoto->name;
            $this->fileType = strtolower(pathinfo($foodPhoto->name,PATHINFO_EXTENSION));
            $this->fileSize = $foodPhoto->size;
        }

        public function GetFileName() {
            return $this->fileName;
        }

        public function GetFileType() {
            return $this->fileType;
        }

        public function GetFileSize() {
            return $this->fileSize;
        }

        // public function RenameFile($newName) {
        //     return $this->fileName = $newName . '.' . $this->fileType;
        // }

        public function UploadFile($targetFolder) {
            move_uploaded_file($this->file["tmp_name"], $targetFolder . $this->fileName);
        }
    }

    if(isset($_POST['action'])) {
        // If the 'upload' action is called, then do this
        if($_POST['action'] == "upload") {

            $foodPhoto = json_decode(file_get_contents('php://input'));
            // Creates a new instance of the FileUpload class
            $newUpload = new FileUpload($foodPhoto);

           
            $newUpload->GetFileName() . "<br>";
            $newUpload->GetFileType() . "<br>";
            $newUpload->GetFileSize() . "<br>";
            // $newUpload->RenameFile($_SESSION['userID']) . "<br>";
            
            $newUpload->UploadFile("src/foodImg/");

            $response['savePhoto'] = TRUE;
            echo json_encode($response);
            
        }
    }
?>