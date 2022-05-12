import { ReactComponent as GlobalIcon } from '../../../assets/Globe.svg';
/* eslint react/prop-types: 0 */
import React from 'react';
export const SideBarData = [
  {
    link: '/questions',
    icon: <GlobalIcon className='icon' />,
    text: 'Questions',
  },
  {
    link: '/tags',
    text: 'Tags',
  },
  {
    link: '/allusers',
    text: 'Users',
  },
  {
    link: '/jobs',
    text: 'Jobs',
  }
]