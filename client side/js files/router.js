import EmberRouter from '@ember/routing/router';
import config from 'zoho-project/config/environment';
import Ember from 'ember';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('register');
  this.route('homepage',{ path: 'play-match'});
  this.route('create-match');
  this.route('history');
});

 