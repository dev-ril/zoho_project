import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Ember from 'ember';
import $ from 'jquery';
import jQuery from 'jquery';



export default class ScoreComponent extends Component {

  @service variables;
  temp;
  @tracked count = 0;
  @tracked m = 0;
  @tracked r = 0;
  @tracked oc = 2;
  @tracked total = 0;
  @tracked extras = 0;
  @tracked extrasRuns = 0;
  overno = this.variables.overlist[0];
  runsneeded = this.variables.runsNeeded;
  ftarget = this.variables.runsNeeded;
  fover = this.variables.totalOvers;

  swap() //for swapping batsmen while over change (or) during odd runs
  {
    this.temp = this.variables.currentBatsman1;
    this.variables.currentBatsman1 = this.variables.currentBatsman2;
    this.variables.currentBatsman2 = this.temp;

    this.temp = this.variables.runsBatsman1;
    this.variables.runsBatsman1 = this.variables.runsBatsman2;
    this.variables.runsBatsman2 = this.temp;

    this.temp = this.variables.i;
    this.variables.i = this.variables.j;
    this.variables.j = this.temp;

  }

  overChange() {
    this.variables.runsGiven[this.variables.k] = this.variables.runsBowler1; //to update runs given by the bowler
    this.variables.wicketsTaken[this.variables.k] = this.variables.wicketsBowler1;  //to update wickets taken by the bowler
    this.variables.balls = 0; //to start the over from beginning

    this.variables.k += 1; // increment the bowler
    if (this.variables.k > 4) //suppose bowler limit reached repeat from the first bowler
    {
      this.variables.k = 0;
    }

    this.variables.currentBowler = this.variables.bowlers[this.variables.k]; //change the bowler
    this.variables.runsBowler1 = this.variables.runsGiven[this.variables.k]; //set runs given to current bowler
    this.variables.wicketsBowler1 = this.variables.wicketsTaken[this.variables.k];  //set wickets taken to current bowler

  }

  @action
  runs(value) {

    //Checking whether required runs reached
    if (this.variables.score >= this.runsneeded) {

      this.variables.finalTotal = this.total;
      this.variables.winningTeam = 'Team 1';
      let historydata = {
        uname :   this.variables.uname,
        fscore : parseInt(this.variables.score),
        fwicket : parseInt(this.variables.wicketsGone),
        fteam : "Team 1",
        ftarget: parseInt(this.ftarget),
        fover: parseInt(this.fover)
      };
      console.log(historydata);
      this.variables.isEnded = true;
      alert("CSK won the match!!");

      $.ajax({
        url: 'http://localhost:8080/FirstServlet/historyservlet',
        type: 'POST',
        data: historydata,
        success: (data) => {
          console.log("success" + JSON.stringify(data));
        }
      });
      this.ManOftheMatch1();
      this.variables.bestPlayer = this.variables.bestBatsman;
      this.variables.matchstatus = false;
      this.variables.matchstatus = this.variables.matchstatus;
    }
    //Checking whether overs are completed
    else if (this.variables.over == this.variables.totalOvers || this.variables.wicketsGone > 9) {

      this.variables.finalTotal = this.total;
      this.variables.winningTeam = 'Team 2';
      let historydata = {
        uname : this.variables.uname,
        fscore : parseInt(this.variables.score),
        fwicket : parseInt(this.variables.wicketsGone),
        fteam : "Team 2",
        ftarget: parseInt(this.ftarget),
        fover: parseInt(this.fover)
      };
      console.log(historydata);
      this.variables.isEnded = true;
      alert("CSK lost the match!!");
      $.ajax({
        url: 'http://localhost:8080/FirstServlet/historyservlet',
        type: 'POST',
        data: historydata,
        success: (data) => {
          console.log("success" + JSON.stringify(data));
        }
      });
   
      this.ManOftheMatch2();
      this.variables.bestPlayer = this.variables.bestBowler;
      this.variables.matchstatus = false;
      this.variables.matchstatus = this.variables.matchstatus;
    }


    else {
      if (this.variables.tob == 'n' || this.variables.tob == 'w') {
        this.extrasRuns += value;
      }

      if (this.variables.tob == 'c') {
        this.variables.balls++;
      }
      if (this.variables.balls <= 6) {

        this.variables.b[(this.variables.balls) - 1] = value;
        this.variables.b = this.variables.b;
        this.m++;

        if (value == 'out') {
          for (this.r = 0; this.r < 11; this.r++) {
            if (this.variables.batsMen.name[this.r] == this.variables.currentBatsman1) {
              this.variables.batsMen.status[this.r] = 0;
            }
            this.variables.batsMen = this.variables.batsMen;
          }
          this.variables.outList.pushObject(this.variables.currentBatsman1);
          this.variables.batsmanList.removeObject(this.variables.currentBatsman1);
          this.variables.i += 1;
          if (this.variables.batsmen[this.variables.i] == this.variables.currentBatsman1 || this.variables.batsmen[this.variables.i] == this.variables.currentBatsman2) {
            this.variables.i += 1;
          }
          if (this.checkOut(this.variables.batsmen[this.variables.i]) == false) {
            while (this.checkOut(this.variables.batsmen[this.variables.i]) == false || (this.variables.batsmen[this.variables.i] == this.variables.currentBatsman1 || this.variables.batsmen[this.variables.i] == this.variables.currentBatsman2)) {
              this.variables.i += 1;
            }
          }

          if (this.variables.tob == 'c') {
            this.variables.over = this.variables.forOver[(this.variables.balls) - 1];
            this.variables.currentBatsman1 = this.variables.batsmen[this.variables.i];
            this.variables.runsBatsman1 = this.variables.runsTaken[this.variables.i];
            this.variables.wicketsGone += 1;
            this.variables.wicketsBowler1 += 1;
            this.variables.isBoundary = true;
          }
        }

        else {
          this.variables.isBoundary = false;
          this.total += value;
          if ((this.variables.runsNeeded - value) > 0) {
            this.variables.runsNeeded -= value;
          }
          else {
            this.variables.runsNeeded = 0;
          }
          if (this.variables.tob == 'c') {
            this.variables.over = this.variables.forOver[(this.variables.balls) - 1];//for mentioning over
          }
          this.variables.score += value;
          this.variables.runsBatsman1 += value; //for changing current batsman runs
          this.variables.runsTaken[this.variables.i] = this.variables.runsBatsman1; //to update the original value
          this.variables.runsTaken = this.variables.runsTaken;
          this.variables.runsBowler1 += value;  //for changing runs given by current bowler

          if (value == 1 || value == 3) {
            this.swap();
          }

          if (value == 4) {
            this.variables.isBoundary4 = true;
            this.variables.isBoundary6 = false;
          }
          else if (value == 6) {
            this.variables.isBoundary6 = true;
            this.variables.isBoundary4 = false;
          }
          else {
            this.variables.isBoundary4 = false;
            this.variables.isBoundary6 = false;
          }
        }
        if (this.variables.balls == 6 && this.oc <= this.variables.totalOvers) {
          this.swap();
          this.variables.overlist[(this.oc) - 2] = 0;
          this.variables.overlist.pushObject(this.oc);
          this.variables.xx[0] = (this.oc) - 1;

          this.oc++;
          this.variables.t[0] = this.total;
          this.variables.tt = this.variables.t;
          this.total = 0;
          this.overChange();
          this.variables.bb[0] = this.variables.b[0];
          this.variables.bb[1] = this.variables.b[1];
          this.variables.bb[2] = this.variables.b[2];
          this.variables.bb[3] = this.variables.b[3];
          this.variables.bb[4] = this.variables.b[4];
          this.variables.bb[5] = this.variables.b[5];
          this.variables.bb = this.variables.b;
          this.variables.b = ['-', '-', '-', '-', '-', '-'];
          this.m = 0;
          for (this.variables.f = 0; this.variables.f < 6; this.variables.f++) {
            this.variables.forOver[this.variables.f] += 1;
          }
          console.log(this.variables.xx);
        }
      }
    }

    let customdata = {
      score: parseInt(this.variables.score),
      over: parseFloat(this.variables.over),
    };
  }


  @action
  checkBall(value)  //for checking the type of ball
  {
    if (value == 'n') //no ball
    {
      this.variables.tob = 'n';
      this.variables.score += 1;
      if ((this.variables.runsNeeded - 1) > 0) {
        this.variables.runsNeeded -= 1;
      }
      else {
        this.variables.runsNeeded = 0;
      }
      this.total += 1;
      this.extras += 1;
    }

    else if (value == 'w')  //wide ball
    {
      this.variables.tob = 'w';
      this.variables.score += 1;
      if ((this.variables.runsNeeded - 1) > 0) {
        this.variables.runsNeeded -= 1;
      }
      else {
        this.variables.runsNeeded = 0;
      }
      this.total += 1;
      this.extras += 1;
    }
    else if (value == 'c')    //correct ball
    {
      this.variables.tob = 'c';
    }
  }


  @action
  checkOut(value) {
    for (var n = 0; n < 10; n++) {
      if (this.variables.outList[n] == value) {
        return false;
      }
    }
    return true;
  }


  @action
  selectBatsman1(value) //for selecting batsman 1
  {
    if (this.variables.currentBatsman1 != value && this.variables.currentBatsman2 != value && this.checkOut(value)) //to check whether selected batsman is not  same as the current batsmen
    {
      for (this.variables.h = 0; this.variables.h < 11; this.variables.h++)   //to update the runs taken by current batsman before changing
      {
        if (this.variables.batsmen[this.variables.h] == this.variables.currentBatsman1) {
          this.variables.runsTaken[this.variables.h] = this.variables.runsBatsman1;
          this.variables.batsmanList.insertAt(this.variables.h, this.variables.currentBatsman1);
        }
      }
      this.variables.batsmanList.removeObject(value);
      this.variables.currentBatsman1 = value; //changing the selected batsman

      for (this.variables.h = 0; this.variables.h < 11; this.variables.h++) {
        if (this.variables.batsmen[this.variables.h] == this.variables.currentBatsman1) //setting the runsTaken value for currentBatsman
        {
          this.variables.runsBatsman1 = this.variables.runsTaken[this.variables.h];
          this.variables.i = this.variables.h;
        }
      }

    }
  }

  @action
  selectBatsman2(value)   //for selecting batsman 2
  {
    if (this.variables.currentBatsman1 != value && this.variables.currentBatsman2 != value && this.checkOut(value)) {
      for (this.variables.h = 0; this.variables.h < 11; this.variables.h++) {
        if (this.variables.batsmen[this.variables.h] == this.variables.currentBatsman2) {
          this.variables.runsTaken[this.variables.h] = this.variables.runsBatsman2;
          this.variables.batsmanList.insertAt(this.variables.h, this.variables.currentBatsman2);
        }
      }
      this.variables.batsmanList.removeObject(value);
      this.variables.currentBatsman2 = value;
      for (this.variables.h = 0; this.variables.h < 11; this.variables.h++) {
        if (this.variables.batsmen[this.variables.h] == this.variables.currentBatsman2) {
          this.variables.runsBatsman2 = this.variables.runsTaken[this.variables.h];
          this.variables.i = this.variables.h;
        }
      }
    }
  }

  @action
  ManOftheMatch1() {
    var maxRuns = Math.max(...this.variables.runsTaken);
    for (this.m = 0; this.m < 11; this.m++) {
      if (this.variables.runsTaken[this.m] == maxRuns) {
        this.variables.bestBatsman = this.variables.batsmen[this.m];
      }
    }
  }
  @action
  ManOftheMatch2() {
    var maxWickets = Math.max(...this.variables.wicketsTaken);
    var flag = 0;
    var minRuns = Math.max(...this.variables.runsGiven);
    for (this.m = 0; this.m < 5; this.m++) {
      if (this.variables.wicketsTaken[this.m] == maxWickets) {
        if (this.variables.runsGiven[this.m] < minRuns) {
          this.variables.bestBowler = this.variables.bowlers[this.m];
          minRuns = this.variables.runsGiven[this.m];
          flag = 1;
        }
      }
    }
    if (flag == 0) {
      for (this.m = 0; this.m < 5; this.m++) {
        if (this.variables.wicketsTaken[this.m] == maxWickets) {
          this.variables.bestBowler = this.variables.bowlers[this.m];
          minRuns = this.variables.runsGiven[this.m];
        }
      }
    }
  }
}




