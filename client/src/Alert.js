import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert as AlertComp } from "@mui/material"
const Alert = ({ alerts }) => {

  return (
    <>
      {console.log(alerts)}
      {alerts.map((alert, i) => (
        <> <AlertComp variant="filled" severity={alert.alertType} style={{margin: '5px'}} key={i}>{alert.msg}</AlertComp> </>
      ))}
    </>
  )
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
