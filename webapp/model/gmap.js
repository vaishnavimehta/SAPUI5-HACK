window.addEventListener('load', function() {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = 
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyAWAb0Dr2cDdOicUsKYqBGMcscdV79Nutg&v=3&callback=init';
    document.body.appendChild(script);
});
function init(){}