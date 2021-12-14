<?php
    //File for future improvements
    class FileUpload {

        private $file = "";
        private $fileName = "";
        private $fileType = "";
        private $fileSize = "";
        private $newName = "";
        private $targetFolder = "";

        function __construct($file) {
            $this->file = $userPhoto;
            $this->fileName = $userPhoto->name;
            $this->fileType = strtolower(pathinfo($userPhoto->name,PATHINFO_EXTENSION));
            $this->fileSize = $userPhoto->size;
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

        public function UploadFile($targetFolder) {
            move_uploaded_file($this->file["tmp_name"], $targetFolder . $this->fileName);
        }
    }

    if(isset($_POST['action'])) {
        // If the 'upload' action is called, then do this
        if($_POST['action'] == "uploadPic") {

            $userPhoto = json_decode(file_get_contents('php://input'));
            // Creates a new instance of the FileUpload class
            $newUpload = new FileUpload($userPhoto);

           
            $newUpload->GetFileName() . "<br>";
            $newUpload->GetFileType() . "<br>";
            $newUpload->GetFileSize() . "<br>";
            
            $newUpload->UploadFile("src/img/userPhotos/");

            $response['savePhoto'] = TRUE;
            echo json_encode($response);
            
        }
    }
?>