$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Основной слайдер на главной
	if ($('.main_slider .swiper-container').length) {
		new Swiper('.main_slider .swiper-container', {
			loop: true,
			speed: 750,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			}
		})
	}


	// Карусель товаров
	const productsSliders = []

	$('.products .swiper-container').each(function (i) {
		$(this).addClass('products_s' + i)

		let slides = $(this).find('.slide').length,
			options = {
				loop: false,
				speed: 500,
				simulateTouch: false,
				allowTouchMove: true,
				noSwiping: true,
				watchSlidesVisibility: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				breakpoints: {
					0: {
						slidesPerView: 1
					},
					480: {
						spaceBetween: 0,
						slidesPerView: 2
					},
					768: {
						spaceBetween: 0,
						slidesPerView: 3
					},
					1024: {
						spaceBetween: 0,
						slidesPerView: 4
					},
					1147: {
						spaceBetween: 8,
						slidesPerView: 5
					}
				},
				on: {
					init: swiper => {
						setTimeout(() => {
							setHeight($(swiper.$el).find('.slide'))

							$(swiper.$el).find('.swiper-button-next, .swiper-button-prev').css(
								'top', $(swiper.$el).find('.thumb').outerHeight() * 0.5
							)
						})
					},
					resize: swiper => {
						setTimeout(() => {
							setHeight($(swiper.$el).find('.slide'))

							$(swiper.$el).find('.swiper-button-next, .swiper-button-prev').css(
								'top', $(swiper.$el).find('.thumb').outerHeight() * 0.5
							)
						})
					}
				}
			}

		productsSliders.push(new Swiper('.products_s' + i, options))

		if (slides > productsSliders[i].params.slidesPerView) {
			options.loop = true
			options.simulateTouch = true
			options.allowTouchMove = true
			options.noSwiping = false

			productsSliders[i].destroy(true, true)
			productsSliders[i] = new Swiper('.products_s' + i, options)
		}
	})


	// Карусель товаров
	const categoriesSliders = []

	$('.categories .swiper-container').each(function (i) {
		$(this).addClass('categories_s' + i)

		let slides = $(this).find('.slide').length,
			options = {
				loop: false,
				speed: 500,
				watchSlidesVisibility: true,
				slideActiveClass: 'active',
				slideVisibleClass: 'visible',
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				breakpoints: {
					0: {
						spaceBetween: 16,
						slidesPerView: 2
					},
					768: {
						spaceBetween: 20,
						slidesPerView: 3
					},
					1024: {
						spaceBetween: 20,
						slidesPerView: 4
					},
					1147: {
						spaceBetween: 20,
						slidesPerView: 5
					}
				},
				on: {
					init: swiper => {
						setTimeout(() => {
							setHeight($(swiper.$el).find('.category'))
						})
					},
					resize: swiper => {
						setTimeout(() => {
							setHeight($(swiper.$el).find('.category'))
						})
					}
				}
			}

		categoriesSliders.push(new Swiper('.categories_s' + i, options))
	})


	// Характеристики товара
	$('.product_features .spoler_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active')
		$('.product_features .hide').slideToggle(300)
	})


	// Отзывы - сортировка
	$('.reviews .sort .btn').click(function (e) {
		e.preventDefault()

		if ($(this).hasClass('down')) {
			$(this).removeClass('down').addClass('up')
			return false
		}

		if ($(this).hasClass('up')) {
			$(this).removeClass('up')
			return false
		}

		if (!$(this).hasClass('up') && !$(this).hasClass('down')) {
			$(this).addClass('down')
		}
	})


	// Страница товара
	if ($('.product_info .images').length) {
		const productThumbs = new Swiper('.product_info .thumbs.swiper-container', {
			loop: false,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			slidesPerView: 4,
			spaceBetween: 10,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				0: {
					direction: 'horizontal'
				},
				768: {
					direction: 'vertical'
				}
			}
		})

		const productSlider = new Swiper('.product_info .big .swiper-container', {
			loop: false,
			speed: 500,
			watchSlidesVisibility: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			thumbs: {
				swiper: productThumbs
			}
		})
	}


	$('.product_info .images .big .slide .btn').click(function (e) {
		e.preventDefault()

		Fancybox.show(
			[{
				src: '#product_images_modal',
				type: 'inline'
			}],
			{
				on: {
					done: () => {
						const productThumbs2 = new Swiper('#product_images_modal .thumbs.swiper-container', {
							loop: false,
							watchSlidesVisibility: true,
							slideActiveClass: 'active',
							slideVisibleClass: 'visible',
							slidesPerView: 4,
							spaceBetween: 10,
							navigation: {
								nextEl: '.swiper-button-next',
								prevEl: '.swiper-button-prev'
							},
							breakpoints: {
								0: {
									direction: 'horizontal'
								},
								768: {
									direction: 'vertical'
								}
							}
						})

						const productSlider2 = new Swiper('#product_images_modal .big .swiper-container', {
							loop: false,
							speed: 500,
							watchSlidesVisibility: true,
							slideActiveClass: 'active',
							slideVisibleClass: 'visible',
							spaceBetween: 24,
							slidesPerView: 1,
							navigation: {
								nextEl: '.swiper-button-next',
								prevEl: '.swiper-button-prev'
							},
							thumbs: {
								swiper: productThumbs2
							}
						})
					}
				}
			})
	})


	// Страница товара - размеры
	$('.product_info .sizes .item .info').click(function (e) {
		e.preventDefault()

		$(this).closest('.item').toggleClass('active')
		$(this).next().slideToggle(300)
	})


	// Боковая колонка - Фильтр
	$('.mob_filter_btn').click(function (e) {
		e.preventDefault()

		$(this).toggleClass('active').next().slideToggle(300)
	})


	$('aside .filter .name').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.item')

		$(this).toggleClass('active')
		parent.find('.data').slideToggle(300)
	})


	$priceRange = $('.filter #price_range').ionRangeSlider({
		type: 'double',
		min: 0,
		max: 100000,
		from: 0,
		to: 30000,
		step: 100,
		onChange: function (data) {
			$('.filter .price_range input.from').val(data.from.toLocaleString())
			$('.filter .price_range input.to').val(data.to.toLocaleString())
		},
		onUpdate: data => {
			$('.filter .price_range input.from').val(data.from.toLocaleString())
			$('.filter .price_range input.to').val(data.to.toLocaleString())
		}
	}).data("ionRangeSlider")

	$('.filter .price_range .input').keyup(function () {
		$priceRange.update({
			from: parseInt($('.filter .price_range input.from').val().replace(/\s/g, '')),
			to: parseInt($('.filter .price_range input.to').val().replace(/\s/g, ''))
		})
	})


	// Отправка форм
	$('body').on('submit', '#add_review_modal form', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: '#success_review_modal',
			type: 'inline'
		}])
	})
})



$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.products .row').each(function () {
		productHeight($(this), parseInt($(this).css('--products_count')))
	})
})



$(window).on('resize', () => {
	if (typeof WW !== 'undefined' && WW != $(window).width()) {
		// Моб. версия
		if (!fiestResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 375) $('meta[name=viewport]').attr('content', 'width=375, user-scalable=no')

			fiestResize = true
		} else {
			fiestResize = false
		}


		// Выравнивание элементов в сетке
		$('.products .row').each(function () {
			productHeight($(this), parseInt($(this).css('--products_count')))
		})


		// Перезапись ширины окна
		WW = $(window).width()
	}
})



// Выравнивание товаров
function productHeight(context, step) {
	let start = 0,
		finish = step,
		$products = context.find('.product_wrap')

	$products.height('auto')

	$products.each(function () {
		setHeight($products.slice(start, finish))

		start = start + step
		finish = finish + step
	})
}