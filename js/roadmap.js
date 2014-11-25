var maind="<p>Currently we are working through Testnet 2.</br>View the various stages of development in more detail... </p>";
var test1d="<p>See what we completed in Testnet 1.</p>";
var test2d="<p>Track the progress of Testnet 2's main objectives below. </br> For a more technical analysis, see our <a href='https://maidsafe.atlassian.net' target='_blank'>Jira Roadmap</a>.";
var test3d="<p>See what we have planned for Testnet 3.</p>";
var launchd="<p>The work doesn't stop at Beta. See what we have planned for launch.</p>";

$(document).ready(function () {
	$(".backwards").click(function(){displayPhase(this, "Project SAFE Roadmap", maind, "roadmap", "phase-group");});
	$("#testnet1").click(function(){displayPhase(this, "Testnet 1 Overview", test1d, "testnet1", "roadmap");});
	$("#testnet2").click(function(){displayPhase(this, "Testnet 2 Overview", test2d, "testnet2", "roadmap");});
	$("#testnet3").click(function(){displayPhase(this, "Testnet 3 Overview", test3d, "testnet3", "roadmap");});
	$("#betalaunch").click(function(){displayPhase(this, "BETA Launch", launchd, "betalaunch", "roadmap");});
	

});

function displayPhase (obj, title, desc, show, hide){
	$("#roadmap #viewer > h1").replaceWith("<h1>"+title+"</h1>");
	$("#roadmap #viewer > p").replaceWith(desc);
	$("div."+hide).addClass("hidden");
	$("div."+show).removeClass("hidden");
	$("#viewer").get(0).scrollIntoView();
	if ($("#viewer").width()<500 && show=="testnet2"){
		$(".phase-group .long1 h2").replaceWith("<h2>Reworking vault accounts to reduce account transfer, memory requirements and ability to handle much higher churn</h2>");
		$(".phase-group .long2 h2").replaceWith("<h2>Advances in Routing group and quorum for security levels well beyond network size and increased sybil attack defence</h2>");
	}
}

// boolean smallWidth(){
// 	if  return true;
// 	else return false;
// }
	
// function display(obj, name, bio, twitter, wp){
// 	if (!$(obj).hasClass("icon-active")){
// 		$( "div.team-map" ).children( ".icon-active" ).removeClass( "icon-active" );
// 		$(obj).addClass("icon-active");
// 	}
// 	$(".profile-info h2").replaceWith("<h2>"+name+"</h2>");
// 	$(".profile-info p").replaceWith("<p>"+bio+"</p>");
// 	$(".profile-twitter").addClass("hidden");
// 	if (twitter!=null){
// 		$(".twitter-"+twitter).removeClass("hidden");
// 		//$("div.profile-twitter").replaceWith('<div class="profile-twitter"><a href="https://twitter.com/'+twitter+'" target="_blank" class="twitter-follow-button" data-show-count="false">Follow @'+twitter+'</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?\'http\':\'https\';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\'://platform.twitter.com/widgets.js\';fjs.parentNode.insertBefore(js,fjs);}}(document, \'script\', \'twitter-wjs\');</script></div>');
// 	}
// 	if (wp==null){
// 		if (!$(".profile-wp").hasClass("hidden")){
// 			$(".profile-wp").addClass("hidden");
// 		}
// 	} else {
// 		$(".profile-wp").removeClass("hidden");
// 	}
// }