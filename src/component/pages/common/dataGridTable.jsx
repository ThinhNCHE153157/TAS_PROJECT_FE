import Box from "@mui/material/Box";
import { DataGrid, GridToolbarQuickFilter } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react"


function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
}


function DataGridTable({ data, loopLoading, columns, onClick }) {
  // const initialRows = data.map((row) => ({
  //   kenh: row.KENH,
  //   ma_khoi: row.MA_KHOI,
  //   nv: row.NV,
  //   ma: row.MA,
  //   thong_bao: row.THONG_BAO,
  //   tc: row.TC || '',
  //   gio_hl: row.GIO_HL || '',
  //   ngay_hl: row.NGAY_HL || '',
  //   dkgh: row.DIEU_KIEN_GIOI_HAN || '',
  //   sott: row.SOTT,
  // }))

  const [rows, setRows] = useState(data || []);
  useEffect(() => {
    // setRows((prev) => ([...prev, initialRows]));
    setRows(data);
  }, [data])
  const handleOnCellClick = (params) => {
    console.log("OnCellClick: ", params.row)
    onClick(params.row);
  }

  // const deleteAction = React.useCallback(
  //   (params) => () => {

  //     setTimeout(() => {
  //       setRows((prevRows) => prevRows.filter((row) => row.id !== params.id))
  //     })
  //     const iData = {
  //       kenh: params.row.kenh,
  //       ma_khoi: params.row.ma_khoi,
  //       nv: params.row.nv,
  //       ma: params.row.ma,
  //       id: params.id
  //     }
  //     setCValue(prev => ({ ...prev, iData }));
  //     deleteRecord(iData)

  //   }, [])
  // useEffect(() => {
  //   setRows((prevRows) => prevRows.filter((row) => row.id !== cValue.id))
  // }, [cValue])

  // const dispatch = useDispatch();


  // const columns = React.useMemo(
  //   () => 
  // const columns =
  //   [
  //     {
  //       field: "kenh",
  //       headerName: "Kênh",
  //       flex: 2,
  //       sortable: false,
  //       disableColumnFilter: true,
  //       disableColumnMenu: true,
  //       disableColumnSelector: true,
  //       headerAlign: "center",
  //       hide: false,
  //       default: '',
  //     },
  //     {
  //       field: "ma_khoi",
  //       headerName: "Mã khối",
  //       flex: 3,
  //       sortable: false,
  //       disableColumnFilter: true,
  //       disableColumnMenu: true,
  //       disableColumnSelector: true,
  //       headerAlign: "center",
  //       hide: false,
  //       default: '',
  //     },
  //     {
  //       field: "nv",
  //       headerName: "Nghiệp vụ",
  //       flex: 3,
  //       sortable: false,
  //       disableColumnFilter: true,
  //       disableColumnMenu: true,
  //       disableColumnSelector: true,
  //       headerAlign: "center",
  //       hide: false,
  //       default: '',
  //     },
  //     {
  //       field: "ma",
  //       headerName: "Mã",
  //       flex: 2,
  //       sortable: false,
  //       disableColumnFilter: true,
  //       disableColumnMenu: true,
  //       disableColumnSelector: true,
  //       headerAlign: "center",
  //       hide: false,
  //       default: '',
  //     },
  //     {
  //       field: "thong_bao",
  //       headerName: "Thông báo",
  //       flex: 4,
  //       sortable: false,
  //       disableColumnFilter: true,
  //       disableColumnMenu: true,
  //       disableColumnSelector: true,
  //       headerAlign: "center",
  //       hide: false,
  //       default: '',
  //     },
  //     {
  //       field: "tc",
  //       headerName: "TC",
  //       flex: 1,
  //       sortable: false,
  //       disableColumnFilter: true,
  //       disableColumnMenu: true,
  //       disableColumnSelector: true,
  //       headerAlign: "center",
  //       hide: false,
  //       default: '',
  //     },
  //     {
  //       field: "gio_hl",
  //       headerName: "Giờ hiệu lực",
  //       flex: 2,
  //       sortable: false,
  //       disableColumnFilter: true,
  //       disableColumnMenu: true,
  //       disableColumnSelector: true,
  //       headerAlign: "center",
  //       hide: false,
  //       default: '',
  //     },
  //     {
  //       field: "ngay_hl",
  //       headerName: "Ngày hiệu lực",
  //       flex: 3,
  //       sortable: false,
  //       disableColumnFilter: true,
  //       disableColumnMenu: true,
  //       disableColumnSelector: true,
  //       headerAlign: "center",
  //       hide: false,
  //       default: '',
  //     },
  //     {
  //       field: "dkgh",
  //       headerName: "Điều kiện giới hạn",
  //       flex: 2,
  //       default: '',
  //       sortable: false,
  //       disableColumnFilter: true,
  //       disableColumnMenu: true,
  //       disableColumnSelector: true,
  //       headerAlign: "center",
  //       hide: false,
  //     },
  //     {
  //       field: 'actions',
  //       headerName: "Action",
  //       type: 'actions',
  //       flex: 2,
  //       headerAlign: "center",
  //       getActions: (params) => [
  //         <GridActionsCellItem
  //           icon={<EditIcon />}
  //           label="Edit"
  //         // onClick={editUser(params.id)}
  //         />,
  //         <GridActionsCellItem
  //           icon={<DeleteIcon />}
  //           label="Delete"
  //           onClick={deleteAction(params)}
  //         />
  //       ],
  //     }
  //   ]
  // ], [deleteAction]);

  const [pageSize, setPageSize] = useState(10);
  return (
    <Box sx={{ height: 400, width: 1, mt: 2 }}>
      <DataGrid
        columns={columns}
        rows={rows}
        loading={loopLoading}
        pagination
        pageSize={pageSize}
        // onPageChage={(newPage) => setPageState(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 20, 40]}
        getRowId={(row) => row.key}
        key={(row) => row.key}
        onCellClick={handleOnCellClick}
      // experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>

  );
}


export default DataGridTable;
