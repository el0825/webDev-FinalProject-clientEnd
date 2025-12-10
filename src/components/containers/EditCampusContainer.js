/*==================================================
EditCampusContainer.js

Container for editing an existing campus.
================================================== */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Header from "./Header";
import EditCampusView from "../views/EditCampusView";
import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";

class EditCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      loadedFromCampus: false,
      redirect: false,
      redirectId: null,
    };
  }

  componentDidMount() {
    const campusId = this.props.match.params.id;
    this.props.fetchCampus(campusId);
  }

  componentDidUpdate(prevProps) {
    // When campus data finishes loading, copy it into local state once
    if (
      this.props.campus &&
      this.props.campus.id &&
      (!prevProps.campus || prevProps.campus.id !== this.props.campus.id) &&
      !this.state.loadedFromCampus
    ) {
      const { name, address, description, imageUrl } = this.props.campus;
      this.setState({
        name: name || "",
        address: address || "",
        description: description || "",
        imageUrl: imageUrl || "",
        loadedFromCampus: true,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { campus } = this.props;
    if (!campus || !campus.id) return;

    const updatedCampus = {
      id: campus.id,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
    };

    const result = await this.props.editCampus(updatedCampus);

    // after updating redux + DB, redirect to single campus view
    this.setState({
      redirect: true,
      redirectId: (result && result.id) || campus.id,
    });
  };

  render() {
    if (this.state.redirect && this.state.redirectId) {
      return <Redirect to={`/campus/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <Header />
        <EditCampusView
          campus={this.props.campus}
          formValues={this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);
