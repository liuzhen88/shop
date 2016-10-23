$(function(){
	$('.list').removeClass('has-select');
	var quill = new Quill('#editor-container', {
	    modules: {
	      formula: true,
	      syntax: true,
	      toolbar: '#toolbar-container'
	    },
	    placeholder: 'Compose an epic...',
	    theme: 'snow'
	});
	var content = $("#editor-container").attr('data-content');
	$(".ql-editor").append(content);
});