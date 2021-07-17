import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Ember from 'ember';
import $ from 'jquery';
import jQuery from 'jquery';

$.ajax({
    url: 'http://localhost:8080/FirstServlet/loginvalidate',
    type: 'GET',
    crossDomain: true,
    success: function (data) {
        if (data.toString().trim() == 'Successful') {
            window.location.replace("#/login");
            location.reload(true);
        }
        else{

        }
    }
});

export default class HomePageComponent extends Component {
    @service variables;

    @action
    goHome()
    {
        window.location.replace("#/history");
        location.reload(true);
    }

    @action
    logOut() {
        this.variables.create = false;
        this.variables.shistory = false;
        $.ajax({
            url: 'http://localhost:8080/FirstServlet/logout',
            type: 'GET',
            crossDomain: true,
            success: function (data) {
                location.reload(true);
            }
        });
        window.location.replace("#/login");
    }
}
