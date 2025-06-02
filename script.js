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
                        <p class="text-purple-800 font-medium" id="business-goal-text">Drive Merchant Growth</p>
                        <p class="text-sm text-purple-600 mt-2" id="business-description-text">Focus on increasing merchant GMV through strategic account planning and stakeholder management.</p>
                        <div class="mt-4">
                            <textarea class="w-full p-2 border rounded text-gray-700 text-sm" rows="3" id="business-goal-input" placeholder="Update your goal here..."></textarea>
                            <button class="mt-2 bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700" id="save-business-goal">
                                Save Goal
                            </button>
                        </div>
                    </div>
                </div>
                <div class="border-b pb-4">
                    <h3 class="font-medium mb-2">Goal Progress</h3>
                    <div class="relative pt-1">
                        <div class="flex mb-2 items-center justify-between">
                            <div>
                                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                                    Progress
                                </span>
                            </div>
                            <div class="text-right flex items-center space-x-2">
                                <input type="range" min="0" max="100" value="75" class="progress-slider" id="business-progress-slider">
                                <span class="text-xs font-semibold inline-block text-purple-600" id="business-progress-text">
                                    75%
                                </span>
                            </div>
                        </div>
                        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                            <div style="width:75%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500" id="business-progress-bar"></div>
                        </div>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600">Target Completion:</span>
                                <input type="date" class="border rounded p-1 text-sm" id="business-target-date" value="2024-06-30">
                            </div>
                            <div class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <span class="text-sm font-medium">Check-in Milestones</span>
                                    <button class="text-purple-600 text-sm hover:text-purple-800" id="add-business-milestone">+ Add Milestone</button>
                                </div>
                                <div id="business-milestones" class="space-y-2">
                                    <!-- Milestone entries will be added here -->
                                </div>
                            </div>
                        </div>
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
                        <p class="text-purple-800 font-medium" id="craft-goal-text">Strategic Discovery</p>
                        <p class="text-sm text-purple-600 mt-2" id="craft-description-text">Enhance discovery skills to better understand merchant needs and opportunities.</p>
                        <div class="mt-4">
                            <textarea class="w-full p-2 border rounded text-gray-700 text-sm" rows="3" id="craft-goal-input" placeholder="Update your goal here..."></textarea>
                            <button class="mt-2 bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700" id="save-craft-goal">
                                Save Goal
                            </button>
                        </div>
                    </div>
                </div>
                <div class="border-b pb-4">
                    <h3 class="font-medium mb-2">Goal Progress</h3>
                    <div class="relative pt-1">
                        <div class="flex mb-2 items-center justify-between">
                            <div>
                                <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                                    Progress
                                </span>
                            </div>
                            <div class="text-right flex items-center space-x-2">
                                <input type="range" min="0" max="100" value="60" class="progress-slider" id="craft-progress-slider">
                                <span class="text-xs font-semibold inline-block text-purple-600" id="craft-progress-text">
                                    60%
                                </span>
                            </div>
                        </div>
                        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                            <div style="width:60%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500" id="craft-progress-bar"></div>
                        </div>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600">Target Completion:</span>
                                <input type="date" class="border rounded p-1 text-sm" id="craft-target-date" value="2024-07-31">
                            </div>
                            <div class="space-y-2">
                                <div class="flex justify-between items-center">
                                    <span class="text-sm font-medium">Check-in Milestones</span>
                                    <button class="text-purple-600 text-sm hover:text-purple-800" id="add-craft-milestone">+ Add Milestone</button>
                                </div>
                                <div id="craft-milestones" class="space-y-2">
                                    <!-- Milestone entries will be added here -->
                                </div>
                            </div>
                        </div>
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
                case 'Craft and Business Skills & Metrics':
                    pillarsSection.classList.remove('hidden');
                    break;
                case 'Business 1 Thing':
                    businessOneThingPanel.classList.remove('hidden');
                    break;
                case 'Craft 1 Thing':
                    craftOneThingPanel.classList.remove('hidden');
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
        if (selectedAction !== 'Select Coaching Action') {
            // Simulate action execution
            this.innerHTML = 'Processing...';
            this.disabled = true;
            
            // Coaching action responses
            const coachingResponses = {
                'Generate Coaching Plan': 'Creating personalized coaching plan based on MSM performance data...',
                'Schedule 1:1 Session': 'Opening calendar to schedule next coaching session...',
                'Review Call Recording': 'Loading latest call recordings for review...',
                'Create Development Plan': 'Generating development plan template with key focus areas...',
                'Track Coaching Progress': 'Loading coaching metrics and progress dashboard...',
                'Set SMART Goals': 'Opening SMART goals framework with current metrics...',
                'Document Coaching Notes': 'Opening coaching notes template with action items...'
            };
            
            setTimeout(() => {
                this.innerHTML = 'Start Coaching Action';
                this.disabled = false;
                alert(coachingResponses[selectedAction] || `Starting: ${selectedAction}`);
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

    // Save form data to localStorage
    function saveFormData() {
        const formData = {
            msmLead: document.querySelector('select:contains("MSM Lead Name")').value,
            msm: document.querySelector('select:contains("MSM Name")').value,
            dateRange: document.querySelector('select:contains("Date Range")').value,
            region: document.querySelector('select:contains("Region")').value,
            segment: document.querySelector('select:contains("Merchant Segment")').value,
            merchant: document.querySelector('.merchant-overview select').value,
            coachingAction: document.getElementById('actionSelect').value,
            gmvGrowth: document.querySelector('.gmv-growth select').value,
            crossSell: document.querySelector('select:contains("Enable Cross-Sell")').value
        };
        localStorage.setItem('msmCopilotData', JSON.stringify(formData));
    }

    // Load form data from localStorage
    function loadFormData() {
        const savedData = localStorage.getItem('msmCopilotData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            // Populate form fields
            document.querySelector('select:contains("MSM Lead Name")').value = formData.msmLead;
            document.querySelector('select:contains("MSM Name")').value = formData.msm;
            document.querySelector('select:contains("Date Range")').value = formData.dateRange;
            document.querySelector('select:contains("Region")').value = formData.region;
            document.querySelector('select:contains("Merchant Segment")').value = formData.segment;
            document.querySelector('.merchant-overview select').value = formData.merchant;
            document.getElementById('actionSelect').value = formData.coachingAction;
            document.querySelector('.gmv-growth select').value = formData.gmvGrowth;
            document.querySelector('select:contains("Enable Cross-Sell")').value = formData.crossSell;
        }
    }

    // Add event listeners to save data when form fields change
    document.addEventListener('DOMContentLoaded', function() {
        // Load saved data when page loads
        loadFormData();

        // Add change event listeners to all form elements
        const formElements = document.querySelectorAll('select');
        formElements.forEach(element => {
            element.addEventListener('change', saveFormData);
        });

        // Save data when AI Assistant input changes
        const aiInput = document.querySelector('.ai-assistant-input');
        if (aiInput) {
            aiInput.addEventListener('input', saveFormData);
        }
    });

    // Add goal update functionality
    function initializeGoalUpdates() {
        // Business 1 Thing goal updates
        const saveBusinessGoal = document.getElementById('save-business-goal');
        const businessGoalInput = document.getElementById('business-goal-input');
        const businessGoalText = document.getElementById('business-goal-text');
        const businessDescriptionText = document.getElementById('business-description-text');

        if (saveBusinessGoal && businessGoalInput) {
            // Load saved business goal if exists
            const savedBusinessGoal = localStorage.getItem('business-goal');
            if (savedBusinessGoal) {
                const { title, description } = JSON.parse(savedBusinessGoal);
                businessGoalText.textContent = title;
                businessDescriptionText.textContent = description;
                businessGoalInput.value = `${title}\n${description}`;
            }

            saveBusinessGoal.addEventListener('click', () => {
                const inputText = businessGoalInput.value;
                const [title, ...descriptionParts] = inputText.split('\n');
                const description = descriptionParts.join('\n').trim();
                
                businessGoalText.textContent = title || 'Drive Merchant Growth';
                businessDescriptionText.textContent = description || 'Focus on increasing merchant GMV through strategic account planning and stakeholder management.';
                
                localStorage.setItem('business-goal', JSON.stringify({ title, description }));
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'text-green-600 text-sm mt-2';
                successMessage.textContent = 'Goal updated successfully!';
                saveBusinessGoal.parentNode.appendChild(successMessage);
                setTimeout(() => successMessage.remove(), 2000);
            });
        }

        // Craft 1 Thing goal updates
        const saveCraftGoal = document.getElementById('save-craft-goal');
        const craftGoalInput = document.getElementById('craft-goal-input');
        const craftGoalText = document.getElementById('craft-goal-text');
        const craftDescriptionText = document.getElementById('craft-description-text');

        if (saveCraftGoal && craftGoalInput) {
            // Load saved craft goal if exists
            const savedCraftGoal = localStorage.getItem('craft-goal');
            if (savedCraftGoal) {
                const { title, description } = JSON.parse(savedCraftGoal);
                craftGoalText.textContent = title;
                craftDescriptionText.textContent = description;
                craftGoalInput.value = `${title}\n${description}`;
            }

            saveCraftGoal.addEventListener('click', () => {
                const inputText = craftGoalInput.value;
                const [title, ...descriptionParts] = inputText.split('\n');
                const description = descriptionParts.join('\n').trim();
                
                craftGoalText.textContent = title || 'Strategic Discovery';
                craftDescriptionText.textContent = description || 'Enhance discovery skills to better understand merchant needs and opportunities.';
                
                localStorage.setItem('craft-goal', JSON.stringify({ title, description }));
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'text-green-600 text-sm mt-2';
                successMessage.textContent = 'Goal updated successfully!';
                saveCraftGoal.parentNode.appendChild(successMessage);
                setTimeout(() => successMessage.remove(), 2000);
            });
        }
    }

    // Initialize goal updates when DOM is loaded
    initializeGoalUpdates();

    // Add progress tracker functionality
    function initializeProgressTrackers() {
        // Helper function to create a milestone element
        function createMilestoneElement(type, savedData = null) {
            const div = document.createElement('div');
            div.className = 'flex items-center space-x-2 milestone-entry';
            
            const date = savedData ? savedData.date : '';
            const description = savedData ? savedData.description : '';
            const completed = savedData ? savedData.completed : false;
            
            div.innerHTML = `
                <input type="checkbox" class="rounded text-purple-600" ${completed ? 'checked' : ''}>
                <input type="date" class="border rounded p-1 text-sm flex-shrink-0" value="${date}">
                <input type="text" class="border rounded p-1 text-sm flex-grow" placeholder="Milestone description" value="${description}">
                <button class="text-red-600 hover:text-red-800 text-sm delete-milestone">×</button>
            `;

            // Add event listeners for the milestone
            const checkbox = div.querySelector('input[type="checkbox"]');
            const dateInput = div.querySelector('input[type="date"]');
            const descInput = div.querySelector('input[type="text"]');
            const deleteBtn = div.querySelector('.delete-milestone');

            // Save milestone data when any field changes
            [checkbox, dateInput, descInput].forEach(input => {
                input.addEventListener('change', () => saveMilestones(type));
            });

            // Delete milestone when delete button is clicked
            deleteBtn.addEventListener('click', () => {
                div.remove();
                saveMilestones(type);
            });

            return div;
        }

        // Helper function to save milestones
        function saveMilestones(type) {
            const milestonesDiv = document.getElementById(`${type}-milestones`);
            const milestones = Array.from(milestonesDiv.querySelectorAll('.milestone-entry')).map(milestone => ({
                date: milestone.querySelector('input[type="date"]').value,
                description: milestone.querySelector('input[type="text"]').value,
                completed: milestone.querySelector('input[type="checkbox"]').checked
            }));
            localStorage.setItem(`${type}-milestones`, JSON.stringify(milestones));
        }

        // Helper function to load milestones
        function loadMilestones(type) {
            const savedMilestones = localStorage.getItem(`${type}-milestones`);
            if (savedMilestones) {
                const milestones = JSON.parse(savedMilestones);
                const milestonesDiv = document.getElementById(`${type}-milestones`);
                milestones.forEach(milestone => {
                    milestonesDiv.appendChild(createMilestoneElement(type, milestone));
                });
            }
        }

        // Helper function to update progress colors and text
        function updateProgressColors(value, progressBar, progressText) {
            // Remove existing color classes
            progressBar.classList.remove('bg-red-500', 'bg-yellow-500', 'bg-purple-500');
            progressText.classList.remove('text-red-600', 'text-yellow-600', 'text-purple-600');
            
            // Add appropriate color classes based on value
            if (value < 50) {
                progressBar.classList.add('bg-red-500');
                progressText.classList.add('text-red-600');
            } else if (value < 75) {
                progressBar.classList.add('bg-yellow-500');
                progressText.classList.add('text-yellow-600');
            } else {
                progressBar.classList.add('bg-purple-500');
                progressText.classList.add('text-purple-600');
            }
            
            // Update width and text
            progressBar.style.width = `${value}%`;
            progressText.textContent = `${value}%`;
        }

        ['business', 'craft'].forEach(type => {
            const progressSlider = document.getElementById(`${type}-progress-slider`);
            const progressText = document.getElementById(`${type}-progress-text`);
            const progressBar = document.getElementById(`${type}-progress-bar`);
            const targetDate = document.getElementById(`${type}-target-date`);
            const addMilestoneBtn = document.getElementById(`add-${type}-milestone`);

            if (progressSlider && progressText && progressBar) {
                // Add input event listener for real-time updates
                progressSlider.addEventListener('input', () => {
                    const value = parseInt(progressSlider.value);
                    updateProgressColors(value, progressBar, progressText);
                    localStorage.setItem(`${type}-progress`, JSON.stringify({ value }));
                });

                // Load saved progress
                const savedProgress = localStorage.getItem(`${type}-progress`);
                if (savedProgress) {
                    const progress = JSON.parse(savedProgress);
                    progressSlider.value = progress.value;
                    updateProgressColors(progress.value, progressBar, progressText);
                } else {
                    // Set default values
                    const defaultValue = type === 'business' ? 75 : 60;
                    progressSlider.value = defaultValue;
                    updateProgressColors(defaultValue, progressBar, progressText);
                }

                // Add transition styles
                progressBar.style.transition = 'width 0.3s ease-in-out, background-color 0.3s ease-in-out';
            }

            // Load saved target date
            if (targetDate) {
                const savedDate = localStorage.getItem(`${type}-target-date`);
                if (savedDate) {
                    targetDate.value = savedDate;
                }

                targetDate.addEventListener('change', () => {
                    localStorage.setItem(`${type}-target-date`, targetDate.value);
                });
            }

            // Initialize milestones
            if (addMilestoneBtn) {
                addMilestoneBtn.addEventListener('click', () => {
                    const milestonesDiv = document.getElementById(`${type}-milestones`);
                    if (milestonesDiv) {
                        milestonesDiv.appendChild(createMilestoneElement(type));
                        saveMilestones(type);
                    }
                });
                
                // Load existing milestones
                loadMilestones(type);
            }
        });
    }

    // Initialize progress trackers when DOM is loaded
    initializeProgressTrackers();
}); 