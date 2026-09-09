import MuiStack from '@mui/material/Stack';

// This MUI version's Stack/Box no longer forward flexbox shorthand props
// (alignItems, justifyContent, flexWrap, rowGap, columnGap, gap) through the
// style pipeline — they leak straight onto the DOM node. This wrapper folds
// them into `sx` so the rest of the app can keep using the familiar shorthand.
const LAYOUT_PROPS = ['alignItems', 'justifyContent', 'alignContent', 'flexWrap', 'rowGap', 'columnGap', 'gap'];

export default function Stack({ sx, ...props }) {
  const layoutSx = {};
  const rest = {};

  Object.entries(props).forEach(([key, value]) => {
    if (LAYOUT_PROPS.includes(key)) {
      layoutSx[key] = value;
    } else {
      rest[key] = value;
    }
  });

  const mergedSx = Object.keys(layoutSx).length > 0 ? [layoutSx, ...(Array.isArray(sx) ? sx : [sx])] : sx;

  return <MuiStack sx={mergedSx} {...rest} />;
}
