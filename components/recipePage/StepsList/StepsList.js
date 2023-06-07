//#region Imports
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import CSS from './StepsList.module.css';
//#endregion

const StepsList = ({ steps }) => {
    return (
        <div className={CSS.container}>
            <Typography className={CSS.title} variant="h3" align="center" gutterBottom>
                Steps
            </Typography>

            <List className={CSS.list}>
                {steps.map((step, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={
                                <Typography className={CSS.step} variant="h6" align="justify">
                                    {index + 1}. {step}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default StepsList;
