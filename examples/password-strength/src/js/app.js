import React from "react";
import ReactDOM from "react-dom";
import {Grid, Row, Col} from "react-bootstrap";

import PasswordField from "./password_field";
import StrengthMeter from "./strength_meter";

class PasswordInput extends React.Component {
  render() { 
    return (
        <Grid>
          <Row>
            <Col md={8}>
              <PasswordField />
            </Col>
            <Col md={4}>
              <StrengthMeter />
            </Col>
          </Row>
        </Grid>
    );
  }
}

ReactDOM.render(
  <PasswordInput />,
  document.getElementById('app')
);
