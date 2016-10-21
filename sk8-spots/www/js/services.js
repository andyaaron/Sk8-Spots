angular.module('starter.services', [])

.factory('categoryData', function ($http) {
    console.log("Inside categoryData service!");

    return {
        categories: $http.get("js/TrickData.js")
    }
})

.factory('sk8Categories', function (rootRef) {
    return {
        getCategoriesRef: function () {
            return rootRef.child('categories');
        }
    }
})

/* not used, may be useful for reference though */
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
