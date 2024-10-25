export function getRandomColor(inputString: string, seed: number = 69) {
    const colors = [
        "rose", "pink", "fuchsia", "purple", "violet",
        "indigo", "blue", "sky", "cyan", "teal",
        "emerald", "green", "lime", "yellow", "amber",
        "orange", "red", "gray"
    ];
    function hashString(str: string) {
        const limitedString = str.length > 5 ? str.slice(0, 5) : str;
        let hash = 0;
        for (let i = 0; i < limitedString.length; i++) {
            hash = (hash << 5) - hash + limitedString.charCodeAt(i);
            hash = hash & hash; 
        }
        return (hash + seed) % colors.length;
    }

    const index = hashString(inputString);
    return colors[index];
}
