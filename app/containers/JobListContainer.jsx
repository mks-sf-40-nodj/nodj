'use strict';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import JobItem from '../components/JobItem';
import BaseComponent from '../components/BaseComponent';
import {
  selectJob,
  fetchCompanyData,
  fetchYelp,
  fetchBus,
  fetchTrains,
  fetchParks,
  fetchGyms,
  scrapeDetail,
  loading,
  activeJob
} from '../actions/index';


class JobList extends BaseComponent {
  constructor(props) {
    super(props);
    this.setActive = this.setActive.bind(this);
    this.jobFunc = this.jobFunc.bind(this);
    this.getData = this.getData.bind(this);
    this.init = 0;
  }

  // Handles delegation of the appropriate `className` values of jobs such that the currently
  //  active job (`activeJob`) has an additional class of `.active`:
  setActive(job) {
    return `${job === this.props.activeJob ? 'active ' : ''}jobLI`;
  }

  // Cues loading animation and a debounced query to the Indeed API for relevant job postings:
  jobFunc(job) {
    this.props.loading(true);
    _.debounce(this.getData, 200)(job);
  }

  //
  renderJobPostings(jobsArr) {
    return jobsArr.map((job, index) =>
      <JobItem
        key={ job.jobkey }
        setActive={ this.setActive }
        jobFunc={ this.jobFunc }
        job={ job }
        defaultToActive={ index === 0 ? true : false } />
    );
  }

  //
  renderEmptyResponseFallback() {
    return (
      <div className="noResultsShown">
        <h4 className="noResultsShown">No Results At This Time</h4>
      </div>
    );
  }

  //
  renderLoadingAnimation() {
    return (
      <div id="placesContainer">
        {[
          <i
            className="fa fa-refresh fa-spin fa-5x fa-fw loadingSpinner"
            key="RefreshAnimation" />,
          `\tLoading...`
        ]}
      </div>
    );
  }

  // Collectively calls the lot of Redux action creators imported above:
  getData(job) {
    let props = this.props;

    props.selectJob(job);
    props.fetchCompanyData(job.company);
    props.fetchYelp(job.city, job.latitude, job.longitude);

    [props.fetchTrains, props.fetchBus, props.fetchParks, props.fetchGyms]
      .forEach(action => action(job.latitude, job.longitude));

    props.scrapeDetail(job.url);
    props.loading(false);
  }

  renderList() {
    let jobList;
    if (this.props.jobs.length) {
      jobList = this.props.jobs.map((job, index) =>
        <JobItem
          key={ job.jobkey }
          setActive={ this.setActive }
          jobFunc={ this.jobFunc }
          job={ job }
          defaultToActive={ index === 0 ? true : false } />
      );
    } else {
      this.init
        ? jobList =
          <div className="noResultsShown">
            <h4 className="noResultsShown">No Results At This Time</h4>
          </div>
        : (this.init++, jobList =
          <div id="placesContainer">
            {[
              <i
                className="fa fa-refresh fa-spin fa-5x fa-fw loadingSpinner"
                key="RefreshAnimation" />,
              `\tLoading...`
            ]}
          </div>
        )
    }
    return jobList;
  }

  render() {
    return (
      <div
        id="jobsContainer"
        className="jobsPaneLeft appCols">
        <strong>
          {[
            `Results for `,
            <i key="jobTermTitle">{ this.props.lastJob }</i>,
            ` in `,
            <i key="locationTermTitle">
              { this.props.lastLocation.replace(/(\w+),.*/gmi, `$1`) }
            </i>
          ]}
        </strong>
        <div>
          <ul className="jobs-list">{ this.renderList() }</ul>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  jobs: state.jobs,
  activeJob: state.activeJob,
  jobTerm: state.jobInputTerm,
  lastJob: state.lastJob,
  locationTerm: state.locationInputTerm,
  lastLocation: state.lastLocation
});

let mapDispatchToProps = (dispatch) => bindActionCreators({
  selectJob,
  fetchCompanyData,
  fetchYelp,
  fetchBus,
  fetchTrains,
  fetchParks,
  fetchGyms,
  scrapeDetail,
  loading
}, dispatch);

// Promote JobList to a Container:
export default connect(mapStateToProps, mapDispatchToProps)(JobList);