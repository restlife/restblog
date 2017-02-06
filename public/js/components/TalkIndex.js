/**
 * Created by cds on 2017/2/4.
 */

import React from 'react';
import Home from './Home';

class TalkIndex extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <Home pageKind={'1'} />
            </div>
        );
    }
}

export default TalkIndex;