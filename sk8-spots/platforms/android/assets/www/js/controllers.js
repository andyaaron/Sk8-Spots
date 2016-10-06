angular.module('starter.controllers', ['ionic', 'ngMap'])

.controller('DashCtrl', function ($scope, $http, categoryData) {
    var vm = this;

    vm.categories = [];

    categoryData.categories
        .then(function (response) {
            console.log("Inside success function");
            console.dir(response);

            vm.categories = response.data;
        });

    console.log("after then function");
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
