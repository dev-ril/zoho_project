import Service from '@ember/service';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Ember from 'ember';
import $ from 'jquery';
import jQuery from 'jquery';

export default class VariablesService extends Service {

    @tracked isExpanded = false;

    //variables for team-details
    @tracked button1 = "Start Game";
    battingTeam = "Chennai Super Kings";
    @tracked runsNeeded = 0;
    @tracked totalOvers = 0;

    //variables for score-details
    @tracked balls = 0;
    @tracked score = 0;
    @tracked wicketsGone = 0;
    @tracked winningTeam;

    //iterator variables
    @tracked i = 0;
    @tracked j = 1;
    @tracked k = 0;
    @tracked h = 0;
    @tracked ccc = true;

    //variables for batsmen
    @tracked batsmen = ['Ruturaj Gaikwad', 'Faf du Plessis', 'Moeen Ali', 'Suresh Raina', 'Ambati Rayudu', 'Ravindra Jadeja', 'MS Dhoni', 'Sam Curran', 'Dwayne Bravo', 'Shardul Thakur', 'Deepak Chahar'];
    @tracked batsMen = {
        name:['Ruturaj Gaikwad', 'Faf du Plessis', 'Moeen Ali', 'Suresh Raina', 'Ambati Rayudu', 'Ravindra Jadeja', 'MS Dhoni', 'Sam Curran', 'Dwayne Bravo', 'Shardul Thakur', 'Deepak Chahar'],
        status:[1,2,3,4,5,6,7,8,9,10,11],
    };
    @tracked batsmanList = ['Ruturaj Gaikwad', 'Faf du Plessis', 'Moeen Ali', 'Suresh Raina', 'Ambati Rayudu', 'Ravindra Jadeja', 'MS Dhoni', 'Sam Curran', 'Dwayne Bravo', 'Shardul Thakur', 'Deepak Chahar'];
    @tracked runsTaken = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    @tracked outList = [];
    @tracked currentBatsman1 = this.batsmen[this.i];
    @tracked runsBatsman1 = this.runsTaken[this.i];
    @tracked currentBatsman2 = this.batsmen[this.j];
    @tracked runsBatsman2 = this.runsTaken[this.j];

    //variables for bowlers
    @tracked bowlers = ['Jasprit Bumrah', 'Rahul Chahar', 'Piyush Chawla', ' Trent Boult', ' Hardik Pandya'];
    @tracked runsGiven = [0, 0, 0, 0, 0];
    @tracked wicketsTaken = [0, 0, 0, 0, 0];
    @tracked currentBowler = this.bowlers[this.k];
    @tracked runsBowler1 = this.runsGiven[this.k];
    @tracked wicketsBowler1 = this.wicketsTaken[this.k];

    //variables for overs
    @tracked over = 0;
    @tracked forOver = [0.1, 0.2, 0.3, 0.4, 0.5, 1];

    //for mentioning type of ball
    @tracked tob = 'c';

    //for overs table
    @tracked overlist = [1];
    @tracked b = ['-','-','-','-','-','-'];
    @tracked t = [0];
    @tracked finalTotal = '-';

    bb = [];
    tt = [0];
    xx = [1];
    f;
    @tracked e = [0];  
    @tracked extraRuns =[];
   
    //for man of the match
    @tracked bestBatsman;
    @tracked bestBowler;
    @tracked bestPlayer;

    @tracked isBoundary4;
    @tracked isBoundary6;
    @tracked isBoundary;
    @tracked isEnded = false;
    @tracked alertStatus = true;

    @tracked create = false;
    @tracked shistory = false;
    @tracked showhistory = false;
    @tracked matchstatus = false;
    @tracked uname;


    @tracked runsScored= [4,5,6];
    @tracked wickets = [1,2,3];
    @tracked winningTeam = [a,b,c];
    @tracked newData = [];
    
    @tracked pageNumber = 1;    
    @tracked pageSize = 5;
    @tracked pages = [];
    @tracked noOfRecords = [5,10,20,30];

    @tracked noOfPages = [];
    @tracked totalCount = 0;

}