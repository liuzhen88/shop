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
	var quills = new Quill('#editor-containers', {
	    modules: {
	      formula: true,
	      syntax: true,
	      toolbar: '#toolbar-containers'
	    },
	    placeholder: 'Compose an epic...',
	    theme: 'snow'
	});
	var content = $("#editor-container").attr('data-content');
	var enContent = $("#editor-containers").attr('data-content');
	$(".ql-editor").eq(0).append(content);
	$(".ql-editor").eq(1).append(enContent);
});