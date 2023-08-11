import { Typography } from '@mui/material';

type TextWithLabelProps = {
  label: React.ReactNode;
  text: React.ReactNode;
};

export default function TextWithLabel({ label, text }: TextWithLabelProps) {
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
