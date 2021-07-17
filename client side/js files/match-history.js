import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Ember from 'ember';
import $ from 'jquery';
import jQuery from 'jquery';

var userName;
var pagesize;
var count;
$.ajax({
    url: 'http://localhost:8080/FirstServlet/loginvalidate',
    type: 'POST',
    data: { url: '#/history' },
    success: function (data) {
        if (data.toString().trim() == 'Successful') {
            window.location.replace("#/login");
            location.reload(true);
        }
        else {
            userName = data;
        }
    }
});

$.ajax({
    url: 'http://localhost:8080/FirstServlet/pagesize',
    type: 'GET',
    success: function (data) {
        if (data.toString().trim() == 'Successful') {
            pagesize = 5;
        }
        else {
            pagesize = data;
        }
    }
});



export default class MatchHistoryComponent extends Component {
    @service variables;
    @action

    showHistory() {
        this.variables.pageSize = parseInt(pagesize);
        this.variables.uname = userName;
        let usernamedata = { username: this.variables.uname };
        this.variables.create = false;
        this.variables.shistory = true;
        var ans;

        function doSomething(data) {
            ans = data;
        }

        $.ajax({
            url: 'http://localhost:8080/FirstServlet/getcount',
            type: 'POST',
            data: usernamedata,
            async: false,
            success: function (data) {
                doSomething(data);
            }
        });
        count = ans;
        this.variables.totalCount = count;
        this.setNoOfRecords(this.variables.pageSize);
    }


    @action
    logOut() {
        this.variables.create = false;
        this.variables.shistory = false;
        $.ajax({
            url: 'http://localhost:8080/FirstServlet/logout',
            type: 'GET',
            success: function (data) {
                location.reload(true);
            }
        });
        window.location.replace("#/login");
    }


    @action
    clearHistory() {
        this.variables.uname = userName;
        let usernamedata = { username: this.variables.uname };
        $.ajax({
            url: 'http://localhost:8080/FirstServlet/clearhistory',
            type: 'POST',
            data: usernamedata,
            success: function (data) {
                alert("Match history cleared !!");
            }
        });
        location.reload(true);
    }

    @action
    paginate(page_number) 
    {
        this.variables.pages.clear();
        var aa;
        var a, b, c, d, e, f;

        function doSome(data) {
            aa = data;
        }
        let usernamedata = { username: this.variables.uname, count: page_number, pagesize: this.variables.pageSize };
        console.log(usernamedata);
        $.ajax({
            url: 'http://localhost:8080/FirstServlet/gethistory',
            type: 'POST',
            data: usernamedata,
            async: false,
            success: function (data) {
                doSome(data);
            }
        });
        a = aa['fscore'];
        b = aa['fwicket'];
        c = aa['fteam'];
        d = aa['date'];
        e = aa['ftarget'];
        f = aa['fover'];

        for (var i = 0; i < a.length; i++) {
            this.variables.pages.pushObject([d[i], e[i], f[i]]);
        }
        this.variables.pages = this.variables.pages;
    }

    @action
    setNoOfRecords(value) 
    {
        this.variables.pageSize = value;
        let pagesizedata = { pagesize: this.variables.pageSize };

        $.ajax({
            url: 'http://localhost:8080/FirstServlet/page',
            type: 'POST',
            data: pagesizedata,
            success: function (data) {
                console.log(data);
            }
        });

        this.variables.noOfPages.clear();

        for (var i = 1; i <= Math.ceil(count / value); i++) {
            this.variables.noOfPages.push(i);
        }

        this.paginate(1);
    }

    @action
    createMatch() {
        window.location.replace("#/create-match");
        location.reload(true);
    }
}

