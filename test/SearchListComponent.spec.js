import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import SearchListComponent from '../src/client/app/components/SearchListComponent/SearchListComponent';
import ListItemComponent   from '../src/client/app/components/ListItemComponent/ListItemComponent';

var wrapper;

describe('<SearchListComponent />', () => {
  beforeEach(() => {
    wrapper = shallow(<SearchListComponent />);
  });

  it('should have an input', () => {
    expect(wrapper.find('input')).to.have.length(1);
  });

  it('should have a button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('should have inital businesses state', () => {
    expect(wrapper.state().businesses).to.have.length(0);
  });

  it('should have inital receivedBussiness state', () => {
    expect(wrapper.state().receivedBussiness).to.equal(false);
  });

  it('should have inital searchLoading state', () => {
    expect(wrapper.state().searchLoading).to.equal(false);
  });

  it('should have inital bookings state', () => {
    expect(wrapper.state().bookings).to.have.length(0);
  });
})
