/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import './styles.css';

import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import Toggle from './Toggle';

import messages from './messages';
import { appLocales } from '../../i18n';

export class LocaleToggle extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Toggle
        value={this.props.locale}
        values={appLocales}
        messages={messages}
        onToggle={this.props.onLocaleToggle}
      />
    );
  }
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectLocale(), locale => ({
  locale,
}));

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: evt => dispatch(changeLocale(evt.target.value)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
