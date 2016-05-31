$(function(){ 
	(function() {
		var vendapersonalizada = {
	        init: function() {
	            this.menu();
	            $('div.loader').fadeOut('fast');
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
	        		if(
	        			$(this).attr('data-url')!=undefined && 
	        			$(this).attr('data-url')!=null &&
	        			$(this).next('ul').hasClass('disabled')
	        		){
		        		vendapersonalizada.loader(1);
		        		vendapersonalizada.load($(this).attr('data-url'));
	        			if( vendapersonalizada.wSize() < 990 ){ $('main nav > ul > li:first-child a').click(); }
	        		}
	        	});
	        	//Second Level
	        	$('main nav > ul > li > ul > li > a').click(function() {
	        		vendapersonalizada.loader(1);
	        		vendapersonalizada.load($(this).attr('data-url'));
	        		$('main nav > ul li').removeClass('active');
	        		$(this).parent().addClass('active').parents('li').addClass('active');
	        		if( vendapersonalizada.wSize() < 990 ){ $('main nav > ul > li:first-child a').click(); }
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
			        	$('body main section').hide().html(result);
				    },
				    complete: function(){ 
				    	vendapersonalizada.loader(0); 
				    	switch(page){
				    		case 'solicitacao/segmentacao':
				    		vendapersonalizada.segmentacao(); 
				    		break;
				    		case 'solicitacao/base':
				    		vendapersonalizada.base(); 
				    		break;
				    		case 'solicitacao/amostra':
				    		vendapersonalizada.amostra(); 
				    		break;
				    		case 'solicitacao/finalidade_produto':
				    		vendapersonalizada.finalidadeProduto(); 
				    		break;
				    		case 'solicitacao/prazo_preco_quantidade':
				    		vendapersonalizada.prazoPrecoQuantidade(); 
				    		break;
				    		case 'fluxo/inicial':
				    		vendapersonalizada.fluxo_inicial(); 
				    		break;
				    	}
				    	if(page.indexOf('fluxo/') > -1){
				    		$('a.btn').click(function(){
				    			$('nav ul li ul.no_latbars').addClass('disabled');
				        		vendapersonalizada.loader(1);
				        		vendapersonalizada.load('fluxo/inicial');
				    		});
				    	}
				    }
				})
	        },
	        loader: function(l){
	        	vendapersonalizada.ie8();
	        	if(l){
		        	$('div.loader').fadeIn('fast');
		        }else{
		        	$('div.loader').fadeOut('fast',function(){
		        		$('body main section').show();
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
	        ie8 : function(){
	        	if( $("html").hasClass("ie8") ) { 
	        		$('.radio label, .checkbox label').prepend('<span class="before"></span>').click(function(){
	        			if( $(this).parent().hasClass('radio') ){
	        				var _i_name = $(this).prev('input').attr('name');
	        				$('input[name='+_i_name+']').prop('checked',false).next('label').removeClass('checked');
	        			}
	        			$(this).toggleClass('checked');
	        		});

	        	};
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
	        	$('li.pantone a').click(function() {
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
	        	$('.amountByColor a').click(function(){
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
	        },
	        fluxo_inicial:function(){
	        	$('main nav > ul li ul li').removeClass('active');
	        	$('main div.table h2 i').click(function(){
	        		if($(this).hasClass('fa-lock')){
	        			$(this).removeClass('fa-lock').addClass('fa-unlock');
	        		}else{
	        			$(this).removeClass('fa-unlock').addClass('fa-lock');
	        		}
	        	})
				$('main div.table dl dd ul li').click(function(){
					$('main div.table dl dd ul li').removeClass('hover');
				  	$('main div.table dl dd ul li:nth-child('+($(this).index()+1)+')').addClass('hover');
				  	if( vendapersonalizada.wSize() <= 990 ){
				  		_vp = $('main div.table .solicitacao dl.w-25 dd ul:nth-child(1) li:nth-child('+($(this).index()+1)+') a');
				  		_de = $('main div.table .solicitacao dl.w-25 dd ul:nth-child(2) li:nth-child('+($(this).index()+1)+')');
				  		_cod = $('main div.table .solicitacao dl.w-30 dd ul:nth-child(1) li:nth-child('+($(this).index()+1)+')');
				  		if( !_vp.html() ) return;
				  		$('p.vp_info').html('<strong>VP:</strong> '+_vp.html()+'<br><strong>Data Emissão:</strong> '+_de.html()+'<br><strong>Código:</strong> '+_cod.html());
				  	}
				});
				$('main div.table dl dd ul li a').click(function(){
					$('nav ul.disabled').removeClass('disabled').find('li:first-child').addClass('active');
	        		vendapersonalizada.loader(1);
	        		vendapersonalizada.load('fluxo/resumo');
				});
				if( vendapersonalizada.wSize() > 991 ){
					_div = $('main div.table > div > div');
					_div.click(function(){
						
						_div.removeClass('tbl-move');

						if( $(this).hasClass('hover') ){
							$(this).toggleClass('hover');
							return;
						}
						_div.removeClass('hover');
						/* Move table */
						_tbl_class = $(this).attr('class');
						if(_tbl_class=='tbl-container-01'){
							$('main div.table div.tbl-container-02, main div.table div.tbl-container-03').addClass('tbl-move');
						}
						if(_tbl_class=='tbl-container-02'){
							$('main div.table div.tbl-container-03').addClass('tbl-move');
						}
						if(_tbl_class=='tbl-container-03'){
							$('main div.table div.tbl-container-01').addClass('tbl-move');
						}


						$(this).addClass('hover');
					})
					$(document).mouseup(function (e){
					    var container = $("main div.table");
					    if (!container.is(e.target) // if the target of the click isn't the container...
					        && container.has(e.target).length === 0) // ... nor a descendant of the container
					    {
					        _div.removeClass('hover').removeClass('tbl-move');
					    }
					});
		        	setTimeout(function(){
		        		var _h = $('main div.table > div > div.tbl-container-01').outerHeight();
		        		$('main div.table').height(_h);
		        	},1000)
				}
	        }
    	}
		vendapersonalizada.init();
	})();
});