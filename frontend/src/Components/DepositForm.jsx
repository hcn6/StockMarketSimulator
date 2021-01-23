import React, { useState, useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { TransactionContext, StockPriceContext, DepositContext } from './Layout'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const DepositForm = (props) => {
    const classes = useStyles();
    const [deposit, setDeposit] = useState('');
    const newDeposit = useContext(DepositContext).handleDepositChange
    const handleDepositChange = e => setDeposit(e.target.value);

    const handleSubmit = async e => {
        e.preventDefault()
        const data = {
            "amount": deposit,
            "date": Date.now()
        }
        setDeposit('')
        newDeposit(data)
    }
    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormControl>
                <InputLabel> Amount</InputLabel>
                <Input id="outlined-basic" onChange={handleDepositChange} value={deposit} />
            </FormControl>
            <Button type='submit' variant="contained" color="primary" onSubmit={handleSubmit}>
                Submit
            </Button>
        </form>
    );
}
export default DepositForm