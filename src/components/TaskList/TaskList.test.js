import React from 'react';
import { shallow } from 'enzyme';
import { TaskList } from './TaskList';
import TestUtils from 'react-dom/test-utils';

describe('<TaskList />', () => {

    it('renders', () => {
        const props = {
            tasks: [
                {
                    key: '01',
                    title: 'Task 1',
                    description: 'Task 1 description',
                    dueDate: '25/08/2021'    
                }
            ],
        }
        const wrapper = shallow(<TaskList {...props} />);
       expect(TestUtils.isCompositeComponent(wrapper)).toBeTruthy();
    });
});
