var modal = null;
$(document).ready(function(){
	$('.fa-remove').on('click', function(event){
		if(modal){
			modal.modal();
			modalHeader('Are you sure?');
			deleteBody();
		}
	});

	$('.fa-edit').on('click', function(event){
		if(modal){
			modal.modal();
			modalHeader('Edit');

			editModal($(this).parent().parent().data("id"));
		}
	});

});

function createBootModal(){
	modal = $(
	'<div class="modal">'+
	  '<div class="modal-dialog">'+
	    '<div class="modal-content">'+
	      '<div class="modal-header">'+
	      '</div>'+
	      '<div class="modal-body">'+
	      '</div>'+
	      '<div class="modal-footer">'+
	     ' </div>'+
	    '</div>'+
	  '</div>'+
	'</div>');

	$('body').append(modal);
}

function modalHeader(title){
	$('.modal-header').html('<h4 class="modal-title">'+ title +'<button class="btn btn-danger pull-right" data-dismiss="modal">X</button></h4>');
}

function defaultBody(){
	
}

function deleteBody(){
	$('.modal-body').html('');
}

function editModal(id){
	$('.modal-body').html('<p>' + id + '</p>');
}

createBootModal();