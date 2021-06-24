import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import '../styles/card.css'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import SearchIcon from '@material-ui/icons/Search';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  }));

const Cards = ({data}) => {
    
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [sort, setSort] = useState({currentSort: 'default'})
    const [allData, setAllData] = useState({})

    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }
        setOpen(false);
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        }
    }

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const onSearch = (e) => {
        let value = e.target.value.toLowerCase();
        let result = [];
        console.log(value)

        result = data.filter((dt) => {
            return dt.name.toLowerCase().search(value) !== -1;
        });

        setAllData(result)
    }

    const sortTypes = {
        up: {
            class: 'sort-up',
            fn: (a, b) => a.sell_price - b.sell_price
        },
        down: {
            class: 'sort-down',
            fn: (a, b) => b.sell_price - a.sell_price
        },
        default: {
            class: 'sort',
            fn: (a, b) => a
        }
    };

    const onSortUp = () => {
        setSort({
            currentSort : 'down'
        })
    }

    const onSortDown = () => {
        setSort({
            currentSort : 'up'
        })
    }

    const onSortdDefault = () => {
        setSort({
            currentSort : 'default'
        })
    }
    
    return (
        <div className="cards">
            <div className="topbar">
                <div className="container">
                    <div className="divide">
                        <div className="dv-left">
                            <div className="search">
                                <input type="text" className="search-bar" placeholder="Search product..." onChange={onSearch}/>
                                <span className="search-icon"><SearchIcon/> </span>
                            </div>
                        </div>
                        <div className="dv-right">
                            <div className={classes.root}>
                                <div>
                                    <Button
                                    ref={anchorRef}
                                    aria-controls={open ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                    >
                                    Sort Product <ExpandMoreIcon/>
                                    </Button>
                                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                <MenuItem onClick={onSortdDefault}><MenuIcon/>  Default</MenuItem>
                                                <MenuItem onClick={onSortDown}><TrendingDownIcon/>  Lowest Price</MenuItem>
                                                <MenuItem onClick={onSortUp}><TrendingUpIcon/>  Highest Price</MenuItem>
                                            </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                        </Grow>
                                    )}
                                    </Popper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
            { (allData.length > 0) ? [...allData].sort(sortTypes[sort.currentSort].fn).map((d, index) => {
                return(
                    <div key={index} className="line-item column">
                        <Card 
                            image={d.SpreeProductImages}
                            name={d.name}
                            store={d.SpreeStore.store_name}
                            price={d.sell_price}
                            measure={d.unit_measure}
                        />
                    </div>
                )
            }) : 
            (data.length > 0) ? [...data].sort(sortTypes[sort.currentSort].fn).map((d, index) => {
                return(
                        <div key={index} className="line-item column">
                        <Card 
                            image={d.SpreeProductImages}
                            name={d.name}
                            store={d.SpreeStore.store_name}
                            price={d.sell_price}
                            measure={d.unit_measure}
                        />
                    </div>                   
                )
            }): <span>Loading...</span>}
            </div>    
        </div>
    )
}

export default Cards
