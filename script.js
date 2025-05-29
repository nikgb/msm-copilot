// MSM Co-Pilot Interactivity

document.addEventListener('DOMContentLoaded', async function() {
    // Initialize credentials
    await MSMConfig.initializeCredentials();

    // Settings Modal functionality
    const settingsButton = document.getElementById('settingsButton');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettings = document.getElementById('closeSettings');
    const saveSettings = document.getElementById('saveSettings');
    const clearCredentials = document.getElementById('clearCredentials');
    const mcpTokenInput = document.getElementById('mcpToken');

    // Show settings modal
    settingsButton.addEventListener('click', () => {
        const currentToken = MSMConfig.getApiToken();
        if (currentToken) {
            mcpTokenInput.value = currentToken;
        }
        settingsModal.classList.remove('hidden');
    });

    // Close settings modal
    closeSettings.addEventListener('click', () => {
        settingsModal.classList.add('hidden');
        mcpTokenInput.value = '';
    });

    // Save settings
    saveSettings.addEventListener('click', () => {
        const token = mcpTokenInput.value.trim();
        if (token) {
            localStorage.setItem('mcp_api_token', token);
            settingsModal.classList.add('hidden');
            mcpTokenInput.value = '';
            alert('Settings saved successfully!');
        } else {
            alert('Please enter a valid API token.');
        }
    });

    // Clear credentials
    clearCredentials.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your credentials?')) {
            MSMConfig.clearCredentials();
            mcpTokenInput.value = '';
            alert('Credentials cleared successfully!');
        }
    });

    // Tab functionality
    const tabs = document.querySelectorAll('.tab-button');
    const trainingPanel = document.getElementById('training-panel');
    const pillarsSection = document.querySelector('.grid.grid-cols-3');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => {
                t.classList.remove('active', 'border-purple-600', 'text-purple-600');
                t.classList.add('text-gray-500', 'border-transparent');
            });

            // Add active class to clicked tab
            this.classList.add('active', 'border-purple-600', 'text-purple-600');
            this.classList.remove('text-gray-500', 'border-transparent');

            // Show/hide appropriate content
            if (this.textContent.trim() === 'Training & Updates') {
                trainingPanel.classList.remove('hidden');
                pillarsSection.classList.add('hidden');
            } else {
                trainingPanel.classList.add('hidden');
                pillarsSection.classList.remove('hidden');
            }
        });
    });

    // AI Assistant functionality
    const aiInput = document.querySelector('input[placeholder="Ask a question..."]');
    const aiOutput = document.querySelector('.bg-gray-50 p');
    
    aiInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const question = this.value;
            // Simulate AI response
            aiOutput.innerHTML = `<div class="mb-2"><strong>You:</strong> ${question}</div>
                                <div><strong>AI:</strong> Processing your request...</div>`;
            this.value = '';
            
            // Simulate thinking and response
            setTimeout(() => {
                aiOutput.innerHTML += `<div class="mt-2">Here are some suggestions based on your question...</div>`;
            }, 1000);
        }
    });

    // Quick Actions functionality
    const actionSelect = document.getElementById('actionSelect');
    const executeButton = actionSelect.nextElementSibling;
    
    executeButton.addEventListener('click', function() {
        const selectedAction = actionSelect.value;
        if (selectedAction !== 'Select Action') {
            // Simulate action execution
            this.innerHTML = 'Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = 'Execute Action';
                this.disabled = false;
                alert(`Action executed: ${selectedAction}`);
            }, 1500);
        }
    });

    // Example of using the API
    async function fetchMerchantData(merchantId) {
        try {
            const response = await MSMConfig.makeApiRequest(`${MSMConfig.vaultMcpUrl}/merchants/${merchantId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching merchant data:', error);
            return null;
        }
    }

    // Merchant selection functionality with API integration
    const merchantSelect = document.querySelector('select');
    const merchantStats = document.querySelector('.space-y-2');
    
    merchantSelect.addEventListener('change', async function() {
        if (this.value !== 'Select Merchant') {
            // Show loading state
            merchantStats.innerHTML = '<p>Loading merchant data...</p>';
            
            try {
                // Attempt to fetch real data
                const merchantData = await fetchMerchantData(this.value);
                
                if (merchantData) {
                    // Use real data if available
                    merchantStats.innerHTML = `
                        <p><span class="font-medium">GMV:</span> ${merchantData.gmv}</p>
                        <p><span class="font-medium">NRR:</span> ${merchantData.nrr}</p>
                        <p><span class="font-medium">Risk Level:</span> ${merchantData.riskLevel}</p>
                    `;
                } else {
                    // Fall back to mock data
                    const mockData = {
                        'Merchant A': {
                            gmv: '$1.2M',
                            nrr: '95%',
                            risk: 'Low'
                        },
                        'Merchant B': {
                            gmv: '$2.8M',
                            nrr: '88%',
                            risk: 'Medium'
                        }
                    };
                    
                    const data = mockData[this.value];
                    merchantStats.innerHTML = `
                        <p><span class="font-medium">GMV:</span> ${data.gmv}</p>
                        <p><span class="font-medium">NRR:</span> ${data.nrr}</p>
                        <p><span class="font-medium">Risk Level:</span> ${data.risk}</p>
                    `;
                }
            } catch (error) {
                console.error('Error:', error);
                merchantStats.innerHTML = '<p class="text-red-600">Error loading merchant data</p>';
            }
        }
    });

    // Filter functionality
    const filterSelects = document.querySelectorAll('.bg-white.p-4 select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            // Simulate filter application
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            loadingOverlay.innerHTML = '<div class="bg-white p-4 rounded">Applying filters...</div>';
            document.body.appendChild(loadingOverlay);
            
            setTimeout(() => {
                document.body.removeChild(loadingOverlay);
            }, 1000);
        });
    });

    // Add hover effects to recommendation lists
    document.querySelectorAll('li').forEach(li => {
        li.addEventListener('mouseenter', function() {
            this.style.color = '#7e22ce';
        });
        
        li.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });

    // Make cards interactive
    document.querySelectorAll('.bg-white').forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle highlight effect
            this.style.backgroundColor = '#faf5ff';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 200);
        });
    });

    // Add loading states to all selects
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', function() {
            if (this.value !== 'Select Merchant' && this.value !== 'Select Action') {
                const parent = this.closest('.bg-white');
                const recommendations = parent.querySelector('.bg-gray-50');
                
                if (recommendations) {
                    recommendations.innerHTML = '<p class="text-center">Loading recommendations...</p>';
                    
                    setTimeout(() => {
                        recommendations.innerHTML = `
                            <h3 class="font-medium mb-2">Recommendations</h3>
                            <ul class="text-sm space-y-2">
                                <li>• New recommendation 1</li>
                                <li>• New recommendation 2</li>
                                <li>• New recommendation 3</li>
                            </ul>
                        `;
                    }, 1000);
                }
            }
        });
    });
}); 