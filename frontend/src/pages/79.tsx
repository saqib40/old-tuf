import { Box, Container, Typography } from '@mui/material';
import EmptyState from '../components/EmptyState';

function S79() {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography
                    variant="h2"
                    gutterBottom
                    sx={{
                        background: 'linear-gradient(to right, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Striver's S79 Sheet
                </Typography>
            </Box>
            <EmptyState
                message="Content Coming Soon"
                description="This sheet is currently being updated. Please check back later or contribute on GitHub."
            />
        </Container>
    )
}
export default S79;