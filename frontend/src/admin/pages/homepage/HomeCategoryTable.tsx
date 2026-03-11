import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Box,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import type { HomeCategory } from "../../../types/homeCategoryTypes";
import { useState } from "react";
import { uploadToCloudinary } from "../../../util/UploadToCloudinary";
import { useAppDispatch } from "../../../state/store";
import {
  deleteHomeCategory,
  updateHomeCategory,
} from "../../../state/admin/adminSlice";
import {
  fetchHomePageData,
  createHomeCategories,
} from "../../../state/customer/customerSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function HomeCategoryTable({
  data,
  sectionName,
}: {
  data: HomeCategory[];
  sectionName?: string;
}) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<HomeCategory | null>(
    null,
  );

  // Edit fields
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editName, setEditName] = useState("");

  // Create fields
  const [createCategoryId, setCreateCategoryId] = useState("");
  const [createImage, setCreateImage] = useState("");
  const [createName, setCreateName] = useState("");

  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setUploadImage(true);
      try {
        const image = await uploadToCloudinary(file);
        if (image) {
          setCreateImage(image);
        }
      } catch (error) {
        console.log("Error uploading image:", error);
      } finally {
        setUploadImage(false);
      }
    }
  };

  const handleEditClick = (category: HomeCategory) => {
    setSelectedCategory(category);
    setEditCategoryId(category.categoryId);
    setEditImage(category.image);
    setEditName(category.name || "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
    setCreateCategoryId("");
    setCreateImage("");
    setCreateName("");
  };

  const handleCreate = () => {
    const newCategory = {
      categoryId: createCategoryId,
      image: createImage,
      name: createName,
      section: sectionName || "GRID", // fallback
    };

    dispatch(createHomeCategories([newCategory])).then(() => {
      dispatch(fetchHomePageData());
    });
    handleCloseCreate();
  };

  const handleUpdate = () => {
    if (selectedCategory && selectedCategory.id) {
      const updatedData = {
        ...selectedCategory,
        categoryId: editCategoryId,
        image: editImage,
        name: editName,
      };
      dispatch(
        updateHomeCategory({ id: selectedCategory.id, data: updatedData }),
      ).then(() => {
        dispatch(fetchHomePageData());
      });
      handleClose();
    }
  };

  const handleDelete = (id: number | undefined) => {
    if (id) {
      dispatch(deleteHomeCategory(id)).then(() => {
        dispatch(fetchHomePageData());
      });
    }
  };

  return (
    <div>
      <div className="flex justify-end pb-4 border-b border-gray-200 mb-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenCreate(true)}
        >
          + Add Category
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">No.</StyledTableCell>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">Image</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Category Id</StyledTableCell>
              <StyledTableCell align="center">Update</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((category, index) => (
              <StyledTableRow key={category.id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">{category.id}</StyledTableCell>
                <StyledTableCell align="center">
                  <div className="flex justify-center">
                    <img
                      className="w-20 rounded-md"
                      src={category.image}
                      alt=""
                    />
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  {category.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {category.categoryId}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => handleEditClick(category)}>
                    <Edit />
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton onClick={() => handleDelete(category.id)}>
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>

        {/* Edit Category Modal */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
          <DialogTitle>Update Home Category</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              variant="outlined"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Category ID"
              fullWidth
              variant="outlined"
              value={editCategoryId}
              onChange={(e) => setEditCategoryId(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Image URL"
              fullWidth
              variant="outlined"
              value={editImage}
              onChange={(e) => setEditImage(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdate} color="primary" variant="contained">
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* Create Category Modal */}
        <Dialog
          open={openCreate}
          onClose={handleCloseCreate}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add New Home Category</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              variant="outlined"
              value={createName}
              onChange={(e) => setCreateName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Category ID (e.g. mens_shirts)"
              fullWidth
              variant="outlined"
              value={createCategoryId}
              onChange={(e) => setCreateCategoryId(e.target.value)}
            />

            <div className="flex items-center gap-4 mt-4">
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="fileInput" className="relative cursor-pointer">
                <Box className="w-24 h-24 border rounded-md flex items-center justify-center border-gray-400">
                  {createImage ? (
                    <img
                      src={createImage}
                      alt="Category Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <AddPhotoAlternateIcon className="text-gray-400" />
                  )}
                </Box>
                {uploadImage && (
                  <Box className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-black bg-opacity-10 rounded-md">
                    <CircularProgress size={24} />
                  </Box>
                )}
              </label>
              <div className="text-sm text-gray-500">
                Click to upload an image from your computer to Cloudinary.
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCreate}>Cancel</Button>
            <Button onClick={handleCreate} color="primary" variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </div>
  );
}
