import { Box } from '@chakra-ui/layout';

export const GlassCard = ({ children, ...props }) => {
  return (
    <>
      <Box mb={3} className='glass-card fade-in' {...props}>
        {children}
      </Box>
    </>
  );
};
