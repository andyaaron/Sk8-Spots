angular.module('starter.controllers', ['ionic', 'ngMap', 'firebase'])

.controller('DashCtrl', function ($scope, $firebaseArray, $firebaseAuth) {
    var vm = this;
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

.controller('AccountCtrl', function ($scope, $firebaseAuth, Auth) {
    var vm = this;
    //stuff here
    // Get the currently signed-in user
    Auth.$onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in
        } else {
            // No user is signed in
        }
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
                vm.message = "User created with uid: " + firebaseUser.uid;
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



    vm.signUp = function () {
        Auth.$createUser(vm.email, vm.password, function (error, user) {
            if (!error) {
                vm.alert.message = '';
            } else {
                vm.alert.message = 'The username and password combination you entered is invalid.';
            }
        });
    }
})

.controller('MapCtrl', function (NgMap) { 
    var vm = this;
    NgMap.getMap().then(function (map) {
        console.log('map', map);
        vm.map = map;
    });

    vm.clicked = function () {
        alert('Clicked a link inside infoWindow');
    };

    vm.shops = [
      { id: '1', name: 'Depot Ledge', address: '133 Depot St, Franklin, NC', position: [35.1772876, -83.3735501] },
      { id: '2', name: 'The Walk', address: '171 West Main St, Franklin, NC', position: [35.181465, -83.384155] },
      { id: '3', name: 'Cherokee Skatepark', address: '1108 Acquoni Rd, Cherokee, NC', position: [35.491382, -83.311923] },
      { id: '4', name: 'Waynesville Skatepark', address: '550 Vance St, Waynevilles, NC', position: [35.505803, -82.978347] }
    ];
    vm.shop = vm.shops[0];

    vm.showDetail = function (e, shop) {
        vm.shop = shop;
        vm.map.showInfoWindow('foo-iw', shop.id);
    };

    vm.hideDetail = function () {
        vm.map.hideInfoWindow('foo-iw');
    };

});
