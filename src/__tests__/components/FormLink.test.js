import { shallow } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import FormLink from '../../components/FormLink';

describe('form link component tests', () => {
  test('should render DrawerMenu correctly', () => {
    const wrapper = shallow(<FormLink linkText="test" onClick={() => {}} classLink="myClass" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
