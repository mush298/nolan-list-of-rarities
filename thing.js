let RARITIES = [
    { name: "Common", chance: 64, color: '#C7C5B8' }, // Beige
    { name: "Rare", chance: 25, color: '#03A9F4' }, // Green
    { name: "Epic", chance: 10, color: '#7A288A' }, // Blue
    { name: "Legendary", chance: 1, color: '#FF9800' }, // Orange
    { name: "Godly", chance: 0.05, color: '#7A288A' }, // Purple
    { name: "Mythical", chance: 0.001, color: '#FF69B4' }, // Pink
    { name: "Secret", chance: 0.000001, color: '#000000' },
    { name: "Superlative", chance: 0.00000001, color: '#000000' },
    { name: "Celestial", chance: 0.0000000001, color: '#000000' },
    { name: "Super Secret", chance: 0.000000000000415, color: '#000000' },
    { name: "Infinity", chance: 0.0000000000000002011415, color: '#000000' },
];

let TYPES = [
    
        { name: "", chance: 100, textColor: false, backgroundColor: false }, // Grayish
        { name: "Normal", chance: 90, textColor: false, backgroundColor: false }, // Grayish
        { name: "Wood", chance: 85, textColor: '#8B4513', backgroundColor: false },
        { name: "Stone", chance: 80, textColor: '#A9A9A9', backgroundColor: false },
        { name: "Iron", chance: 70, textColor: '#4F4F4F', backgroundColor: '#B0B0B0' }, // Grayish
        { name: "Copper", chance: 65, textColor: '#B87333', backgroundColor: '#DAA520' },
        { name: "Bronze", chance: 50, textColor: '#333', backgroundColor: false }, // Grayish
        { name: "Silver", chance: 25, textColor: '#333', backgroundColor: '#C0C0C0' },
        { name: "Sapphire", chance: 20, textColor: '#FFD700', backgroundColor: '#FFF8DC' }, // Golden
        { name: "Platinum", chance: 15, textColor: '#E5E4E2', backgroundColor: '#D3D3D3' },
        { name: "Golden", chance: 10, textColor: '#0F52BA', backgroundColor: '#ADD8E6' },
        { name: "Ruby", chance: 8, textColor: '#9B111E', backgroundColor: '#FFC0CB' },
        { name: "Emerald", chance: 5, textColor: '#50C878', backgroundColor: '#98FB98' },
        { name: "Amethyst", chance: 4, textColor: '#9966CC', backgroundColor: '#E6E6FA' },
        { name: "Diamond", chance: 2.5, textColor: '#FFD700', backgroundColor: 'rgba(255, 215, 0, 0.2)' }, // Golden
        { name: "Obsidian", chance: 1.75, textColor: '#000000', backgroundColor: '#4F4F4F' },
        { name: "Topaz", chance: 1.5, textColor: '#FFAE42', backgroundColor: '#FFEFD5' },
        { name: "Rainbow", chance: 1, textColor: '#FF69B4', backgroundColor: 'linear-gradient(to right, #FF69B4, #FF9800, #F7DC6F)' },
        { name: "Aquamarine", chance: 0.8, textColor: '#7FFFD4', backgroundColor: '#E0FFFF' },
        { name: "Meteorite", chance: 0.5, textColor: '#808080', backgroundColor: '#1E1E1E' },
        { name: "Crystal", chance: 0.25, textColor: '#B0E0E6', backgroundColor: '#F5FFFA' },
        { name: "Dark Matter", chance: 0.05, textColor: '#FFD700', backgroundColor: '#1A1D23' },
        { name: "Black Diamond", chance: 0.01, textColor: '#E5E4E2', backgroundColor: '#2F4F4F' },
        { name: "Etherium", chance: 0.005, textColor: '#9EDEF0', backgroundColor: '#1F354D' },
        { name: "Stardust", chance: 0.003, textColor: '#C0C0C0', backgroundColor: '#303030' },
        { name: "Planetary", chance: 0.002, textColor: '#ADD8E6', backgroundColor: '#000080' },
        { name: "Nebula", chance: 0.00025, textColor: '#BA55D3', backgroundColor: '#2E0854' },
        { name: "Galactic", chance: 0.000075, textColor: '#7FFF00', backgroundColor: '#191970' },
        { name: "Universal", chance: 0.000000415, textColor: '#00FFFF', backgroundColor: '#1C1C1C' },
        { name: "Multiversal", chance: 0.000000004152011, textColor: '#FF4500', backgroundColor: '#1A1D23' }
    
        // Dark Theme
];

let RARE_TYPES = [
    { name: "", chance: 100, textColor: false, backgroundColor: false }, // Grayish
    { name: "Shiny", chance: 1, textColor: false, backgroundColor: false }, // Grayish
    { name: "Exotic", chance: 0.01, textColor: '#8B4513', backgroundColor: false },
    { name: "Void", chance: 0.0001, textColor: '#8B4513', backgroundColor: false },  
    { name: "Metaversal", chance: 0.0000001, textColor: '#8B4513', backgroundColor: false },
    { name: "Omniversal", chance: 0.000000001, textColor: '#8B4513', backgroundColor: false },
    { name: "Transfinity", chance: 0.00000000004152011, textColor: '#8B4513', backgroundColor: false },
]

// Function to calculate combined probability (as "1 in X")
// Function to calculate combined probability (as "1 in X") and Rarity Score
function calculateCombinedProbability(rarityChance, typeChance, type2Chance) {
    // Assuming chances are percentages, convert to decimal and multiply
    let combinedDecimal = (rarityChance / 100) * (typeChance / 100) * (type2Chance / 100);
    // Convert decimal to "1 in X" format
    let oneInX = Math.round(1 / combinedDecimal * 100) / 100; // Round to two decimal places for readability
    let rarityScore = 1 / combinedDecimal; // Higher score means rarer
    return { oneInX: `1/${formatNumber(oneInX)}`, rarityScore };
}

// Function to generate, sort, and render combinations
function generateAndRenderCombinations(rarities, types, types2, targetElement) {
    // Clear existing content (if any)
    targetElement.innerHTML = '';

    // Generate all combinations
    let combinations = [];
    rarities.forEach(rarity => {
        types.forEach(type => {
            types2.forEach(type2 => {
                const combination = `${type2.name} ${type.name} ${rarity.name}`;
                const { oneInX, rarityScore } = calculateCombinedProbability(rarity.chance, type.chance, type2.chance);
                combinations.push({ combination, probability: oneInX, rarityScore });
            });
        });
    });

    // Sort combinations by Rarity Score (Descending)
    combinations.sort((a, b) => a.rarityScore - b.rarityScore);

    // Render sorted combinations
    combinations.forEach(({ combination, probability }) => {
        const html = `
            <div class="text" style="margin-bottom: 10px;">
                <div class="text-wrapper">
                    <p class="shadow">${combination} - ${probability}</p>
                    <p class="text-common" 
                       style="
                            font-family: 'Poppins', sans-serif;
                            font-weight: 900;
                            background: ${'rgb(179, 179, 179)'};
                            -webkit-background-clip: ${'text'};
                            background-clip: ${'text'};
                            -webkit-text-fill-color: ${'transparent'};
                           
                        ">
                        ${combination} - ${probability}</p>
                </div>
            </div>
        `;
        targetElement.insertAdjacentHTML('beforeend', html);
    });
}

const targetElement = document.querySelector('.container');
generateAndRenderCombinations(RARITIES, TYPES, RARE_TYPES, targetElement);

function formatNumber(n) {
    const abbreviations = ['', 'k', 'm', 'b', 't', 'q', 'Q', 's', 'S', 'o', 'N', 'd', 'ud', 'dd', 'td', 'qd', 'Qd', 'sd', 'Sd', 'Od', 'Nd', 'v', 'uv', 'dv', 'tv', 'qv', 'Qv'];
    const threshold = [1, 1e3, 1e6, 1e9, 1e12, 1e15, 1e18, 1e21, 1e24, 1e27, 1e30, 1e33, 1e36, 1e39, 1e42, 1e45, 1e48, 1e51, 1e54, 1e57, 1e60, 1e63, 1e66, 1e69, 1e72, 1e75, 1e78];

    if (n >= 1e8) { // Start abbreviating from thousands
        const index = threshold.findIndex((t) => n < t) - 1; // Find the appropriate abbreviation index
        const abbreviatedValue = (n / threshold[index]).toFixed(2); // Calculate the abbreviated value
        return `${abbreviatedValue}${abbreviations[index]}`;
    } else {
        return n.toLocaleString();
    }
}
// Target Element
 // Adjusted to.container to avoid self-replacement

// Wrap your content in a.container for clarity
// <div class="container"></div>

// Generate and Render Combinations
