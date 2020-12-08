import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { Box, ClickAwayListener, IconButton } from '@material-ui/core';
import HelpOutline from '@material-ui/icons/HelpOutline';

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export default function FeeToolTip() {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.createRef();
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <Box component="div" ref={inputRef} display="inline">
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <HtmlTooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            <React.Fragment>
              <Typography color="inherit">Chi tiết</Typography>
              <b>Phí </b>
              <em>
                {
                  '= 4.500.000 * 0.05(TIền phí này được sử dụng để quản lý ứng dụng)'
                }
              </em>
            </React.Fragment>
          }
        >
          <IconButton
            onClick={handleTooltipOpen}
            color="primary"
            aria-label="add to shopping cart"
          >
            <HelpOutline />
          </IconButton>
        </HtmlTooltip>
      </ClickAwayListener>
    </Box>
  );
}
