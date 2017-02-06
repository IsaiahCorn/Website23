
var x, y;

function randNum(min, max){
	return Math.random() * (max - min) + min;
}

$(document).ready(function(){

	$(document).on('mousemove', function(e){		

		x = Math.round((e.pageX / $(window).width()) * 100) - 50;
		y = Math.round((e.pageY / $(window).height()) * 100) - 50;

		if ($('.stage').hasClass('show')){
			TweenMax.to('.stage', .75, {rotationY: x * .5, z: -y * 5});
		} else {
			TweenMax.to('.stage', .75, {rotationY: x * 1.2, z: -y * 20});
		}

		if (!$('.stage').hasClass('show') || !$('.stage').hasClass('hide')){
			TweenMax.to('.featured', .75, {rotationY: -x * .6});
		}
	});

	$('.stage ul li')
		.each(function(){

			var r = randNum(-90, 90);
			var y = randNum(-250, 150);
			var z = randNum(-400,-2345);
			
			$(this)
				.css({'transform': 'rotateY('+ r +'deg) translate3d(0,'+ y +'px,'+ z +'px) scale3d(.2,.2,.2)'})
				.attr('data-r', r)
				.attr('data-y', y)
				.attr('data-z', z);
		})
		.on('click', function(e){
			
			e.stopPropagation();
			
			if (!$('.stage ul li').hasClass('featured')){
				if (!$('.stage').hasClass('busy')){
					$(this).addClass('featured');
					$('.stage').addClass('busy show');
					TweenMax.to('.stage', 1.75, {rotationY: x * .5, z: -y * 5, ease: Power3.easeInOut});
					TweenMax.to($(this), .75, {'transform': 'rotateY('+ (-x * 1.3) +'deg) translate3d(0,0,0) scale3d(1,1,1)', ease: Power3.easeInOut, onComplete: function(){
						$('.stage').removeClass('busy');
					}});
				}
			}
		})

	$(document).on('click', function(){

		if (!$('.stage').hasClass('busy')){
			if ($('.stage ul li').hasClass('featured')){
				$('.stage').addClass('busy hide');
				TweenMax.to('.featured', .75, {transform: 'rotateY('+ $('.featured').attr('data-r') +'deg) translate3d(0,'+ $('.featured').attr('data-y') +'px,'+ $('.featured').attr('data-z') +'px) scale3d(.2,.2,.2)', ease: Power3.easeInOut, onComplete: function(){
					$('.stage').removeClass('busy show hide');
					$('.stage ul li').removeClass('featured');
				}});
			}
		}
	});

});
