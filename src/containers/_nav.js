// import React from 'react'
// import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    // icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    icon: "cil-speedometer",

  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['ZONES']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'All Zones',
    to: '/zones',
    icon: 'cil-location-pin',
  },
  
]

export default _nav
