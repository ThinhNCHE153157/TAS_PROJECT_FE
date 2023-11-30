// import { Box, Typography } from '@mui/material'
// import { Table } from 'antd'
// import React from 'react'

// const TableAntdesign = ({
//   pageName,

// }) => {
//   return (
//     <Box sx={{
//       height: 600,
//       width: '95%',
//       m: 2,
//     }}>
//       <Typography
//         variant="h3"
//         component="h3"
//         sx={{ textAlign: 'center', mt: 3, mb: 3 }}
//       >
//         {pageName}
//       </Typography>
//       <Box sx={{ height: 50 }} />
//       <Table
//         columns={columns}
//         rows={rows}
//         rowCount={rows.length}
//         getRowId={(row) => row.id}
//         pageSize={pageSize}
//         onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//         rowsPerPageOptions={[5, 10, 20]}
//         pagination
//         slots={{ toolbar: QuickSearchToolbar }}
//       />
//     </Box>
//   )
// }

// export default TableAntdesign