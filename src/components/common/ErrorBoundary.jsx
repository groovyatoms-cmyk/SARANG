import { Component } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('SARANG ErrorBoundary caught an error:', error, info);
  }

  handleReset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: 320,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ mb: 1 }}>Something went wrong.</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            An unexpected error occurred while rendering this section.
          </Typography>
          <Button variant="contained" onClick={this.handleReset}>Try Again</Button>
        </Box>
      );
    }
    return this.props.children;
  }
}
