/**
 * Created by cds on 2017/1/11.
 */
import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../Stores/NavbarStore';
import NavbarActions from '../Actions/NavbarActions';

class Navbar extends React.Component{
    constructor(props){
        super(props);
         this.state = NavbarStore.getState();
        console.log(this.state);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        NavbarStore.listen(this.onChange);
       window.NavbarS1=NavbarActions;
        NavbarActions.getCharacterCount();

        var socket = io.connect();
        socket.on('onlineUsers', (data) => {
           NavbarActions.updateOnlineUsers(data);
        })
    }
    componentWillUnmount(){
         NavbarStore.unlisten(this.onChange);
    }
    onChange(state){
        this.setState(state);
    }
    render(){
        return (
                <nav className='navbar navbar-default navbar-static-top'>
                  <div className='navbar-content'>
                    <div className='navbar-header'>
                        <Link to='/' className='navbar-brand'>
                            RESTLIFE
                            <span className='badge badge-up badge-danger'>{this.state.onlineUsers}</span>
                        </Link>
                    </div>
                    <div id='navbar' className='navbar-collapse collapse'>
                        <ul className='nav navbar-nav pull-right'>
                            <li><Link to='/talk'>杂谈</Link></li>
                            <li><Link to='/skill'>skill</Link></li>
                            <li><Link to='/about'>关于我</Link></li>
                        </ul>
                    </div>
                  </div>
                </nav>
        )
    }
}

export default Navbar;