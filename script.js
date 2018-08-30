var streamapi="https://wind-bow.glitch.me/twitch-api/streams/";
var channelapi="https://wind-bow.glitch.me/twitch-api/channels/";
var channels=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function allStreamers(streamchannel){ 
	var logo,name,game,status,statusdesc,channel_link;

	var streamchannel_url=streamapi+streamchannel+"?callback=?";
	var channel_url=channelapi+streamchannel+"?callback=?";

  
   
   
	$.getJSON(streamchannel_url,function(data){
		if(data.status=='404'){ 
			game=data.message;
			status="offline";
			statusdesc="";
		}
		else if(data.status=='422'){ 
			game=data.message;
			status="offline";
			statusdesc="";
		}
		else{
			data=data.stream;
			if(data===null){
				game="offline";
				status="offline";
				statusdesc="";
				logo="http://www.gravatar.com/avatar/3c069b221c94e08e84aafdefb3228346?s=47&d=http%3A%2F%2Fwww.techrepublic.com%2Fbundles%2Ftechrepubliccore%2Fimages%2Ficons%2Fstandard%2Ficon-user-default.png";
			}
			else{
				game=data.channel.game;
				status="online";
				statusdesc=":"+data.channel.status;
			}
		}
    
    $.getJSON(channel_url,function(data){
			name=data.display_name;
			logo=data.logo;
    	channel_link=data.url;
    	if(data.status=='404'){  
    		name=streamchannel;
    		channel_link="#";
    		logo="https://openclipart.org/image/2400px/svg_to_png/211821/matt-icons_preferences-desktop-personal.png";
    	}
    	else if(data.status=='422'){  
    		name=streamchannel;
    		channel_link="#";
    		logo="https://openclipart.org/image/2400px/svg_to_png/211821/matt-icons_preferences-desktop-personal.png";
    	}
    	else if(logo===null){  
       logo="https://openclipart.org/image/2400px/svg_to_png/211821/matt-icons_preferences-desktop-personal.png";
			}

    
			var result="\
			<div class='row' id='"+status+"'>\
				<div class='col-md-3 col-xs-4'>\
					<span class='logo'><img class='img img-circle' src='"+logo+"'></span>\
					<a href='"+channel_link+"'>\
						<span class='name text-center'>"+name+"</span>\
					</a>\
				</div>\
				<div class='col-md-9 col-xs-8 text-center' id='statusdescription'>\
					<span class='game'>"+game+"</span>\
					<span class='status'>"+statusdesc+"</span>\
				</div>\
			</div>";

			if(status=='offline')
		   $('.res').append(result);
	    else
    	$('.res').prepend(result);
		});
   });
};

$(document).ready(function(){
  
  
	channels.forEach(function(channel){
		allStreamers(channel);
	});
 
  $('#all').click(function(){
  	var all=$('.res .row');
  	all.each(function(index){
  		$(this).css({'display':'block'});
  	});
  });


  $('#online').click(function(){
  	var online=$('.res .row');
  	online.each(function(index){
  		var toggle=$(this).attr('id');
  		if(toggle=='online'){
  			$(this).css({'display':'block'});
  		}
  		else if(toggle=='offline'){
  			$(this).css({'display':'none'});
  		}
  	});
  });


  $('#offline').click(function(){
  	var offline=$('.res .row');
  	offline.each(function(index){
  		var toggle=$(this).attr('id');
  		if(toggle=='online'){
  			$(this).css({'display':'none'});
  		}
  		else if(toggle=='offline'){
  			$(this).css({'display':'block'});
  		}
  	});
  });

});