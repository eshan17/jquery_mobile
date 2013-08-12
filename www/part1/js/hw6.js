var count = 0;
var successCount = 0;

function captcha()
{
	$("#name").empty();
	$("#name").html('');
	$('#name').val('');

	$("#email").empty();
	$("#email").html('');
	$('#email').val('');

	$('#slider-1').empty();
	$("#slider-1").html('');
	$('#slider-1').val('');
	$('#captcha').empty();

	var captchaOrder = [];

	for(var i = 0; i < 4; i++)
	{
		var uniqueNum = Math.floor(Math.random() * 4) + 1;
		while(numExists(uniqueNum, captchaOrder) == true)
		{
			uniqueNum = Math.floor(Math.random() * 4) + 1;
		}

		captchaOrder[i] = uniqueNum;
	}
	console.log(captchaOrder);
	addTouchEvents(captchaOrder);

	$('.swipe').bind('tap', swipe);
	$('.swipe').bind('swipe', swipe);

	$('.tap').bind('tap', tap);
	$('.tap').bind('swipe', tap);
}

function swipe(event)
{	
	if(event.type === "tap")
	{
		alert("You have failed.");
		successCount = 0;
		location.replace("");
	}
	else
	{
		successCount += 1;
	}
	
	if(checkSuccess(successCount))
	{
		movetoInfo();
	}
}

function tap(event)
{	
	if(event.type === "swipe")
	{
		alert("You have failed.");
		successCount = 0;
		location.replace("");
	}
	else
	{
		successCount += 1;
	}

	if(checkSuccess(successCount))
	{
		movetoInfo();
	}	
}

function movetoInfo()
{
	$('#three').removeClass('ui-disabled');
	$('#four').removeClass('ui-disabled');
	$('#five').removeClass('ui-disabled');
	alert("You are a human");
	location.replace("./#three");
}

function checkSuccess(num)
{
	if(num === 4)
		return true;

	return false;
}

function addTouchEvents(captchaOrder)
{
	for(var i = 0; i < captchaOrder.length; i++)
	{
		var tapid = "id=tap" + i + " ";
		var swipeid = "id=swipe" + i + " ";
		if(captchaOrder[i] % 2 == 0)
		{
			$('#captcha').append('<li class="swipe" id=' + swipeid +  ' data-role="button" data-corners="false" data-shadow="true"> Swipe </li>');
		}
		else
		{
			$('#captcha').append('<li class="tap" id=' + tapid + ' data-role="button" data-corners="false" data-shadow="true"> Tap </li>');	
		}
	}
}

function numExists(num, arr)
{
	for(var i = 0; i < arr.length; i++)
	{
		if(arr[i] == num)
			return true;
	}

	return false;
}

function submitInfo()
{
	var name = $("#name").val();
	var email = $("#email").val();
	var age = $('#slider-1').val();
	var state = $('#state option:selected').text();

	if(name !== 'undefined' || name !== null || email !== 'undefined' || email !== null || age !== null)
	{

		if(name.trim().length === 0 || email.indexOf("@") <= 0 || email.indexOf(".") <= 0 ||  email.trim().length === 0 || age.trim().length === 0
			|| state.trim().length === 0)
		{
			alert("Enter valid information.");
			location.replace("./#three");
		}
		else
		{
			$("p#confirmInformation").append("Name: " + name + '<br>');
			$("p#confirmInformation").append("Email: " + email + '<br>');
			$("p#confirmInformation").append("Age: " + age + '<br>');
			$("p#confirmInformation").append("State: " + state + '<br>');
			location.replace("./#four");
		}
	}
	else
	{
		alert("Please enter all the required information.");
	}
}

function submitFriends()
{
	var email = $('#friendEmail').val();
	count = count + 1;
	var id = 'fremail' + count;
	if(!email.trim().length === 0 || email.indexOf("@") > 0 || email.indexOf(".") > 0)
	{
		var button = "<a href='' id="+ id + "class='deleteEmail' onclick='deleteEmail(event)' data-role='button' data-icon='delete' data-iconpos='right' data-corners='true' data-shadow='true' data-iconshadow='true' data-wrapperels='span' data-theme='c' class='ui-btn ui-shadow ui-btn-corner-all ui-btn-icon-right ui-btn-up-c'><span class='ui-btn-inner ui-btn-corner-all'><span class='ui-btn-text'>" + email + "</span><span class='ui-icon ui-icon-delete ui-icon-shadow'></span></span></a>"

		$('#friends').append(button);
		$('#friends').listview('refresh');
		$('#confirmFriends').append("Your friend's email is: " + email + '<br>' + '<br>');
		$('#friendEmail').val('');
	}
	else
	{
		alert("Please enter a valid email address!");
	}
}

function deleteEmail(event)
{
	alert("deleted");
	$('.deleteEmail').bind('click', function() {
	
	$('.deleteEmail').closest('a').removeChild('.deleteEmail');
	$("#confirmFriends ul").remove();
   
	});
}

function submit()
{
	$("p#confirmInformation").empty();
	$("#confirmFriends").empty();

	$('#friends').empty();

	$("#name").empty();
	$("#name").html('');
	$('#name').val('');

	$("#email").empty();
	$("#email").html('');
	$('#email').val('');

	$('#slider-1').empty();
	$("#slider-1").html('');
	$('#slider-1').val('');

	$('#state option:selected').empty();
	$("#state option:selected").html('');
	$('#state option:selected').val('');

	alert("Signup done!");
}