import { Typography } from '@mui/material';

type TextWithLabelProps = {
  label: React.ReactNode;
  text: React.ReactNode;
};

export function TextWithLabel({ label, text }: TextWithLabelProps) {
  if (!text) return null;

  return (
    <div>
      <Typography
        sx={{
          fontWeight: 'bold',
          color: 'text.secondary',
        }}
      >
        {label}
      </Typography>
      {typeof text === 'string' ? (
        <Typography variant="body2">{text}</Typography>
      ) : (
        text
      )}
    </div>
  );
}
