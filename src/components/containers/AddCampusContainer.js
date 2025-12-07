/*==================================================
AddCampusContainer.js

Container for adding a new campus.
Holds form state and connects AddCampusView to Redux.
================================================== */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Header from "./Header";
import AddCampusView from "../views/AddCampusView";
import { addCampusThunk } from "../../store/thunks";

class AddCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
    };
  }

  // Handle input changes
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  handleSubmit = async (event) => {
    event.preventDefault();

    if (!this.state.name.trim() || !this.state.address.trim()) {
      alert("Name and address are required.");
      return;
    }

    // Dispatch thunk to add campus
    await this.props.addCampus({ ...this.state });

    // Redirect to All Campuses
    this.props.history.push("/campuses");
  };

  render() {
    return (
      <div>
        <Header />
        <AddCampusView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

AddCampusContainer.propTypes = {
  addCampus: PropTypes.func.isRequired,
};

const mapDispatch = (dispatch) => {
  return {
    addCampus: (campus) => dispatch(addCampusThunk(campus)),
  };
};

export default connect(null, mapDispatch)(AddCampusContainer);
