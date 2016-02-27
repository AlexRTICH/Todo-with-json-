
$(document).ready(function() {
	
	
 //---- Item create and update vews list    
	
	$todoList = $('#todo-list');
	$('#new-todo').keypress(function(e) {
    if (e.which === 13) {
			$('.destroy').off('click');
			$('.toggle').off('click');
			var todos = $todoList.html();
			var $nameCurrentItem = $('#new-todo').val();
      todos += ""+
			"<li class='task'>" +
            "<div class='view'>" +
            "<input class='toggle lite-green-check' type='checkbox'>" +
            "<label data=''>"   + $nameCurrentItem + "</label>" +
            "<a class='destroy'></a>" +
            "<form>"+
            "<input class='edit' type='text' > " +
            "<button class='ok_edit'> OK </button> "+
            "</form>"+
            "</div>" +
           "</li>";
   	  
	  $(this).val('');
		$todoList.html(todos);
		startBuild();
		$('#main').show();
		
		// Saving after creating with AJAX   
         $.get( "ajax.php?action=create", { name: $nameCurrentItem } );   
    
  }}); // end  create
	
	 
		function startBuild() {
	
	   //--- delete Task		
        $('.destroy').on('click', function(e) {
          $currentListItem = $(this).closest('li');
          newTxt = $(this).parent().find('label').text(); 
          $currentListItem.remove();
          
        // Delete with AJAX        
          $.get( "ajax.php?action=deleted", { name: newTxt } );  
           
        });
        
       //--- update event    
        $( 'div' ).delegate( 'li', 'dblclick', function() {
              $(this).find('label').css('opacity', '0');
              $(this).find('.ok_edit').css('display', 'block');
			  $(this).find('.edit')
				.css('display', 'block')
				.val($(this).find('label').text())
				.focus();		
			 var  prevStr = $(this).find('label').text();	
	         localStorage.setItem('todos', prevStr);
              });
              
        $( '.ok_edit' ).click(function() {
        	
        	var $li = $(this).closest('li');
			var value = $li.find('.edit').val();
			$li.find('label')
					.text(value)
					.css('opacity', '1')
					.end()
					.find('.edit')
					.css('display', 'none');
					
			newStr  = $li.find('.edit').val();	
			$('.ok_edit').css('display', 'none');		
        	$('form').submit(function () {
              return false;
             });
             
         // update task with a new name with AJAX        
           $.get( "ajax.php?action=update", { oldname: localStorage.todos, name: newStr } );  
                   
        }) ;     
         
      //--- Chekbox event	
        $('.toggle').on('click', function(e) {
          var $currentListItemLabel = $(this).closest('li').find('label');
		  /*
		   * Do this or add css and remove JS dynamic css.
		   */
		  if ( $currentListItemLabel.attr('data') == 'done' ) {
			  $currentListItemLabel.attr('data', '');
		      $currentListItemLabel.css('font-weight', 'normal');
		  }
		  else {
			  $currentListItemLabel.attr('data', 'done');
              $currentListItemLabel.css('font-weight', 'bold');
		  }
			});
		}
 
});

