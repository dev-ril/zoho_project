import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AlertComponent extends Component {
    @service variables;

    @action
    closeAlert()
    {
        this.variables.alertStatus = !(this.variables.alertStatus);
    }
}
