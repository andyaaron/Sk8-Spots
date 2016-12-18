angular.module('starter.controllers', ['ionic', 'ngMap', 'firebase'])

/* ===========
 * Sk8 Log tab
 * ===========*/
.controller('DashCtrl', function ($scope, $firebaseArray, Auth, TrickRecords) {
    var vm = this;
    vm.auth = Auth;

    // Get the currently signed-in user
    Auth.$onAuthStateChanged(function (firebaseUser) {
        vm.firebaseUser = firebaseUser;
    });


    // reference variable for database

    //create synchronized array
    vm.records = TrickRecords;

    //add user entry to db
    vm.addRecord = function () {
        vm.records.$add({
            trick: vm.newTrickText,
            place: vm.newPlaceText,
            notes: vm.newNotesText
        });
    };

})

/* ============
 * Account tab
 * ============*/
.controller('AccountCtrl', function ($scope, $firebaseAuth, $firebaseArray, $firebaseObject, Auth) {
    var vm = this;
        
    // Get the currently signed-in user
    Auth.$onAuthStateChanged(function (firebaseUser) {
        vm.firebaseUser = firebaseUser;
    });
    
    // Show and hide login/signup forms
    vm.isHiddenLogin = false;
    vm.isHiddenSignup = false;

    vm.showLogin = function () {
        vm.isHiddenLogin = true;
        vm.isHiddenSignup = false;
    }

    vm.showSignup = function () {
        vm.isHiddenSignup = true;
        vm.isHiddenLogin = false;
    }
    // Create user function
    vm.createUser = function () {
        vm.firebaseUser = null;
        vm.message = null;
        vm.error = null;

        // Create a new user
        Auth.$createUserWithEmailAndPassword(vm.email, vm.password)
            .then(function (firebaseUser) {
                vm.message = "User created with uid: " + firebaseUser.uid;
                firebaseUser.sendEmailVerification();
                //Email sent;
                console.log("email sent");
            }).catch(function (error) {
                vm.error = error;
            });
    }

    // Sign in user
    vm.signIn = function () {
        vm.firebaseUser = null;
        vm.error = null;

        // Email & Pass sign in
        Auth.$signInWithEmailAndPassword(vm.email, vm.password)
            .then(function (firebaseUser) {
                vm.firebaseUser = firebaseUser
            }).catch(function (error) {
                vm.error = error;
            });
    }

    vm.signOut = function () {
        console.log(Auth);
        Auth.$signOut().then(function () {
            console.log("Logging out!");
        });
    }
})

/* =======
 * Map Tab
 * =======*/
.controller('MapCtrl', function ($scope, $firebaseArray, Auth, Sk8Spots, NgMap) {
    // Declare stuff
    var vm = this;
    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000
    };

    // Create sync'd array from database service
    vm.spots = Sk8Spots;
    console.log(Sk8Spots);

    function onSuccess(position) {
        vm.latLong = position.coords.latitude + ", " + position.coords.longitude;
        console.log(vm.latLong);
    };

    function onError(error) {
        vm.error = 'code: ' + error.code + '\n' + 'message: ' + error.message + '\n';
    };

    vm.getPosition = function () {
            vm.spots.$add({
                Coordinates: vm.latLong,
                Name: vm.name
            });
    };

    // Get map
    NgMap.getMap().then(function (map) {
        console.log('map', map);
        vm.map = map;
    });

    // Testing clicking
    vm.clicked = function () {
        alert('Clicked a link inside infoWindow');
    };

    // Manually inserted spots
    /*vm.shops = [
      { id: '1', name: 'Depot Ledge', position: [35.1772876, -83.3735501] },
      { id: '2', name: 'The Walk', position: [35.181465, -83.384155] },
      { id: '3', name: 'Cherokee Skatepark', position: [35.491382, -83.311923] },
      { id: '4', name: 'Waynesville Skatepark', position: [35.505803, -82.978347] }
    ];
    */
    vm.spot = vm.spots[0];

    // Marker holder
    vm.markers = [];

    // Show details of spot
    vm.showDetail = function (e, spot) {
        vm.spot = spot;
        vm.map.showInfoWindow('foo-iw', spot.id);
    };

    // Hide details
    vm.hideDetail = function () {
        vm.map.hideInfoWindow('foo-iw');
    };

    vm.openInfoWindow = function(e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});
