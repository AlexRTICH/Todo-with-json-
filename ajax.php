<?php

require_once("php/Todo.php");

switch ($_REQUEST['action']) {
     
    case 'create':
 
        Todo::create($_GET['name']);

        break;
        
    case 'deleted':
    
        Todo::delete($_GET['name']);
     
        break;
      
     case 'update':
 
     Todo::update($_GET['oldname'],$_GET['name']);
  
 
        break;  
        
}

?>