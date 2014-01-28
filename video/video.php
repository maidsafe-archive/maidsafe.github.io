<!--
<script type='text/javascript' src='video/js/jwplayer.js'></script>
<div id='mediaplayer'></div>

<script type="text/javascript">
  jwplayer('mediaplayer').setup({
	'id': 'playerID',
	
	'width' : '100%',
        'aspectratio' : '16:9',
    
	'stretching': 'fill',
	'levels': [
	   {
		   'file': 'video/MaidSafe_Technology_Overview.mp4'
	   },
	   {
		   'file': 'video/MaidSafe_Technology_Overview.webm'
	   },
	   {
		   'file': 'video/MaidSafe_Technology_Overview.ogv'
	   }
	],
	'image': 'video/poster.jpg',
	'autostart': 'false',
	'skin': 'video/skin/glow/glow.xml',
	
	'modes': [
		{type: 'html5'},
		{type: 'flash', src: 'video/player/player.swf'},
		{type: 'download'}
	]
  });
</script>-->

<div  class="videocontent">
<div id="mediaplayer">Loading the player...</div>

<script type="text/javascript">
    jwplayer("mediaplayer").setup({
        file: "video/MaidSafe_Technology_Overview.mp4",
		file: "video/MaidSafe_Technology_Overview.webm",
		file: "video/MaidSafe_Technology_Overview.ogv",
        image: "video/poster.png",
        width: "100%",
        aspectratio: "16:9"
       
    });
</script>
</div>