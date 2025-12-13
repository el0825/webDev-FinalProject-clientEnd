/*==================================================
EditStudentContainer.js

Container for editing an existing campus.
================================================== */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Header from "./Header";
import EditStudentView from "../views/EditStudentView";
import { fetchStudentThunk, editStudentThunk } from "../../store/thunks";

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: "",
      gpa: 0,
      campusId: "",
      loadedFromStudent: false,
      redirect: false,
      redirectId: null,
    };
  }

  componentDidMount() {
    const studentId = this.props.match.params.id;
    
    this.props.fetchStudent(studentId);

    if (this.props.student && this.props.student.id === Number(studentId)) {
      const { firstname, lastname, email, imageUrl, gpa,campusId } = this.props.student;
      this.setState({
        firstname: firstname || "",
        lastname: lastname || "",
        email: email || "",
        imageUrl: imageUrl || "",
        gpa: gpa || 0,
        campusId: campusId !== null && campusId !== undefined ? campusId : "",
        loadedFromStudent: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    // When student data finishes loading, copy it into local state once
    if (
      this.props.student &&
      this.props.student.id &&
      (!prevProps.student || prevProps.student.id !== this.props.student.id) &&
      !this.state.loadedFromStudent
    ) {
      const { firstname, lastname, email, imageUrl,gpa, campusId } = this.props.student;
      this.setState({
        firstname: firstname || "",
        lastname: lastname || "",
        email: email || "",
        imageUrl: imageUrl || "",
        gpa: gpa || 0,
        campusId: campusId !== null && campusId !== undefined ? String(campusId) : "",
        loadedFromStudent: true,
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

    const { student } = this.props;
    if (!student || !student.id) return;

    const updatedStudent = {
      id: student.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      imageUrl: this.state.imageUrl,
      gpa: this.state.gpa,
      campusId: this.state.campusId === "" ? null : Number(this.state.campusId),
    };

    const result = await this.props.editStudent(updatedStudent);

    // after updating redux + DB, redirect to single campus view
    this.setState({
      redirect: true,
      redirectId: (result && result.id) || student.id,
    });
  };

  render() {
    if (this.state.redirect && this.state.redirectId) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <Header />
        <EditStudentView
          student={this.props.student}
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
    student: state.student,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
  };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);
