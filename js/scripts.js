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


	// Добавление товара в корзину
	$('.product_info .buy_btn, .product .buy_btn').click(function (e) {
		e.preventDefault()

		clearTimeout(timer)
		$('#success_cart_added').hide()
		$('#success_cart_added').fadeIn(300)

		var timer = setTimeout(() => {
			$('#success_cart_added').fadeOut(200)
		}, 2000)
	})


	// Корзина - Выбрать все
	$('.cart_info .select_all label').click(function () {
		$('.cart_info .product .select input').prop('checked', true)
	})


	// Оформление заказа - Комментарий для продавца
	$('.checkout_info .cart .product .add_message .btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.add_message')

		$(this).hide()
		parent.find('.form').fadeIn(300)
	})


	// Фиксация блока при скролле
	$('.sticky').stick_in_parent()


	// ЛК - Поставщик - Заказы
	$('.lk_info .supllier_order').click(function (e) {
		if ($(e.target).closest('.col_status').length === 0 && $(e.target).closest('.col_products').length === 0) {
			$(this).toggleClass('active').find('.col_products').slideToggle(300)
		}
	})

	$('.lk_info .supllier_order select').change(function () {
		let _self = $(this)

		setTimeout(() => {
			if (_self.val() == 6) { // 6 - это значение value у option с нужным статусом
				Fancybox.show([{
					src: '#pending_payment_modal',
					type: 'inline'
				}])
			}
		})
	})


	// ЛК - Поставщик - Товары
	$('.lk_products .product .actions .edit_btn').click(function (e) {
		e.preventDefault()

		let products = $('.lk_products'),
			product = $(this).closest('.product')

		product.addClass('form')

		products.find('.pagination').hide()
		products.find('.submit').css('display', 'flex')

		$('.mini_modal_btn').removeClass('active')
		$('.mini_modal').removeClass('active')

		if (is_touch_device()) $('body').css('cursor', 'default')
	})


	// ЛК - Поставщик - Добавление товара
	$('.add_product .form .compound .add_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.compound'),
			html = parent.find('.template').html()

		$(this).before(html)
	})

	$('.add_product .form .info .add_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.info'),
			html = parent.find('.template').html()

		$(this).before(html)
	})


	// ЛК - График 1
	const myChart = document.getElementById('myChart')

	if (myChart) {
		new Chart(myChart.getContext('2d'), {
			type: 'line',
			data: {
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [
					{
						label: 'Текущая неделя',
						data: [12, 19, 3, 5, 2, 3],
						borderColor: 'rgba(222,14,14,.5)',
						backgroundColor: '#de0e0e',
						borderWidth: 2
					},
					{
						label: 'Прошедшая неделя',
						data: [3, 2, 5, 3, 19, 12],
						borderColor: 'rgba(0,152,255,.5)',
						backgroundColor: '#0098ff',
						borderWidth: 2
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'bottom',
						labels: {
							boxWidth: 7,
							boxHeight: 7,
							padding: 8,
							textAlign: 'left',
							usePointStyle: true,
							color: '#a2a2a2',
							font: {
								size: 13
							}
						}
					},
					title: {
						display: false
					}
				}
			}
		})
	}


	// ЛК - График 2
	const myChart2 = document.getElementById('myChart2')

	if (myChart2) {
		new Chart(myChart2.getContext('2d'), {
			type: 'line',
			data: {
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [
					{
						label: 'Текущая неделя',
						data: [12, 19, 3, 5, 2, 3],
						borderColor: 'rgba(222,14,14,.5)',
						backgroundColor: '#de0e0e',
						borderWidth: 2
					},
					{
						label: 'Прошедшая неделя',
						data: [3, 2, 5, 3, 19, 12],
						borderColor: 'rgba(93,217,140,.5)',
						backgroundColor: '#5dd98c',
						borderWidth: 2
					}
				]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: 'bottom',
						labels: {
							boxWidth: 7,
							boxHeight: 7,
							padding: 8,
							textAlign: 'left',
							usePointStyle: true,
							color: '#a2a2a2',
							font: {
								size: 13
							}
						}
					},
					title: {
						display: false
					}
				}
			}
		})
	}


	// ЛК - редактирование данных
	$('.lk_block .edit_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.lk_block')

		parent.addClass('form')
	})

	$('.lk_block .save_btn').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.lk_block')

		parent.removeClass('form')
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


	// Календарь
	const dateInputs = document.querySelectorAll('.date_input')

	if (dateInputs) {
		dateInputs.forEach(el => {
			new AirDatepicker(el, {
				container: el.closest('.field'),
				autoClose: true,
				navTitles: {
					days: 'MMMM yyyy'
				},
				position: el.getAttribute('data-position')
			})
		})
	}


	// Поиск
	$('.search .input').keyup(function() {
		let _self = $(this)

		_self.val().length
			? _self.addClass('active')
			: _self.removeClass('active')
	})

	$('.search .clear_btn').click(function(e) {
		e.preventDefault()

		$('.search .input').val('').removeClass('active').focus()
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