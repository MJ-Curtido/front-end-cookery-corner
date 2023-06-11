//#region Imports
import React, { useState } from 'react';
import CSS from './SelectSteps.module.css';
import { Alert, Box, Card, IconButton, List, ListItem, ListItemIcon, ListItemText, Snackbar, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
//#endregion

const SelectSteps = ({ steps, setSteps }) => {
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [severitySnackbar, setSeveritySnackbar] = useState('success');
    const [text, setText] = useState('');

    //#region Functions
    const handleSubmit = (e) => {
        e.preventDefault();

        if (text !== '') {
            setSteps([...steps, text]);

            setText('');
        } else {
            setMessageSnackbar('You have to complete the fields.');
            setSeveritySnackbar('error');
            setOpenSnackbar(true);
        }
    };

    const handleRemoveStep = (index) => {
        const updatedSteps = [...steps];
        updatedSteps.splice(index, 1);
        setSteps(updatedSteps);
    };
    //#endregion

    return (
        <>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert severity={severitySnackbar}>{messageSnackbar}</Alert>
            </Snackbar>

            <div className={CSS.container}>
                <TextField
                    value={text}
                    required
                    className={CSS.input}
                    label="Name"
                    variant="outlined"
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                />

                <IconButton className={CSS.button} aria-label="add" color="secondary" onClick={handleSubmit}>
                    <AddCircleIcon />
                </IconButton>
            </div>

            <Card className={CSS.containerList} variant="outlined">
                <List className={CSS.list}>
                    {steps.map((step, index) => (
                        <Box key={index} className={CSS.listItemWrapper}>
                            <ListItem className={CSS.listItem}>
                                <ListItemText
                                    primary={index + 1 + '. ' + step}
                                    secondary={
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveStep(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                />
                            </ListItem>
                        </Box>
                    ))}
                </List>
            </Card>
        </>
    );
};

export default SelectSteps;
