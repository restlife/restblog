/**
 * Created by cds on 2017/1/17.
 */

import alt from '../alt';
import ArtOperateActions from '../Actions/ArtOperateActions'

class ArtOperateStore{
    constructor(){
        this.bindActions(ArtOperateActions);
        this.good = 0;
        this.look = 0;
    }
    onUpdataLook(data){
        this.look =  data;
    }
    onUpdataGood(data){
        this.good =  data;
    }

}

export default alt.createStore(ArtOperateStore);