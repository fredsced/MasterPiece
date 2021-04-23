import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Popover,
  Typography,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  row: {
    width: '100%',
    cursor: 'pointer',
    margin: theme.spacing(1),
  },
  paper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4, 3),
    margin: theme.spacing(4),
  },
  typography: {
    padding: theme.spacing(1, 2),
  },
  typographyTitle: {
    padding: theme.spacing(1, 2),
    fontWeight: 900,
  },
  active: {
    width: '100%',
    cursor: 'pointer',
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light2,
  },
}));

export default function ListComplianceReferents({ myCR }) {
  const [rowId, setRowId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleClick = (event, id) => {
    setRowId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setRowId(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Typography component='p' className={classes.typographyTitle}>
          {myCR && myCR[rowId] && myCR[rowId].firstname}{' '}
          {myCR && myCR[rowId] && myCR[rowId].lastname}
        </Typography>
        <Typography component='p' className={classes.typography}>
          {myCR && myCR[rowId] && myCR[rowId].email}
        </Typography>
        <Typography component='p' className={classes.typography}>
          {'Tel : '}
          {myCR && myCR[rowId] && myCR[rowId].phone}
        </Typography>
        <Typography
          component='p'
          variant='subtitle1'
          className={classes.typography}
        >
          {'Level : '}
          {myCR && myCR[rowId] && myCR[rowId].level}
        </Typography>
        <Typography
          component='p'
          variant='subtitle1'
          className={classes.typography}
        >
          {'SesameId : '}
          {myCR && myCR[rowId] && myCR[rowId].sesame}
        </Typography>
      </Popover>
      <TableContainer>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <FormattedMessage id='firstname' defaultMessage='Firstname' />
              </TableCell>
              <TableCell align='center'>
                <FormattedMessage id='lastname' defaultMessage='Lastname' />
              </TableCell>
              <TableCell align='center'>
                <FormattedMessage id='country' defaultMessage='Country' />
              </TableCell>
              <TableCell align='center'>
                <FormattedMessage id='Org.Unit.' defaultMessage='Org.Unit.' />
              </TableCell>
              <TableCell align='center'>
                <FormattedMessage id='Risk' defaultMessage='Risk' />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myCR.map((row, id) => (
              <TableRow
                className={rowId === id ? classes.active : classes.row}
                key={id}
                onClick={(event) => handleClick(event, id)}
              >
                <TableCell key={row.firstname + id} align='center'>
                  {row.firstname}
                </TableCell>
                <TableCell key={row.lastname + id} align='center'>
                  {row.lastname}
                </TableCell>
                <TableCell key={row.country + id} align='center'>
                  {row.country}
                </TableCell>
                <TableCell key={row.buCode + id} align='center'>
                  {row.buCode}
                </TableCell>
                <TableCell key={row.riskCode + id} align='center'>
                  {
                    <FormattedMessage
                      id={row.riskCode}
                      defaultMessage={row.riskCode}
                    />
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
ListComplianceReferents.propTypes = {
  myCR: PropTypes.arrayOf(Object),
};
