import { useRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import CheckCircleOutlined from '@mui/icons-material/CheckCircleOutlined';
import UploadFileOutlined from '@mui/icons-material/UploadFileOutlined';
import { parseCSV, readFileAsText } from '../../utils/importCSV';
import { toast } from '../../store/useToastStore';

export default function ImportDialog({ open, onClose }) {
  const [step, setStep] = useState('upload');
  const [parsed, setParsed] = useState(null);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);

  const reset = () => {
    setStep('upload');
    setParsed(null);
    setFileName('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFile = async (file) => {
    if (!file) return;
    setFileName(file.name);
    const text = await readFileAsText(file);
    const result = parseCSV(text);
    setParsed(result);
    setStep('preview');
  };

  const handleConfirm = () => {
    setStep('importing');
    setTimeout(() => {
      setStep('success');
      toast.success('Import completed');
    }, 1200);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Import Data</DialogTitle>
      <DialogContent>
        {step === 'upload' && (
          <Box
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
            sx={{
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              p: 5,
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' },
            }}
          >
            <UploadFileOutlined sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
            <Typography variant="body2" fontWeight={600}>Click to upload or drag and drop</Typography>
            <Typography variant="caption" color="text.secondary">CSV files only</Typography>
            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              hidden
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </Box>
        )}

        {step === 'preview' && parsed && (
          <Box>
            <Typography variant="body2" sx={{ mb: 1.5 }}>
              <strong>{fileName}</strong> · {parsed.rows.length} rows detected
            </Typography>
            {parsed.errors.length > 0 && (
              <Alert severity="error" sx={{ mb: 1.5 }}>
                {parsed.errors.length} row(s) failed validation: {parsed.errors.map((e) => `Line ${e.line}`).join(', ')}
              </Alert>
            )}
            <Box sx={{ maxHeight: 260, overflow: 'auto', border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {parsed.headers.map((h) => <TableCell key={h}>{h}</TableCell>)}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parsed.rows.slice(0, 8).map((row, i) => (
                    <TableRow key={i}>
                      {parsed.headers.map((h) => <TableCell key={h}>{row[h]}</TableCell>)}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
        )}

        {step === 'importing' && (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ mb: 2 }}>Importing {parsed?.rows.length} records…</Typography>
            <LinearProgress />
          </Box>
        )}

        {step === 'success' && (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <CheckCircleOutlined color="success" sx={{ fontSize: 44, mb: 1 }} />
            <Typography variant="body1" fontWeight={600}>Import completed successfully</Typography>
            <Typography variant="body2" color="text.secondary">{parsed?.rows.length} records were imported.</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        {step === 'upload' && <Button onClick={handleClose}>Cancel</Button>}
        {step === 'preview' && (
          <>
            <Button onClick={reset}>Back</Button>
            <Button variant="contained" onClick={handleConfirm} disabled={parsed?.rows.length === 0}>Confirm Import</Button>
          </>
        )}
        {step === 'success' && <Button variant="contained" onClick={handleClose}>Done</Button>}
      </DialogActions>
    </Dialog>
  );
}
