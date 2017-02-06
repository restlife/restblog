/**
 * Created by cds on 2017/1/17.
 */
import alt from '../alt';

class HomeActions{
    constructor(){
        this.generateActions('updataPage','updataFirstLast','page','updataPageCurrent');
    }
}

export default alt.createActions(HomeActions);