$(function(){ 
	(function() {
		var vendapersonalizada = {
	        init: function() {
	            this.menu();
	            //this.load('prazo_preco_quantidade');
	        },
	        menu: function() {
	        	//Mobile
	        	$('main nav > ul > li:first-child a').click(function() {
	        		$(this).find('i').toggleClass('fa-bars').toggleClass('fa-times');
	        		$(this).closest('ul').find('>li').not(':first').fadeToggle('fast');
	        	});
	        	//First Level
	        	$('main nav > ul > li > a').click(function() {
	        		$('main nav > ul li').removeClass('active');
	        		$(this).parent().addClass('active');
	        	});
	        	//Second Level
	        	$('main nav > ul > li > ul > li > a').click(function() {
	        		vendapersonalizada.loader(1);
	        		vendapersonalizada.load($(this).attr('data-url'));
	        		$('main nav > ul li').removeClass('active');
	        		$(this).parent().addClass('active').parents('li').addClass('active');
	        		if( vendapersonalizada.wSize() < 990 ){
	        			$('main nav > ul > li:first-child a').click();
	        		}
	        	})
	        	$( window ).resize(function() {
	        		$('main nav > ul li:first-child a i').removeClass('fa-times').addClass('fa-bars');
					$('main nav > ul li').removeAttr('style');
				});
	        },
	        load: function(page){
	        	$.ajax({
        			url: "pages/"+page+".html",
	        		beforeSend: function(){
						$('body main section').html('');
	        		},
	        		success: function(result){
			        	$('body main section').html(result);
				    },
				    complete: function(){ 
				    	vendapersonalizada.loader(0); 
				    	switch(page){
				    		case 'segmentacao':
				    		vendapersonalizada.segmentacao(); 
				    		break;
				    		case 'base':
				    		vendapersonalizada.base(); 
				    		break;
				    		case 'amostra':
				    		vendapersonalizada.amostra(); 
				    		break;
				    		case 'finalidade_produto':
				    		vendapersonalizada.finalidadeProduto(); 
				    		break;
				    	}
				    }
				})
	        },
	        loader: function(l){
	        	if(l){
		        	$('loader').remove();
		        	var html = '<loader><img src="images/loader.gif" height="32" width="32" /></loader>';
		        	$('body main').prepend(html);
		        }else{
		        	$('loader').fadeOut('fast',function(){
		        		$(this).remove();
		        	});
		        }
	        },
	        navButtons: function(st){
	        	var btns = $('form fieldset a.btn.next, form fieldset a.btn.prev');
	        	if(st){
	        		btns.fadeIn('fast');
	        	}else{
	        		btns.hide();
	        	}
	        },
	        wSize: function(){
	        	return $(window).width();
	        },
	        segmentacao:function(){
				vendapersonalizada.navButtons(0);
	        	$('body main section form.segmentacao > fieldset > .radio input[type=radio]').click(function() {
	        		var _t = $(this);
	        		_t.closest('form').find('div.l-both > ul').addClass('hide');
	        		switch($(this).val()){
	        			case 'yes':
	        				_t.closest('form').find('div.l-both').removeClass('hide').find(' > ul:eq(0)').removeClass('hide');
	        				break;
	        			case 'no':
	        				_t.closest('form').find('div.l-both').removeClass('hide').find(' > ul:eq(1)').removeClass('hide');
	        				break;
	        		}
	        		vendapersonalizada.navButtons(1);
	        	});
	        },
	        base: function(){
	        	vendapersonalizada.navButtons(0);
	        	$('body main section form.base > fieldset .btns a').click(function() {
	        		$(this).parent().find('a').removeClass('active');
	        		$(this).addClass('active');
	        		var _f = $(this).closest('form');
	        		var _v = $(this).attr('data-value');
	        		_f.find('.base').addClass('hide');
	        		switch(_v){
	        			case '1':
	        				_f.find('div.existBase').removeClass('hide');
	        				break;
	        			case '0':
	        				_f.find('div.newBase').removeClass('hide');
	        				vendapersonalizada.baseNova();
	        				break;
	        		}
	        		vendapersonalizada.navButtons(1);
	        	});
	        },
	        baseNova: function(){
	        	$('body main section form.base > fieldset .newBase > ul li input[type=radio]').click(function() {
	        		$(this).closest('ul').hide('fast',function(){
	        			$(this).next('div').removeClass('hide');
	        		})
	        	});
	        },
	        amostra: function(){
	        	var _field = $('#pantoneCode');
	        	var _codes = $('ul.block.codes');
	        	_field.next('a').click(function() {
	        		if( _field.val().length > 0 ){
		        		_codes.prepend('<li style="display:none"><p>'+_field.val()+'</p><input name="pantoneCode" type="hidden" value="'+_field.val()+'" /><a class="ico-circle" href="javascript:void(0);"><i class="fa fa-minus" aria-hidden="true"></i></a></li>');
		        		_codes.find('li').fadeIn('slow');
		        		_field.val('');
		        		action();
	        		}
	        	});
	        	var action = function(){
	        		_codes.find('a.ico-circle').unbind('click').click(function(){
	        			$(this).closest('li').fadeOut(400,function(){
	        				$(this).remove();
	        			})
	        		});
	        	}
	        	action();
	        	/**/
	        	$('#type-item-2').click(function(){
	        		$('#photoFile').click();
	        	});
	        	$('#photoFile').on('change', function(){
	        		_val = $(this).val();
	        		$(this).next('em').html( _val );
	        	});
	        },
	        finalidadeProduto:function(){
	        	$('form.finalidade_produto fieldset .l-bottom:not(.wholesaleSector):not(.anotherPurpose) p.title').click(function(){
					var _i = $(this).find('span i');
					_i.removeClass('fa-chevron-up').addClass('fa-chevron-down');
	        		$(this).next('ul').fadeToggle(400,function(){
						($(this).is(':hidden')) ? _i.removeClass('fa-chevron-down').addClass('fa-chevron-up'):null;
	        		});
	        	});
	        }
    	}
		vendapersonalizada.init();
	})();
});