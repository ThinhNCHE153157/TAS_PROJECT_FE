import { Typography, IconButton, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbarQuickFilter, GridToolbarContainer } from "@mui/x-data-grid";
import React, { useState } from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // Thêm dòng này
        marginLeft: 2
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
      <IconButton
        color="primary"
        size="small"
        onClick={() => {
          // Đặt hành động khi nhấn nút "Add" ở đây
        }}
      >
        <PersonAddIcon />
        <Typography variant="body2" sx={{ marginLeft: 1, marginRight: 5 }}>
          Thêm user
        </Typography>
      </IconButton>
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

      <DataGrid
        columns={columns}
        rows={rows}
        rowCount={rows.length}
        getRowId={(row) => row.id}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        // components={{
        //   Toolbar: GridToolbarContainer,
        // }}
        // componentsProps={{
        //   toolbar: {
        //     Toolbar: QuickSearchToolbar,
        //   },
        // }}
        slots={{ toolbar: QuickSearchToolbar }}
      // components={{
      //   Toolbar: QuickSearchToolbar,
      // }}
      />
    </Box>

  );
}


export default DataGridBase;
