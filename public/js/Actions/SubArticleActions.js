/**
 * Created by cds on 2017/1/17.
 */

import alt from '../alt'

class SubArticleActions{
    constructor(){
        this.generateActions(
            'updateName',
            'updataContent',
            'updataSelect'
        );
    }
}

export default alt.createActions(SubArticleActions);