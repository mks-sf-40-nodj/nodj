import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectJob, fetchYelp } from '../actions/index';
import JobItem from '../components/job_item_component';


class JobList extends Component {
  constructor(props) {
    super(props);

    this.jobFunc = this.jobFunc.bind(this);
  }

  jobFunc(job) {
    this.props.selectJob(job);
    this.props.fetchYelp(job.city, job.latitude, job.longitude);
  }

  renderList() {
    return this.props.jobs.map((job) => {
      return (
        <JobItem
          key={job.jobkey}
          jobFunc={this.jobFunc}
          job={job} />
      );
    });
  }

  render() {
    return (
      <div className="">
        <strong>Select A Job!</strong>
        <ul className="job-list">
          { this.renderList() }
        </ul>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    jobs: state.jobs
  };
}

// Anything returned from this function will end up as props on Joblist container
// We now have an action thats going to change the state of our DOM. We need to 
// notify all containers of the action that can be triggered
function mapDispatchToProps(dispatch) {
  // Whenever loadJobs is called, the result should be passed to all reducers
  return bindActionCreators({ selectJob: selectJob , fetchYelp: fetchYelp}, dispatch)
}

// Promote JobList to a container
export default connect(mapStateToProps, mapDispatchToProps)(JobList);
