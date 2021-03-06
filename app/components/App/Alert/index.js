/**
 *
 * Alert
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

// Import Material UI
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { FormattedMessage } from 'react-intl';
import {
  makeOpenAlertSelector,
  makeCurrencyIdSelector,
} from 'containers/SettingsPage/selectors';
import {
  toggleAlertCurrencyAction,
  enterNewCurrencyAction,
} from 'containers/SettingsPage/actions';
import messages from './messages';

const styles = () => ({
  dialogActionsRoot: {
    margin: '12px 12px',
  },
  dialogContentRoot: {
    padding: '0px 24px 0px',
  },
  dialogTitleRoot: {
    padding: '24px 24px 12px',
  },
});
/* eslint-disable react/prefer-stateless-function */
class Alert extends Component {
  constructor(props) {
    super(props);

    this.enterCurrency = this.enterCurrency.bind(this);
  }

  enterCurrency() {
    this.props.enterNewCurrency(this.props.currencyId);
  }

  render() {
    const { classes, openAlert, onCurrencyToggle } = this.props;
    return (
      <Dialog
        open={openAlert}
        onClose={onCurrencyToggle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          classes={{ root: classes.dialogTitleRoot }}
          id="alert-dialog-title"
        >
          <FormattedMessage {...messages.contentTitle} />
        </DialogTitle>
        <DialogContent classes={{ root: classes.dialogContentRoot }}>
          <DialogContentText id="alert-dialog-description">
            <FormattedMessage {...messages.contentAlert} />
          </DialogContentText>
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActionsRoot }}>
          <Button color="primary" onClick={onCurrencyToggle}>
            <FormattedMessage {...messages.disagree} />
          </Button>
          <Button color="primary" onClick={this.enterCurrency} autoFocus>
            <FormattedMessage {...messages.agree} />
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Alert.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  openAlert: makeOpenAlertSelector(),
  currencyId: makeCurrencyIdSelector(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onCurrencyToggle: () => dispatch(toggleAlertCurrencyAction()),
    enterNewCurrency: currencyId =>
      dispatch(enterNewCurrencyAction(currencyId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  withConnect,
)(Alert);
