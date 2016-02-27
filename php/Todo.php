<?php

 /*
   Class Todo 
 */
 
 class Todo {
 	
 	private $data;
 	 
 
 	public function __construct($name){
 		
 		if(is_array($name))
		$this->$data = $name;
 	    
	}
 	
 	
    public static function create($name) {
 

         if(file_exists("php/data.json")) {
    		   	
          $file = file_get_contents('php/data.json');
          
          $taskList = json_decode($file,TRUE);
          
          unset($file);  
           
          $taskList[] = array('name'=>$name);
          
          file_put_contents('php/data.json',json_encode($taskList));
          
          unset($taskList); 
          	
            } 
               else {
                  	
		    return FALSE;
	      }

 } 
	
	public static function delete($name) {
		
         $current = trim($name);

         if(file_exists("php/data.json")){
         	
		 	$file = file_get_contents('php/data.json');
		 		
	        $taskList=json_decode($file,TRUE);
	        
             foreach ( $taskList  as $key => $value){

  	          if (in_array( $current, $value)) {	
  	         	
                       unset($taskList[$key]);
                    }
	          } 

       file_put_contents('php/data.json',json_encode($taskList));
       unset($taskList);  
	  }     
  }
	
 
 	public static function update($oldname,$name) {
 		
 	   $oldname = trim($oldname);
 	   $newname = trim($name);
 		
       if( isset($oldname) || isset($newname) ) {
  	
  	     if(file_exists("php/data.json")){
         	
		 	$file = file_get_contents('php/data.json');
		 		
	        $taskList=json_decode($file,TRUE);
	        
             foreach ( $taskList  as $key => $value){

  	         if (in_array( $oldname, $value)) {	
  	         	
                      $taskList[$key]  = array('name'=>	$newname);
                   }
     
	          } 

          file_put_contents('php/data.json',json_encode($taskList));
          unset($taskList);   
	     }   else {
	  	
	     	return FALSE;
        }
      }
    }
 } 
   