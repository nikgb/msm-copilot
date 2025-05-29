// MSM Co-Pilot Configuration

const config = {
    // API Endpoints
    vaultMcpUrl: 'https://vault.shopify.io/mcp',
    dataPortalUrl: 'https://data-portal.shopify.io',
    
    // Initialize API credentials
    initializeCredentials: async () => {
        try {
            // Check if credentials are already set in localStorage
            const storedToken = localStorage.getItem('mcp_api_token');
            if (!storedToken) {
                // Prompt user for credentials if not found
                const token = prompt('Please enter your MCP API Token:');
                if (token) {
                    localStorage.setItem('mcp_api_token', token);
                }
            }
            
            return true;
        } catch (error) {
            console.error('Error initializing credentials:', error);
            return false;
        }
    },

    // Get API token
    getApiToken: () => {
        return localStorage.getItem('mcp_api_token');
    },

    // Clear stored credentials
    clearCredentials: () => {
        localStorage.removeItem('mcp_api_token');
    },

    // API request helper
    makeApiRequest: async (endpoint, options = {}) => {
        const token = config.getApiToken();
        if (!token) {
            throw new Error('API token not found. Please initialize credentials.');
        }

        const defaultOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        return fetch(endpoint, { ...defaultOptions, ...options });
    }
};

// Export configuration
window.MSMConfig = config; 