import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import ListItemComponent   from '../src/client/app/components/ListItemComponent/ListItemComponent';

var wrapper;

describe('<ListItemComponent />', () => {
  beforeEach(() => {
    wrapper = shallow(<ListItemComponent />);
  });

  it('should have an image', () => {
    expect(wrapper.find('img')).to.have.length(1);
  });

  it('should have a button', () => {
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('should have inital going state', () => {
    expect(wrapper.state().going).to.equal(0);
  });

  it('should have inital isBooked state', () => {
    expect(wrapper.state().isBooked).to.equal(false);
  });

  it('should have inital token state', () => {
    expect(wrapper.state().error).to.equal(null);
  });

  it('should have inital error state', () => {
    expect(wrapper.state().error).to.equal(null);
  });

  it('should have inital user state', () => {
    expect(wrapper.state().user).to.equal(null);
  });
  
});
