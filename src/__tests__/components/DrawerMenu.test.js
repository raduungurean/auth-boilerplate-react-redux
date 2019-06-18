import React from 'react';
import { shallow } from 'enzyme';
import { DrawerMenu } from '../../components/DrawerMenu';
import menuItems from '../../services/menuItems';
import toJson from 'enzyme-to-json';

describe('drawer comp tests', () => {
  test('should render DrawerMenu correctly', () => {
    const wrapper = shallow(<DrawerMenu
      expanded={false}
      classes={{ toolbar: '' }}
      theme={{ theme: { direction: '' } }}
      toggleDrawer={() => {}}
      menuItems={menuItems}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
