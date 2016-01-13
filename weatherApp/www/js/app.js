// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("weatherCtrl", function ($http) {
    var weather = this;
    var apiKey = '1f9136a9787c2cd3';
    var url = 'https://api.wunderground.com/api/' + apiKey + "/forecast/conditions/q/";


    $http.get(url + 'autoip.json').then(parseWUData);

    navigator.geolocation.getCurrentPosition(function (geopos){
        var lat = geopos.coords.latitude;
        var longi = geopos.coords.longitude;

        $http
            .get(url + lat + ',' + longi + '.json')
            .then(parseWUData);
    });

    weather.temp = '--';

    function stringifySearch() {
        var searchToString = weather.searchQuery;
        JSON.stringify(searchToString);
        searchToString = searchToString.replace(", ", "");
        searchToString = searchToString.replace(" ", "_");
        return searchToString;
    };

    weather.search = function () {
        var toState = stringifySearch().substr(-2);
        console.log("toState: ", toState);
        var toCity = stringifySearch().slice(0, -2);
        console.log("toCity: ", toCity);
        $http
            .get(url + toState + "/" + toCity + ".json")
            .then(parseWUData)
            .then(function () {
                console.log('url + toState + "/" + toCity + ".json" :, ', url + toState + "/" + toCity + ".json");
            })
    }

    function parseWUData(res) {
        var data = res.data.current_observation;
            weather.temp = data.temp_f;
            weather.location = data.display_location.full;
            weather.image = data.icon_url;
    };
});