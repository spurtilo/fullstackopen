import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Entry } from '../../types';

const AddEntryMenu = ({
  setSelectedForm,
  openForm,
}: {
  setSelectedForm: React.Dispatch<React.SetStateAction<Entry['type']>>;
  openForm: () => void;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelection = (selection: Entry['type']) => {
    setSelectedForm(selection);
    openForm();
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        variant="contained"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Add New Entry
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleSelection('HealthCheck')}>
          Healthcheck
        </MenuItem>
        <MenuItem onClick={() => handleSelection('Hospital')}>
          Hospital
        </MenuItem>
        <MenuItem onClick={() => handleSelection('OccupationalHealthcare')}>
          Occupational Healthcare
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AddEntryMenu;
