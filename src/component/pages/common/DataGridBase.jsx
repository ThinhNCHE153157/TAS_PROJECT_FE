import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import React, { useState } from "react";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginLeft: 2,
        width: '40%'
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </Box>
  );
}

function DataGridBase({ rows, columns, pageName }) {
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
      <Box sx={{ height: 50 }}>
        <IconButton color="primary"
          sx={{ marginLeft: 'auto' }}
        >
          <PersonAddAltIcon />
          <Typography variant="body1" sx={{ marginLeft: 1 }}>
            Thêm user
          </Typography></IconButton>
      </Box>
      <DataGrid
        columns={columns}
        rows={rows}
        rowCount={rows.length}
        getRowId={(row) => row.id}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        slots={{ toolbar: QuickSearchToolbar }}
      />
    </Box >

  );
}


export default DataGridBase;
