import React, { useState } from 'react'
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import MenuItem from '@mui/icons-material/Menu'
const DrawerComponent = () => {
  const [openDrawer, setopenDrawer] = useState(false)
  const Pages = ['Home', 'About', 'Resourses', 'Contact', 'Login', 'Get started']
  return (
    <React.Fragment>
      <Drawer open={openDrawer}
        onClose={() => setopenDrawer(false)}
      >
        <List>
          {
            Pages.map((page, index) => (
              <ListItemButton onClick={() => setopenDrawer(false)} value={index} key={index}>
                <ListItemIcon>
                  <ListItemText>{page}</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            ))
          }

        </List>
      </Drawer>
      <IconButton sx={{ color: 'black', marginLeft: 'auto' }} onClick={() => setopenDrawer(!openDrawer)}>
        <MenuItem />
      </IconButton>
    </React.Fragment>
  )
}

export default DrawerComponent