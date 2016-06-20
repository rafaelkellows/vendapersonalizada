$(function(){ 
	(function() {
		var vendapersonalizada = {
	        init: function() {
	            this.menu();
	            this.toTop('.toTop');
	            $('div.loader').fadeOut('fast');
        		vendapersonalizada.loader(1);
        		vendapersonalizada.load('inicial');
	        },
	        menu: function() {
	        	//Mobile
	        	$('main nav > ul > li.m_menu a').click(function() {
	        		$(this).parent().toggleClass('active');
	        		$(this).find('i').toggleClass('fa-bars').toggleClass('fa-times');
	        		$(this).closest('ul').find('>li').not('.m_menu').toggleClass('f_menu');
	        	});
	        	//First Level
	        	$('main nav > ul > li').not(".disabled").not(".m_menu").find(' > a').click(function() {
	        		$('main nav > ul li').not(".m_menu").removeClass('active');
	        		$(this).parent().addClass('active');
	        		if(
	        			$(this).attr('data-url')!=undefined && 
	        			$(this).attr('data-url')!=null &&
	        			$(this).next('ul').hasClass('disabled')
	        		){
	        			//$(this).next('ul').removeClass('disabled')
		        		vendapersonalizada.loader(1);
		        		vendapersonalizada.load($(this).attr('data-url'));
	        			if( vendapersonalizada.wSize() <= 990 ){ $('main nav > ul > li.m_menu a').click(); }
	        		}
	        	});
	        	//Second Level
	        	$('main nav > ul > li > ul > li > a').click(function() {
	        		vendapersonalizada.loader(1);
	        		vendapersonalizada.load($(this).attr('data-url'));
	        		$('main nav > ul li').removeClass('active');
	        		$(this).parent().addClass('active').parents('li').addClass('active');
	        		if( vendapersonalizada.wSize() < 990 ){ $('main nav > ul > li.m_menu a').click(); }
	        	});
	        	vendapersonalizada._menuHeight();
				$('body a').click(function(){
	        		vendapersonalizada._menuHeight();
	        	});

	        	$( window ).resize(function() {
	        		$('main nav > ul li.m_menu a i').removeClass('fa-times').addClass('fa-bars');
					$('main nav > ul li').removeAttr('style');
					vendapersonalizada._menuHeight();
				});
	        },
			_menuHeight : function(){
        		console.log($('main nav > ul > li.active > ul').height());
				var _h = $('main nav > ul > li.active > ul').height();
				switch(_h){
		    		case 0:
					$('main .vpResume').removeClass('twoRows').addClass('noRows');
		    		break;
		    		case 40:
					$('main .vpResume').removeClass('noRows').removeClass('twoRows');
		    		break;
		    		case 80:
					$('main .vpResume').removeClass('noRows').addClass('twoRows');
		    		break;
				}
        	},
	        toTop : function(elem){
		        var offset = 220;
		        var duration = 500;
		        jQuery(window).scroll(function() {
		          if (jQuery(this).scrollTop() > offset) {
		            jQuery(elem).fadeIn(duration);
		          } else {
		            jQuery(elem).fadeOut(duration);
		          }
		        });
		        
		        jQuery(elem).click(function(event) {
		          event.preventDefault();
		          jQuery('html, body').animate({scrollTop: 0}, duration);
		          return false;
		        })
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
				    		case 'validacao/inicial':
				    		vendapersonalizada.validacao_inicial(); 
				    		break;
				    		case 'validacao/resumo':
				    		vendapersonalizada.validacao_resumo(); 
				    		break;
				    		case 'validacao/approved':
				    		vendapersonalizada.validacao_result(); 
				    		break;
				    	}
				    	if(page.indexOf('fluxo/') > -1){
				    		$('a.btn').click(function(){
				    			$('nav ul li ul.no_latbars').addClass('disabled');
				        		vendapersonalizada.loader(1);
				        		vendapersonalizada.load('fluxo/inicial');
				    		});
				    	}
						vendapersonalizada._menuHeight();
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
	        			if($(this).prev('input').attr('disabled')){return;}
	        			if( $(this).parent().hasClass('radio') ){
	        				var _i_name = $(this).prev('input').attr('name');
	        				$('input[name='+_i_name+']').prop('checked',false).next('label').removeClass('checked');
	        			}
	        			$(this).toggleClass('checked');
	        		});
	        		$('div.table_min dl dt, div.table_min dl dd').prepend('<span class="before"></span>');

	        		/* Looping */
	        		$('input').each(function(){
	        			if($(this).attr('checked')){
	        				$(this).next('label').addClass('checked');
	        			}
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
		        	},500);
				}
	        },
	        validacao_inicial:function(){
				$('main div.table_min dl dd a').click(function(){
	        		vendapersonalizada.loader(1);
	        		vendapersonalizada.load('validacao/resumo');
				});
	        },
	        validacao_resumo : function(){
	        	$('div.vpResume ul.consideredActions input[type=radio]').click(function(){
					$('div.impracticable, div.practicable').addClass('hide');
					var _t = $(this).val();
					switch(_t) {
					    case '0':
					        $('div.vpResume div.impracticable').removeClass('hide');
					   		$('div.vpResume div.conditions p.title').first().html('Com as seguintes conclusões:<br><br>');
					        break;
					    case '1':
					   		$('div.vpResume div.conditions p.title').first().html('Com as seguintes condições:<br><br>');
					        break;
					    case '2':
					        $('div.vpResume div.practicable').removeClass('hide');
					        $('div.vpResume div.conditions p.title').first().html('Com as seguintes conclusões:<br><br>');
					        break;
					    default:
					        null;
					}
	        	});
	        	$('div.vpResume > a.btn').click(function(){
	        		vendapersonalizada.loader(1);
	        		vendapersonalizada.load('validacao/inicial');
	        	});
	        	$('div.vpResume a.btn.view').click(function(){
	        		vendapersonalizada.loader(1);
	        		vendapersonalizada.load('validacao/approved');
	        	})
	        },
	        validacao_result : function(){
	        	$('form.finalResult ul li div input[name=approved]').click(function() {
	        		var _t = $(this);
	        		_t.closest('form').find('div.approved, div.disapproved').addClass('hide');
	        		switch($(this).val()){
	        			case '1':
	        				_t.closest('form').find('div.approved').removeClass('hide');
	        				break;
	        			case '0':
	        				_t.closest('form').find('div.disapproved').removeClass('hide');
	        				break;
	        		}
	        		vendapersonalizada.navButtons(1);
	        	});
	        	$('main .vpResume a.btn.prev.left').click(function(){
	        		vendapersonalizada.loader(1);
	        		vendapersonalizada.load('validacao/resumo');
	        	})
	        }
    	}
		vendapersonalizada.init();
	})();
});