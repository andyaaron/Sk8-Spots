angular.module('starter.services', [])

// this is here. dont remember why. may be obsolete
.factory('categoryData', function ($http) {
    console.log("Inside categoryData service!");

    return {
        categories: $http.get("js/TrickData.js")
    }
})

// factory for coordinate database
.factory('Sk8Spots', function ($firebaseArray) {
    // Create reference to database where we will store our data
    var ref = firebase.database().ref().child("Sk8Spots");

    return $firebaseArray(ref);
})

// factory for user database
.factory('Users', function ($firebaseArray) {
    var ref = firebase.database().ref().child("Users");
    return $firebaseArray(ref);
})

// factory for user authentication through firebase
.factory('Auth', function ($firebaseAuth) {
    return $firebaseAuth();
});