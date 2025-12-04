export async function loadInterFonts(): Promise<{
    regular: string;
    semibold: string;
    light: string;
}> {
    const [regular, semibold, light] = await Promise.all([
        fetchFontAsBase64("/fonts/Inter-Regular.ttf"),
        fetchFontAsBase64("/fonts/Inter-SemiBold.ttf"),
        fetchFontAsBase64("/fonts/Inter-Light.ttf"),
    ]);

    return { regular, semibold, light };
}

async function fetchFontAsBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    let binary = "";
    for (let i = 0; i < uint8Array.length; i++) {
        binary += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binary);
}
