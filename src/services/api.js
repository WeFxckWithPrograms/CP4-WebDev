export async function getProducts() {
    try {
        const response = await fetch("http://localhost:3001/produtos");
        if (!response.ok) throw new Error("Erro ao buscar produtos");
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}