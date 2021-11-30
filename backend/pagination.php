<?php

class Pagination {
    private $fullObjectArray = [];

    function __construct(array $fullArray) {
        $this->fullObjectArray = $fullArray;
    }

    public function SetObjectsPerPage($value) {
        // Makes sure the value can not be 0 or negative
        
        // Updates the objects per page and total pages properties
    }

    public function GetTotalPages() {
        // Return the number of total pages        
    }

    public function GetTotalObjects() {
        // Return the number of total objects
    }

    public function GetPageContent($pageToShow) {
        // Restrict the current page to be within the boundaries of pages available, and must not be less than 1

        // Calculate the offset, used for slicing the array, to display the correct objects

        // Slice the full array into a chunk

        // Return the sliced array
    }
}

?>