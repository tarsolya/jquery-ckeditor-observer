/**
 * jQuery Observer for CKEDITOR
 *
 * @author Tarsoly András (tarsoly[dot]andras[at]xpnindustries[dot]com)
 *
 * Licensed under the MIT License
 *
 * Usage: 
 * $("form").observe(10, function() {
 *   console.log("It's dirty!")
 * });
 *
 * Checks the form each 10 seconds. If the form has changes since last time including CKEDITOR instances,
 * the value of the original textarea elements gets updated from the respective CKEDITOR instance,
 * then the callback gets called.
 * 
 * Great for implementing autosave feature via Ajax in combination with jQuery Forms.
 * 
 * TODO:
 *   - make specific CKEDITOR instances targetable
 */

$.fn.observe = function(seconds, callback){
	return this.each(function(){
		var form = this, dirty = false;

		$(form.elements).change(function(){
    	dirty = true;
		});

		setInterval(function(){
			if(typeof(CKEDITOR) !== "undefined") {
				for(var instanceName in CKEDITOR.instances) {
					if(CKEDITOR.instances[instanceName].checkDirty()) {
						$('textarea#' + instanceName).val(CKEDITOR.instances[instanceName].getData());
						dirty = true;
						CKEDITOR.instances[instanceName].resetDirty();
					};
				}
			}
    	if (dirty) callback.call(form);
      dirty = false;
		}, seconds * 1000);
	});
};
