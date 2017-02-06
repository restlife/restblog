/**
 * Created by cds on 2017/1/17.
 */

import React from 'react';
import {Link} from 'react-router';
import SubArticleStore from '../Stores/SubArticleStore';
import SubArticleActions from '../Actions/SubArticleActions';
/*import Article from 'Article'*/

class SubArticle extends React.Component{
    constructor(props){
        super(props);
        this.state = SubArticleStore.getState();
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount(){
        SubArticleStore.listen(this.onChange);

    }
    componentWillUnmount(){
        SubArticleStore.unlisten(this.onChange);
    }
    onChange(state){
        this.setState(state);
    }
    handleSubmit(e){
        e.preventDefault();
        $.ajax({
            url:'/addArticle',
            type:'POST',
            data:{
                title:this.state.name,
                time : new Date().toLocaleDateString(),
                kind : this.state.kind,
                content : this.state.content
            },
            success:function(){
               alert('保存成功');
            }
        })
    }
    render() {
        return(
            <div className="home-content clearfix">
                <form role="form" onSubmit={ this.handleSubmit.bind(this) }>
                    <div className="form-group">
                        <label for="exampleInputEmail1">文章标题</label>
                        <input type="text" className="form-control" ref="InputTitle" placeholder="输入标题" value={this.state.name} onChange={SubArticleActions.updateName} />
                        </div>
                        <div className="form-group">
                            <label for="InputContent">文章内容</label>
                            <div>
                                <textarea class="form-control" rows="3" value={this.state.content} onChange={SubArticleActions.updataContent} ></textarea>
                            </div>
                        </div>
                        <select className="form-control" value={this.state.kind} onChange={SubArticleActions.updataSelect} >
                            <option value="1">杂谈</option>
                            <option value="2">skill</option>
                        </select>
                     <button type="submit" className="btn btn-default">提交</button>
             </form>
            </div>
        );
    }
};

export default SubArticle;