import { Box, Typography, Button, alpha, useTheme } from '@mui/material';
import { FolderOpen, Github } from 'lucide-react';

interface EmptyStateProps {
    message?: string;
    description?: string;
}

const EmptyState = ({
    message = "No questions found",
    description = "It looks like this section is empty. Help us improve by contributing!"
}: EmptyStateProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                px: 2,
                textAlign: 'center',
                backgroundColor: alpha(theme.palette.background.paper, 0.2),
                borderRadius: 2,
                border: `1px dashed ${alpha(theme.palette.divider, 0.5)}`,
            }}
        >
            <Box
                sx={{
                    p: 3,
                    borderRadius: '50%',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    mb: 3,
                }}
            >
                <FolderOpen size={48} strokeWidth={1.5} />
            </Box>

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {message}
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mb: 4 }}>
                {description}
            </Typography>

            <Button
                variant="outlined"
                startIcon={<Github size={18} />}
                href="https://github.com/saqib40/old-tuf"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    borderRadius: 20,
                    px: 3,
                    borderColor: theme.palette.divider,
                    color: theme.palette.text.secondary,
                    '&:hover': {
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    },
                }}
            >
                Contribute on GitHub
            </Button>
        </Box>
    );
};

export default EmptyState;
