import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Ember from 'ember';
import $ from 'jquery';
import jQuery from 'jquery';

var userName;
$.ajax({
    url: 'http://localhost:8080/FirstServlet/loginvalidate',
    type: 'POST',
    data:{url:'#/create-match'},
    success: function (data) {
        if (data.toString().trim != 'Successful') {
            userName = data;
        }
        if (data.toString().trim() == 'Successful') {
            window.location.replace("#/login");
            location.reload(true);
        }
    }
});

export default class CreateMatchComponent extends Component {
    @service variables; 
    @action
    createMatch() {
        this.variables.uname = userName;
        this.variables.create = true;
        this.variables.shistory = false;
        this.variables.shistory = this.variables.shistory;
    }
    @action
    startMatch(target, over) {
        if (isNaN(target)) {
            alert("Target score must be a number!!");
         }
         else if(isNaN(over)){
            alert("Number of overs must be a number!!");
         }
        else {
            this.variables.matchstatus = true;
            this.variables.matchstatus = this.variables.matchstatus;
            this.variables.uname = userName;
            if (target == null || over == null || target > (over * 6 * 6)) {
                alert("Enter valid target score and over!!");
            }
            else {
                this.variables.runsNeeded = target;
                this.variables.totalOvers = over;
                this.variables.create = false;
                this.variables.refresh = true;
                this.variables.refresh = this.variables.refresh;
                window.location.replace("#/play-match");
            }
        }

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

    @action
    showHistory() {
        this.variables.shistory = false;
        window.location.replace("#/history");
    }

}
