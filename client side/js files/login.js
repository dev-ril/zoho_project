import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Ember from 'ember';
import $ from 'jquery';
import jQuery from 'jquery';
import { inject as service } from '@ember/service';


export default class LoginComponent extends Component {
    @service variables;
    @action
    login(username, password) {
        if (username!=null && password!=null&&username!=" " && password!=" ") {
            let logindata = {
                username: username,
                password: password,
            };
            $.ajax({
                url: 'http://localhost:8080/FirstServlet/login',
                type: 'POST',
                data: logindata,
                success: function (data) {
                    if (data.toString().trim() != 'Successful') {
                        window.location.replace(data);
                    }
                    else{
                        alert("Incorrect Username or Password")
                    }
                }
            });
        }
        else{
            alert("Enter valid username and password !!");
        }


    }


}
