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
    const businessOneThingPanel = document.createElement('div');
    const craftOneThingPanel = document.createElement('div');

    // Initialize Business 1 Thing Panel
    businessOneThingPanel.id = 'business-one-thing-panel';
    businessOneThingPanel.className = 'hidden mt-6';
    businessOneThingPanel.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Business 1 Thing Focus</h2>
            <div class="space-y-4">
                <div class="border-b pb-4">
                    <h3 class="font-medium mb-2">Current Focus Area</h3>
                    <div class="bg-purple-50 p-4 rounded">
                        <p class="text-purple-800 font-medium">Drive Merchant Growth</p>
                        <p class="text-sm text-purple-600 mt-2">Focus on increasing merchant GMV through strategic account planning and stakeholder management.</p>
                    </div>
                </div>
                <div>
                    <h3 class="font-medium mb-2">Key Actions</h3>
                    <ul class="text-sm space-y-2">
                        <li>• Develop comprehensive account plans</li>
                        <li>• Execute quarterly business reviews</li>
                        <li>• Track and measure success metrics</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Initialize Craft 1 Thing Panel
    craftOneThingPanel.id = 'craft-one-thing-panel';
    craftOneThingPanel.className = 'hidden mt-6';
    craftOneThingPanel.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-semibold mb-4">Craft 1 Thing Focus</h2>
            <div class="space-y-4">
                <div class="border-b pb-4">
                    <h3 class="font-medium mb-2">Current Focus Area</h3>
                    <div class="bg-purple-50 p-4 rounded">
                        <p class="text-purple-800 font-medium">Strategic Discovery</p>
                        <p class="text-sm text-purple-600 mt-2">Enhance discovery skills to better understand merchant needs and opportunities.</p>
                    </div>
                </div>
                <div>
                    <h3 class="font-medium mb-2">Key Actions</h3>
                    <ul class="text-sm space-y-2">
                        <li>• Practice effective questioning techniques</li>
                        <li>• Document merchant insights systematically</li>
                        <li>• Develop targeted solution proposals</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    // Add panels to the document
    document.querySelector('.container.mx-auto.p-6').appendChild(businessOneThingPanel);
    document.querySelector('.container.mx-auto.p-6').appendChild(craftOneThingPanel);

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

            // Hide all panels
            trainingPanel.classList.add('hidden');
            pillarsSection.classList.add('hidden');
            businessOneThingPanel.classList.add('hidden');
            craftOneThingPanel.classList.add('hidden');

            // Show appropriate content based on tab
            const tabText = this.textContent.trim();
            switch(tabText) {
                case 'Training & Updates':
                    trainingPanel.classList.remove('hidden');
                    break;
                case 'Business Skills':
                    pillarsSection.classList.remove('hidden');
                    break;
                case 'Business 1 Thing':
                    businessOneThingPanel.classList.remove('hidden');
                    break;
                case 'Craft 1 Thing':
                    craftOneThingPanel.classList.remove('hidden');
                    break;
                case 'Craft Skills':
                    pillarsSection.classList.remove('hidden');
                    break;
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

    // MSM Lead and MSM Name functionality
    const msmLeadSelect = document.querySelector('select:first-of-type');
    const msmNameSelect = msmLeadSelect.nextElementSibling;
    
    // MSM team structure
    const msmTeamStructure = {
        'Aiko Lista': ['Valerie Corson', 'Brenden Porcher'],
        'Arnaud Bonnet': ['Elise Leben', 'Gabrielle Basah'],
        'Tyler Cuddihey': ['Hannah Breese', 'Cait Malaba'],
        'Jared Fraser': ['Kate Tratten', 'Molly Sovran'],
        'Nikole Gabriel-Brooks': ['Paris Colopy', 'Sarah Morgan'],
        'Kasia Mycek': ['Tom Mifflin', 'Vianna Saldanha'],
        'Megan Schmidling': ['Vik Klein', 'Andy Li'],
        'Amy Franklin': ['Brittney Canning', 'Charlotte Alimanestianu'],
        'Niresan Seevaratnam': ['Leena Di Leonardo', 'Paulina Lizewski'],
        'Jayson Brown': ['Rebecca Hill']
    };

    // Store all MSM options for reset
    const allMsmOptions = Array.from(msmNameSelect.options).slice(1);  // Skip the "Select MSM" option

    msmLeadSelect.addEventListener('change', function() {
        const selectedLead = this.value;
        
        // Clear current MSM options
        while (msmNameSelect.options.length > 1) {  // Keep the "Select MSM" option
            msmNameSelect.remove(1);
        }
        
        if (selectedLead === 'Select MSM Lead') {
            // Add all MSM options back
            allMsmOptions.forEach(option => {
                msmNameSelect.add(option.cloneNode(true));
            });
        } else {
            // Add only MSMs for selected lead
            const teamMembers = msmTeamStructure[selectedLead] || [];
            teamMembers.forEach(member => {
                const option = document.createElement('option');
                option.text = member;
                option.value = member;
                msmNameSelect.add(option);
            });
        }
        
        // Reset MSM selection
        msmNameSelect.value = 'Select MSM';
    });
}); 