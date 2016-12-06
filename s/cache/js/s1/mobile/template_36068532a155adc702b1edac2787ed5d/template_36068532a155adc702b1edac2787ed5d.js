
; /* Start:"a:4:{s:4:"full";s:86:"/bitrix/templates/mobile/components/informunity/blank/call-me/script.js?14530998432635";s:6:"source";s:71:"/bitrix/templates/mobile/components/informunity/blank/call-me/script.js";s:3:"min";s:0:"";s:3:"map";s:0:"";}"*/
/**
 * Created by iu7 on 05.03.15.
 */
$(document).ready(function(){
	var frequentlyUsedElements = {};
	frequentlyUsedElements.$modalRecallMe = $('#modal-recall-me');
	frequentlyUsedElements.$buttonRecallMe = $('#button-recall-me');
	frequentlyUsedElements.$formRecall = $('#form-recall');
	frequentlyUsedElements.$inputName = frequentlyUsedElements.$formRecall.find('input[name="name"]');
	frequentlyUsedElements.$inputEmail = frequentlyUsedElements.$formRecall.find('input[name="phone-number"]');
	frequentlyUsedElements.$inputSubmit = frequentlyUsedElements.$formRecall.find('input[type="submit"]');


	frequentlyUsedElements.$buttonRecallMe.click(function(){
		frequentlyUsedElements.$modalRecallMe.addClass('active');
	});

	frequentlyUsedElements.$modalRecallMe.find('a.close').click(function(){
		frequentlyUsedElements.$modalRecallMe.removeClass('active');
	});

	frequentlyUsedElements.$inputName.on("blur", function(){
		if(isEmpty($(this))){
			$(this).addClass('error');
		}
		else{
			$(this).removeClass('error');
		}
	});

	frequentlyUsedElements.$inputEmail.on("blur", function(){
		if(isEmpty($(this))||!isValidPhone($(this))){
			$(this).addClass('error');
		}
		else{
			$(this).removeClass('error');
		}
	});

	frequentlyUsedElements.$formRecall.focus(function(e){
		$(e.target).removeClass('error');
	});

	frequentlyUsedElements.$inputSubmit.click(function(e){
		if(isEmpty(frequentlyUsedElements.$inputName)||
		isEmpty(frequentlyUsedElements.$inputEmail)||
		!isValidPhone(frequentlyUsedElements.$inputEmail)){
			e.preventDefault();
			frequentlyUsedElements.$formRecall.find('input').trigger('blur');
		}
		else{
			e.preventDefault();
			var name_feed=$('#input-name-feed').val();
			var phone_feed=$('#input-phone-feed').val();
			$.get("/include/ajax/call-me.php",
				  {
					  name: name_feed,
					  phone: phone_feed
				  },
				  function(msg)
				  {
                      frequentlyUsedElements.$formRecall.html('<b class="success">Ваша заявка отправлена. В течение 15 минут менеджер свяжется с Вами.</b>');
				  }
			);
		}
	});



});

function isValidPhone($element){

	var value = $element.val().trim();
	var regex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

	$element.val(value);

	return value.match(regex);
}

function isEmpty($element){
	/*нужна проверка текста элемента без пробелов т.к. иначе проверка обходится введением пробелов */
	var elementValue = $element.val().trim();
	$element.val(elementValue);
	return !elementValue.length;
}


/* End */
;; /* /bitrix/templates/mobile/components/informunity/blank/call-me/script.js?14530998432635*/
