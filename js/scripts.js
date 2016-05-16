$(function(){ 
	(function() {
		var vendapersonalizada = {
	        init: function() {
	            this.menu();
	            $('div.loader').fadeOut('fast');
	            this.load('segmentacao');
	        },
	        menu: function() {
	        	//Mobile
	        	$('main nav > ul > li:first-child a').click(function() {
	        		$(this).find('i').toggleClass('fa-bars').toggleClass('fa-times');
	        		$(this).closest('ul').find('>li').not(':first').fadeToggle('fast');
	        	});
	        	//First Level
	        	$('main nav > ul > li:not(.disabled) > a').click(function() {
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
				    		case 'prazo_preco_quantidade':
				    		vendapersonalizada.prazoPrecoQuantidade(); 
				    		break;
				    	}
				    }
				})
	        },
	        loader: function(l){
	        	if(l){
		        	$('div.loader').fadeIn('fast');
		        }else{
		        	$('div.loader').fadeOut('fast');
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
	        	$('body main section form.segmentacao > fieldset > .content > .radio input[type=radio]').click(function() {
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
	        				vendapersonalizada.existBase();
	        				break;
	        			case '0':
	        				_f.find('div.newBase').removeClass('hide');
	        				vendapersonalizada.newBase();
	        				break;
	        		}
	        		vendapersonalizada.navButtons(1);
	        	});
	        },
	        newBase: function(){
	        	$('body main section form.base > fieldset .newBase input[name=baseType]').click(function() {
					$(this).closest('.newBase').find('>*:not(.l-bottom)').addClass('hide');
					switch($(this).val()){
	        			case 'Nova':
			        		$(this).closest('.newBase').find('>ul').removeClass('hide');
	        				break;
	        			case 'Similar':
	        				$(this).closest('.newBase').find('>div:not(.l-bottom)').removeClass('hide');
	        				break;
	        		}
	        	});
	        },
	        existBase: function(){
	        	var _result = $('#findProductResult');
	        		_result.hide();
	        	var _field = $('#findProduct');
	        	var _codes = $('ul.block.codes');
	        	_field.keyup(function() {
	        		if( $(this).val().length > 3){ 
						_result.fadeIn(400,function(){
							$(this).find('em').unbind('click').click(function(){
				        		$(this).fadeOut('slow',function(){
				        			$(this).remove();
				        		})
				        		_codes.prepend('<li style="display:none"><p>'+$(this).text()+'</p><input name="productID" type="hidden" value="'+$(this).text()+'" /><a class="ico-circle" href="javascript:void(0);"><i class="fa fa-minus" aria-hidden="true"></i></a></li>');
				        		_codes.find('li').fadeIn('slow');
				        		_field.val('');
				        		action();
							});
						});
	        		}else{
						_result.fadeOut();
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
	        },
	        prazoPrecoQuantidade:function(){
	        	var _fieldA  = $('#nameCode');
	        	var _fieldB = $('#amount');
	        	var _codes = $('ul.block.codes');
	        	_fieldB.next('a').click(function(){
	        		if( _fieldA.val().length > 0 && _fieldB.val().length > 0 ){
		        		_codes.prepend('<li style="display:none"><p><span class="w-300">'+_fieldA.val()+"</span><span>"+_fieldB.val()+'</span></p><input name="colorAmount" type="hidden" value="'+_fieldA.val()+"/"+_fieldB.val()+'" /><a class="ico-circle" href="javascript:void(0);"><i class="fa fa-minus" aria-hidden="true"></i></a></li>');
		        		_codes.find('li').fadeIn('slow');
		        		_fieldA.val('');
		        		_fieldB.val('');
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
	        }
    	}
		vendapersonalizada.init();
	})();
});