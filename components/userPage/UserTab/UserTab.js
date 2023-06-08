import * as React from 'react';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import CSS from './UserTab.module.css';

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
            size="lg"
            aria-label="Bottom Navigation"
            value={index}
            onChange={(event, value) => tabHandler(event, value)}
            sx={(theme) => ({
                borderRadius: 'xl',
                maxWidth: 400,
                mx: 'auto',
                boxShadow: theme.shadow.sm,
                '--Tabs-gap': '8px',
                '--joy-shadowChannel': theme.vars.palette['info'].darkChannel,
                [`& .${tabClasses.root}`]: {
                    boxShadow: 'none',
                    borderRadius: 'lg',
                    whiteSpace: 'nowrap',
                    transition: '0.3s',
                    fontWeight: 'lg',
                    flex: 1,
                    [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                        opacity: 0.72,
                    },
                },
            })}
        >
            <TabList variant="plain" sx={{ '--ListItemDecorator-size': '28px' }}>
                <Tab className={CSS.tab} orientation="vertical" {...(index === 0 && { variant: 'soft', color: 'info' })}>
                    <ListItemDecorator>
                        <LunchDiningIcon />
                    </ListItemDecorator>
                    Valuation
                </Tab>
                <Tab className={CSS.tab} orientation="vertical" {...(index === 1 && { variant: 'soft', color: 'info' })}>
                    <ListItemDecorator>
                        <WatchLaterIcon />
                    </ListItemDecorator>
                    Date
                </Tab>
            </TabList>
        </Tabs>
    );
};

export default TabsBottomNavExample;
