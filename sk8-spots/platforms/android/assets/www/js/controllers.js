angular.module('starter.controllers', ['ionic', 'ngMap', 'firebase'])

/* ===========
 * Sk8 Log tab
 * ===========*/
.controller('DashCtrl', function ($scope, $firebaseArray, Auth) {
    var vm = this;

    // Get the currently signed-in user
    Auth.$onAuthStateChanged(function (firebaseUser) {
        vm.firebaseUser = firebaseUser;
    });

    // reference variable for database
    var ref = firebase.database().ref().child("TrickRecords");

    //create synchronized array
    vm.records = $firebaseArray(ref);

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
.controller('AccountCtrl', function ($scope, $firebaseAuth, Auth) {
    var vm = this;

    
    // Get the currently signed-in user
    Auth.$onAuthStateChanged(function (firebaseUser) {
        vm.firebaseUser = firebaseUser;
    });
    
    // Create user function
    vm.createUser = function () {
        vm.firebaseUser = null;
        vm.message = null;
        vm.error = null;


        // Create a new user
        Auth.$createUserWithEmailAndPassword(vm.email, vm.password)
            .then(function (firebaseUser) {
                vm.message = "User created with uid: " + firebaseUser.uid;
                // Auth.currentUser.$sendEmailVerification();
            }).catch(function(error) {
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
    /* Delete user function
    vm.deleteUser = function (){ 
        vm.message = null;
        vm.error = null;

        // Delete the currently signed in user
        Auth.$deleteUser().then(function () {
            vm.message = "User deleted";
        }).catch(function(error) {
            vm.error = error;
        });
    }
    */
})

/* =======
 * Map Tab
 * =======*/
.controller('MapCtrl', function ($scope, $firebaseArray, $firebaseAuth, Auth, NgMap) {
    // Declare stuff
    var vm = this;
    var ref = firebase.database().ref().child("Sk8Spots");

    // Create sync'd array
    vm.spots = $firebaseArray(ref);

    /* Add new entry to the database by
     * grabbing user's current lat & lng */
    vm.addSpot = function () {
        vm.spots.$add({
            // Stuff here...
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
    vm.shops = [
      { id: '1', name: 'Depot Ledge', position: [35.1772876, -83.3735501] },
      { id: '2', name: 'The Walk', position: [35.181465, -83.384155] },
      { id: '3', name: 'Cherokee Skatepark', position: [35.491382, -83.311923] },
      { id: '4', name: 'Waynesville Skatepark', position: [35.505803, -82.978347] }
    ];
    vm.shop = vm.shops[0];


    // Marker holder
    vm.markers = [];

    // Show details of spot
    vm.showDetail = function (e, shop) {
        vm.shop = shop;
        vm.map.showInfoWindow('foo-iw', shop.id);
    };

    // Hide details
    vm.hideDetail = function () {
        vm.map.hideInfoWindow('foo-iw');
    };

    // Add location. Grab users GPS coordinates and auto insert.
    vm.addMarker = function (lat, lng, title) {
        var latLng = new google.maps.LatLng(lat, lng);

        var marker = new google.maps.Marker({
            map: vm.map,
            position: latLng,
            title: title
        });
        marker.content = '<div class="infoWindowContent">'
                        + marker.title + '</div>';

        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent('<h2>' + marker.title + '</h2>'
                + marker.content);
            infoWindow.open($scope.map, marker);
        });

        vm.markers.push(marker);

        vm.map.setCenter(latLng);
    };

    vm.openInfoWindow = function(e, selectedMarker) {
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});
