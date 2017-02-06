/**
 * Created by cds on 2017/1/17.
 */
import alt from '../alt';
import SubArticleActions from '../Actions/SubArticleActions'

class SubArticleStore{
    constructor(){
        this.bindActions(SubArticleActions);
        this.name='';
        this.content='';
        this.kind='1';

    }
    onUpdateName(e){
        var name = e.target.value;
        if(name !=""){
            this.name = name;
        }

    }
    onUpdataContent(e){
        var content = e.target.value;
        if(content != ""){
            this.content = content;
        }

    }
    onUpdataSelect(e){
        var select = e.target.value;
        this.kind=select;
    }
}

export default alt.createStore(SubArticleStore);