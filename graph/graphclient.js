/*
 * Copyright (c) Microsoft All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

var auth = require('./auth');
var graph = require('./graph');
var Q = require('q');

var getFaqs = function() {
  var deferred = Q.defer();
  var faqs = [];
  // Get an access token for the app.
  auth.getAccessToken().then(function (token) {
    // Get all of the users in the tenant.

    // Create an event on each user's calendar.
    graph.getListItems(token)
      .then(function (items) {
        items.forEach(function (item) {
          graph.getListItem(token, item.id).then(function (itemInfo) {
            console.log(itemInfo.Title, itemInfo.VTXAnswer);
            faqs.push({
              question: itemInfo.Title,
              answer: itemInfo.VTXAnswer
            });

            if(items.length === faqs.length){
              deferred.resolve(faqs);
            }
          }, function (error) {
            console.error('>>> Error getting items: ' + error);
            deferred.reject(error);
          });
        });
      }, function (error) {
        console.error('>>> Error getting items: ' + error);
        deferred.reject(error);
      });
  }, function (error) {
    console.error('>>> Error getting access token: ' + error);
    deferred.reject(error);
  });

  return deferred.promise;
}

module.exports = { getFaqs };