/**
 * Created by Administrator on 2017/2/3.
 */

import React from 'react';
import ArtOperateStore from '../Stores/ArtOperateStore';
import ArtOperateActions from '../Actions/ArtOperateActions';

class ArtOperate extends React.Component {
    constructor(props) {
        super(props);
        this.state = ArtOperateStore.getState();
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount(){
        ArtOperateStore.listen(this.onChange);
        var _this = this ;
        setTimeout(function(){
            ArtOperateActions.updataGood(_this.props.good);
            ArtOperateActions.updataLook(_this.props.look);
        },1);

    }
    componentWillUnmount(){
        ArtOperateStore.unlisten(this.onChange);
    }
    onChange(state){
        this.setState(state);
    }
    addGood(index){
        var nodeId=$("#chooseId"+index).attr('data-id');
        var _this = this;
        $.ajax({
            url:"/addGood",
            type:'POST',
            data:{
                nodeId :nodeId
            },
            success:function(){
                console.log(_this.props.index);
                _this.props.changePage();
            }
        })
    }
    render() {
        return(
            <div className="article-operate" data-id={this.props.id} id={"chooseId"+this.props.index } >
                <div className="icon-font-content" onClick={this.addGood.bind(this,this.props.index)}>
                    <i className="icon-like"></i>
                    <span>{this.props.good}</span>
                </div>
                <div className="icon-font-content">
                    <i className="icon-eye"></i>
                    <span>{this.props.look}</span>
                </div>
            </div>
        )
    }
}

export default ArtOperate;