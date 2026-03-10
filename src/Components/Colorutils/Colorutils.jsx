// Color mapping utility component
export const colorNameToHex = (colorName) => {
  const colorMap = {
    // Basic colors
    black: "#000000",
    white: "#ffffff",
    red: "#ff0000",
    blue: "#0000ff",
    green: "#008000",
    yellow: "#ffff00",
    cyan: "#00ffff",
    magenta: "#ff00ff",
    
    // Grayscale
    gray: "#808080",
    grey: "#808080",
    silver: "#c0c0c0",
    "space gray": "#c0c0c0",
    spacegray: "#c0c0c0",
    darkgray: "#a9a9a9",
    lightgray: "#d3d3d3",
    
    // Premium colors
    gold: "#ffd700",
    rose: "#ff007f",
    pink: "#ffc0cb",
    purple: "#800080",
    orange: "#ffa500",
    brown: "#a52a2a",
    
    // Extended colors
    navy: "#000080",
    teal: "#008080",
    lime: "#00ff00",
    maroon: "#800000",
    olive: "#808000",
    coral: "#ff7f50",
    salmon: "#fa8072",
    khaki: "#f0e68c",
    
    // Modern variants
    "midnight black": "#0a0e27",
    "deep black": "#1a1a1a",
    "matte black": "#1c1c1c",
    "phantom black": "#1f1f1f",
    
    "pearl white": "#f5f5f5",
    "snow white": "#fffafa",
    "ivory": "#fffff0",
    
    "space silver": "#e8e8e8",
    "titanium": "#cccccc",
    "aluminum": "#a8a9ad",
    
    "rose gold": "#b76e79",
    "champagne": "#f7e7ce",
    "midnight blue": "#191970",
  };

  if (!colorName) return "#808080"; // Default gray
  
  const normalizedColor = colorName.toLowerCase().trim();
  return colorMap[normalizedColor] || "#808080";
};

export default colorNameToHex;