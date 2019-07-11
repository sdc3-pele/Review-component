var express = require('express');
var request = require('supertest');
var $ = require('jquery');

var app = express();


describe('Test the root path and statuses of API calls', function() {

  test('if GET request with listing_id within range of 0-99 outputs status code of 200', (done) => {
    var params = 99;
    request(app).get(`/api/listings?id=${params}`).expect(200);
    done();
    });
  test('GET request with listing_id in different range outputs status code of 404', (done) => {
    var params = 199;
    request(app).get(`/api/listings?id=${params}`).expect(404);
    done();
  });

});

describe('Test API calls', function() {

  test('if there are 100 listings in database and we get them all', () => {
      $.ajax({
          url: 'http://localhost:3004/api/listings',
          type: 'GET',
          success: (data) => {
          expect(data.length).toBe(100);
          }
      });
  });

  test('if every listing\'s data saved in a right type', () => {
    $.ajax({
        url: 'http://localhost:3001/api/testing',
        type: 'GET',
        success: (data) => {
        var randomIndex = Math.floor(Math.random() * 100);
        expect(typeof data[randomIndex].listing_id).toBe('string');
        expect(typeof data[randomIndex].review_title).toBe('string');
        expect(typeof data[randomIndex].review_details).toBe('string');
        expect(typeof data[randomIndex].overall_rating).toBe('number');
        expect(typeof data[randomIndex].nickname_login).toBe('string');
        expect(typeof data[randomIndex].location).toBe('string');
        expect(typeof data[randomIndex].athletic_type).toBe('string');
        expect(typeof data[randomIndex].body_type).toBe('string');
        expect(typeof data[randomIndex].age).toBe('number');
        expect(typeof data[randomIndex].what_you_liked).toBe('string');
        expect(typeof data[randomIndex].what_you_did_not_liked).toBe('string');
        expect(typeof data[randomIndex].fit).toBe('number');
        }
    });
  });

});
