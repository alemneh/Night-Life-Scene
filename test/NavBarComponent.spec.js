import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai'

import NavBarComponent from '../src/client/app/components/NavBarComponent/NavBarComponent';

var wrapper;

describe('<NavBarComponent />', () => {
  beforeEach(() => {
    wrapper = shallow(<NavBarComponent />);
  });

  it('should have a form', () => {
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('should have input for username and password', () => {
    expect(wrapper.find('input')).to.have.length(2);
  });

  it('should have inital state of isLoggedIn', () => {
    expect(wrapper.state().isLoggedIn).to.equal(false);

  });

  it('should have an inital error state', () => {
    expect(wrapper.state().error).to.equal(null);
  });

  it('should have an inital token state', () => {
    expect(wrapper.state().token).to.equal('');
  });

  it('should have an inital user state', () => {
    expect(wrapper.state().user).to.equal('');
  });

});
