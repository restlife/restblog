/**
 * Created by cds on 2017/1/17.
 */
import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../Stores/HomeStore';
import HomeActions from '../Actions/HomeActions';
import ArtOperate from './ArtOperate';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = HomeStore.getState();
        this.onChange = this.onChange.bind(this);
    }
    componentDidMount(){
        HomeStore.listen(this.onChange);
        this.changePage('1');
    }
    componentWillUnmount(){
        HomeStore.unlisten(this.onChange);
    }
    onChange(state){
        this.setState(state);
    }
    changePage(pageCurrent){
        var _this=this;
        var pageKind = this.props.pageKind;
        HomeActions.updataPageCurrent(parseInt(pageCurrent));
        setTimeout(function(){
        $.ajax({
            url:'/homePage',
            type:'POST',
            data:{
                limit : _this.state.pageLimit,
                pageNum :  _this.state.pageCurrent-1,
                kind : pageKind
            },
            success:function(data){
                var pageAll = data.count;
                var first ,last,pageCurrent = _this.state.pageCurrent,pageIndex = _this.state.pageIndex,pageTotal = Math.ceil(pageAll/_this.state.pageLimit);
                if(pageTotal<= pageIndex){
                    first = 1;
                    last = pageTotal;
                }else{
                    if((pageCurrent+Math.ceil(pageIndex/2))>=pageTotal){
                        last =  pageTotal;
                        first = last - pageIndex  ;
                    }else{
                        if((pageCurrent - Math.ceil(pageIndex/2))<=0){
                            first = 1;
                            last = pageIndex;
                        }else{
                            first = pageCurrent - Math.floor(pageIndex/2);
                            last  = pageCurrent +Math.floor(pageIndex/2);
                        }

                    }
                }
                var pageFirstLast = {
                    first : first,
                    last : last
                }
                HomeActions.updataFirstLast(pageFirstLast);
                HomeActions.page(data.data);
            }
          })
        },1);
    }

    render() {
            let articleNum=[];
            var _this=this;
            for(var i = this.state.first;i<= this.state.last;i++){
                if(i==this.state.first){
                    articleNum.push(<li  onClick={this.changePage.bind(this,i)} ><a >&laquo;</a></li>);
                }
                articleNum.push(<li><a onClick={this.changePage.bind(this,i)}>{i}</a></li>);
                if(i==this.state.last){
                    articleNum.push(<li  onClick={this.changePage.bind(this,i)} ><a >&raquo;</a></li>);
                }
            }
            let articleList = this.state.page.map((article,index)=>{
                return (
                    <div className="article-list">
                        <p className="article-tit"><a>{article.title}</a></p>
                        <div className="article-message">
                            <div className="icon-font-content" >
                                <i className="icon-user"></i>
                                <span className="article-author">{article.author}</span>
                            </div>
                            <div className="icon-font-content">
                                <i className="icon-clock2"></i>
                                <span className="article-author">{article.time}</span>
                            </div>
                        </div>
                        <div className="article-stage">
                            {article.content}
                        </div>
                      <div>
                           <ArtOperate changePage={this.changePage.bind(this,_this.state.pageCurrent)} good={article.good} look={article.look} index={index} id={article._id}  />
                        </div>

                    </div>
                )
            });

        return(
            <div className="home-content clearfix">
                <div className="pull-left home-left">
                    <section className="article-content">
                        {articleList}
                    </section>
                    <nav>
                        <ul className="pagination">
                            {articleNum}
                        </ul>
                    </nav>
                </div>
                <div className="pull-left home-right">
                </div>
            </div>
        );
    }
};

export default Home;