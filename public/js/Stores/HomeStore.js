/**
 * Created by cds on 2017/1/17.
 */

import alt from '../alt';
import HomeActions from '../Actions/HomeActions'

class HomeStore{
    constructor(){
        this.bindActions(HomeActions);
        this.pagetotal = 0;
        this.pageNum = 0 ;
        this.pageCurrent = 1;
        this.pageLimit = 2;
        this.pageIndex = 5;
        this.page = [];
        this.first = 1 ;
        this.last = 1;
    }
    onUpdataPage(data){
        this.pagetotal = data.pagetotal;
        this.pageNum = Math.ceil(this.pagetotal/this.pageLimit)
    }
    onUpdataFirstLast(data){
        this.first = data.first;
        this.last = data.last;
    }
    onUpdataPageCurrent(num){
        this.pageCurrent = num;
    }
    onPage(data){
        this.page = data;
    }

}

export default alt.createStore(HomeStore);