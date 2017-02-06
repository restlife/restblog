/**
 * Created by cds on 2017/2/4.
 */

import React from 'react';
import Home from './Home';

class SkillIndex extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <Home pageKind={'2'} />
            </div>
        );
    }
}

export default SkillIndex;