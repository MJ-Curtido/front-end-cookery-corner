import * as React from 'react';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CSS from './UserTab.module.css';
import { Tab, Tabs } from '@mui/material';

const TabsBottomNavExample = ({ onOrderByValuation, onOrderByDate }) => {
    const [index, setIndex] = React.useState(0);

    const tabHandler = (event, value) => {
        setIndex(value);

        if (value === 0) {
            onOrderByValuation();
        } else {
            onOrderByDate();
        }
    };

    return (
        <Tabs
            className={CSS.container}
            aria-label="Tab Order By"
            value={index}
            onChange={tabHandler}
        >
            <Tab icon={<LunchDiningIcon />} label="Valuation" className={CSS.tab} />
            <Tab icon={<WatchLaterIcon />} label="Date" className={CSS.tab} />
        </Tabs>
    );
};

export default TabsBottomNavExample;
