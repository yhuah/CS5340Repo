import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import React from 'react';


const Header =() => {

    return (<AppBar position="static">
        <Toolbar>
            <Typography variant="headline">
                CS5340 Demo
            </Typography>
        </Toolbar>
    </AppBar>

    )


}

export default Header;
