import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Ember from 'ember';
import $ from 'jquery';
import jQuery from 'jquery';

export default class RegisterComponent extends Component {

  @action
  register(username, password) {
    let registerdata = {
      username: username,
      password: password,
    };
    if (username!=null && password!=null&&username!=" " && password!=" ") {
      $.ajax({
        url: 'http://localhost:8080/FirstServlet/register',
        type: 'POST',
        data: registerdata,
        success: function (data) {
          if (data.toString().trim() != 'Successful') {
            console.log("success " + (data));
            window.location.replace("#/login");
            alert("Registered successfully!!");
          }
          else{
            console.log(data);
          }

        }
      });
    }
    else{
      alert("Enter valid username and password!!!");
    }
  }
}
