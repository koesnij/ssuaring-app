import React, { Fragment, Component } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { CheckBox } from 'react-native-elements';

class Checkbox extends Component {
  constructor(props) {
      super(props)
      this.state = {
          checked: this.props.checked
      }
  }

  handleOnPress = () => this.setState({checked: !this.state.checked})

  // Returns an enabled or disabled Checkbox depending on the value of this.props.disabled
  isDisabled = () => {
    if (this.props.disabled) {
      return (
        <CheckBox 
          Component={TouchableWithoutFeedback}
          size={this.props.size}
          title={"I'm a Checkbox"}
          iconRight={true}
        />
      )
    }
    return (
      <CheckBox 
        Component={TouchableOpacity}
        size={this.props.size}
        checked={this.state.checked} 
        onPress={this.handleOnPress}
        title={"I'm a Checkbox"}
        iconRight={true}
      />
    )
  }

  render() {
      return (
          <Fragment>
              {this.isDisabled()}
          </Fragment>
      )
  } 
}
export default Checkbox;