import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import appRoutes from "src/utils/appRoutes";
import { useRouter } from "next/router";
import { Divider } from '@mui/material';
import path from 'path';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35%',
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: 'none'
};

const buttonStyle = {
  backgroundColor: 'white',
  padding: '10px',
  transition: 'background-color 0.3s ease',
  heigth: '100%',
  width: '100%',
  textAlign: 'left'
};

const buttonHoverStyle = {
  ...buttonStyle,
  backgroundColor: '#f0f0f0',
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    push(appRoutes.index())
  }
  const { push } = useRouter();


  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };

  const HandleAddArancelPrivado = (data: any) => {
    push(appRoutes.addArancelPublico())
  }

  const HandleAddArancelCooperativa = (data: any) => {
    push(appRoutes.addArancelCooperativa())
  }

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p className="text-[28px] font-semibold text-[#84DCCC]">
            ¿Que tipo quieres agregar?
          </p>
          <Divider></Divider>
          <div style={{height: 'full', width: 'full'}}>
            <button
              style={isHovered ? buttonHoverStyle : buttonStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={HandleAddArancelPrivado}
            >Item Arancel Privado</button>
          </div>

          <Divider></Divider>
          <button
            style={isHovered2 ? buttonHoverStyle : buttonStyle}
            onMouseEnter={handleMouseEnter2}
            onMouseLeave={handleMouseLeave2}
            onClick={HandleAddArancelCooperativa}
          >Item Arancel Cooperativa</button>
          <Divider></Divider>
        </Box>
      </Modal>
    </div>
  );
}