import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import React, { useState } from "react";

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(',')
            .map((value) => value.trim())
            .filter((value) => value !== '')
        }
      />
    </Box>
  );
}

// useEffect(() => {
//   setRows(data);
// }, [data])
// const handleOnCellClick = (params) => {
//   console.log("OnCellClick: ", params.row)
//   onClick(params.row);
// }


function DataGridBase({ rows, columns, onClick, pageName }) {

  // const [rows, setRows] = useState(data || []);
  const [pageSize, setPageSize] = useState(5);

  return (
    <Box sx={{
      height: 600,
      width: '95%',
      m: 2,
    }}>
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
        {pageName}
      </Typography>

      <DataGrid
        columns={columns}
        rows={rows}
        rowCount={rows.length}
        getRowId={(row) => row.id}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        // slots={{ toolbar: QuickSearchToolbar }}
        components={{
          Toolbar: QuickSearchToolbar,
        }}

      // pageSizeOptions={[5, 10, 25]}
      // renderRow={(params) => (
      //   <GridRow {...params} key={params.id} />
      // )}
      // pageSize={pageSize || 10}
      // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}

      // getRowId={(row) => row.key}
      // loading={loopLoading}
      // onPageChage={(newPage) => setPageState(newPage)}
      // experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>

  );
}


export default DataGridBase;
