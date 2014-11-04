var bossBio = "Logic is the boss at MaidSafe and forces decision making based on well considered reasoning. The input of our team is judged based on the validity of their analysis rather than the job title they hold. This flat and inclusive structure ensures that we get the best out of the entire team and while logic is a tough leader, we all appreciate it.";
var davidBio = "David has in excess of 23 years experience in IT and 15 years running companies. He was previously responsible for Enterprise network design and project management and has worked on some of the world’s largest network projects. David is also a <a href='http://scholar.google.co.uk/scholar?q=maidsafe' target='_blank'> published author</a> on papers in the fields of complex networking, distributed computing and cryptography related technologies. David enjoys sailing, engineering, camping and has a secret interest in intelligent robotics.";
var fraserBio = "Further to studying computing science at University, Fraser&rsquo;s diverse range of experience has seen him serve 14 years with the Oxfordshire Fire Brigade and Strathclyde Fire and Rescue in addition to 10 years as a director of a service business. Fraser has been a member of the MaidSafe team for 4 years. Fraser is married and has a son. At weekends he enjoys programming, hillwalking and playing football.";
var qiBio = "Interested in the idea of creating a secure peer-to-peer network and tempted by the outdoor activities Scotland has to offer, Qi joined MaidSafe in 2011. With an impressive PhD in Health Informatics, MSc in Computer Science, BEng in Electronic Engineering and over ten years industry experience, Qi brings a wealth of knowledge to the team!";
var prakashBio = "Prakash completed his engineering degree in Electronics &amp; Communication in India and worked there as a Software Developer for a few years in a Telecom domain. Later, he moved to the UK to pursue MBA from the University of Sheffield. After graduating he became very excited by MaidSafe's vision and joined the company in January 2011. As well as his interest in computer hardware and gadgets, he likes playing chess, travelling and watching movies.";
var benBio = "After five years of research in theoretical physics at Ghent University, Ben moved from Belgium to Scotland to join MaidSafe.  With a specialization in emergent systems he could not resist to help build an autonomous, decentralized network of computers.  Driven by a passion to make complex systems understandable he now supports Quality Assurance of the code base.";
var mahmoudBio = "Mahmoud received a BSc in Computer Hardware Engineering and an MSc in Computer Systems Architecture whilst in Iran, he then came to the UK to obtain his PhD in Computer Science from The University of Glasgow. Before starting at MaidSafe he spent over 3 years working in the software industry, followed by another 3 years working as a test engineer in hardware manufacturing. His interests include Peer-to-Peer networking, analytical modelling, interconnection networks and software tools for manycore acceleration.";
var rossBio = "Ross has a degree in Behavioural Sciences and a Postgraduate Diploma in Information Technology. He has over 11 years IT experience, 9 spent as part of the Oracle team within Motorola as an Apps DBA. He loves music, photography, being in the middle of nowhere and his most recent obsession is windsurfing, where he is currently trying to spend more time on top of the water and less under it.";
var vivBio = "Viv qualified with a BEng(Hons) in Aerospace Engineering and Astronautics at Kingston University. He previously spent time in IBM as a Server Specialist and currently heads up the User Experience team at MaidSafe dealing with WPF, Cocoa OSX and Qt UI Systems.";
var podBio = "SAFE Pods are hubs of innovation that focus on building and expanding the Safe network infrastructure and ecosystem. <a href='/safe-pods'>Learn more</a> about how MaidSafe is decentralizing network and application development.";
var niallBio = "Niall holds graduate and post-graduate qualifications from a number of Universities in subjects including Education, Management, Economics, Pure Maths, Complexity, Information Systems and of course Software. He has contributed more than 60k lines of code to multiple open source projects since the early 1990s, and is currently also part of the Boost C++ Libraries development and administrative teams. When not working, Niall's favourite thing is anything involving his wife and daughter.";
var shonaBio = "Shona has an HND in Graphic Design and is part of the User Experience team. She previously spent 3 years working for a creative agency and is now in her second year at MaidSafe. Her favourite things include family movie nights, aerial silks, Instagram, doing handstands, chewing fruit gums and hosting tea parties.";
var justineBio = "Justine has over 20 years experience in the catering and leisure sector and during that time she has run her own business and obtained qualifications in customer relations. Her favourite pastimes are shopping and music (including camping at T in the Park). Justine also undertakes the role as sports mum - just as long as shops are nearby and can still do lunch!";
var lindaBio = "Linda has travelled extensively working as a Display Manager for Topshop and Habitat. She then went on to graduate as a Bachelor of Science and worked for South Ayrshire Council and Kilmarnock College before coming to MaidSafe. Linda is renowned for her love of food (we don&rsquo;t know where she puts it all!) and enjoys long walks along the beach with her Yorkshire Terrier.";
var nickBio = "Nick has an MSc in Marketing and has spent the last 10 years in senior marketing positions. Prior to that he fulfilled project management roles within large blue chip technology companies. Nick is responsible for sales and marketing, intellectual property, user support and MaidSafe&rsquo;s revenue streams.";
var paigeBio = "Paige has a BFA in Interrelated Media which gave her an interest in event production, programming and studying the complexity of nature. At MaidSafe, Paige fills various roles with a focus on community and web development. She previously worked for mesh networking startup, Open Garden, currently co-organizes the 1500+ member San Francisco Bitcoin meetup and is generally interested in decentralizing all the things.";

$(document).ready(function () {
	$("#boss").click(function(){displayBio(this, "The Boss", bossBio, null, null);});

	$("#david").click(function(){displayBio(this, "David Irvine", davidBio, "metaquestions", 1);});
	$("#fraser").click(function(){displayBio(this, "Fraser Hutchison", fraserBio, null, null);});
	$("#qi").click(function(){displayBio(this, "Qi Ma", qiBio, null, null);});
	$("#prakash").click(function(){displayBio(this, "Chandra Prakash", prakashBio, null, null);});
	$("#ben").click(function(){displayBio(this, "Benjamin Bollen", benBio, null, null);});
	$("#mahmoud").click(function(){displayBio(this, "Mahmoud Moadeli", mahmoudBio, null, null);});
	$("#ross").click(function(){displayBio(this, "Ross Muir", rossBio, "RosscoMuir", null);});
	$("#viv").click(function(){displayBio(this, "Viv Rajkumar", vivBio, null, null);});
	$("#pod").click(function(){displayBio(this, "Safe Pod", podBio, null, null);});
	$("#niall").click(function(){displayBio(this, "Niall Douglas", niallBio, null, null);});

	$("#shona").click(function(){displayBio(this, "Shona Oldham", shonaBio, "shonalot", null);});

	$("#justine").click(function(){displayBio(this, "Justine McLevy", justineBio, "JustineMcLevy", null);});
	$("#linda").click(function(){displayBio(this, "Linda Rose", lindaBio, null, null);});

	$("#nick").click(function(){displayBio(this, "Nick Lambert", nickBio, "N1ckLambert", null);});
	$("#paige").click(function(){displayBio(this, "Paige Peterson", paigeBio, "ioptio", null);});
});
	
function displayBio(obj, name, bio, twitter, wp){
	if (!$(obj).hasClass("icon-active")){
		$( "div.team-map" ).children( ".icon-active" ).removeClass( "icon-active" );
		$(obj).addClass("icon-active");
	}
	$(".profile-info h2").replaceWith("<h2>"+name+"</h2>");
	$(".profile-info p").replaceWith("<p>"+bio+"</p>");
	$(".profile-twitter").addClass("hidden");
	if (twitter!=null){
		$(".twitter-"+twitter).removeClass("hidden");
		//$("div.profile-twitter").replaceWith('<div class="profile-twitter"><a href="https://twitter.com/'+twitter+'" target="_blank" class="twitter-follow-button" data-show-count="false">Follow @'+twitter+'</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?\'http\':\'https\';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+\'://platform.twitter.com/widgets.js\';fjs.parentNode.insertBefore(js,fjs);}}(document, \'script\', \'twitter-wjs\');</script></div>');
	}
	if (wp==null){
		if (!$(".profile-wp").hasClass("hidden")){
			$(".profile-wp").addClass("hidden");
		}
	} else {
		$(".profile-wp").removeClass("hidden");
	}
}