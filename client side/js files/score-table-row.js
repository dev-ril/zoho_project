import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { helper } from '@ember/component/helper';


export default class ScoreTableRowComponent extends Component {
    @service variables;

}
