import { create } from 'zustand'

export const useProductStore = create((set) => {
    return {
        products: [],
        setProducts: (products) => set({ products }),
        createProduct: async (newProduct, accessToken) => {
            if (!newProduct.name || !newProduct.image || !newProduct.description) {
                return { success: false, message: "Please fill in all fields." }
            }
            const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {})
                },
                body:JSON.stringify(newProduct)
            })
            const data = await res.json()
            set((state) => ({ products: [...state.products, data.data] }))
            return { success: true, message: "New product added" }
        },
        fetchProducts: async () => {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/products`)
            const data = await res.json()
            set({ products: data.data })
        },
        deleteProduct: async (id, accessToken) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {})
                },
            })
            const data = await res.json()
            if (!data.success) {
                return { success: false, message: "Failed to delete product" } 
            }
            set((state) => ({ products: state.products.filter((product) => product._id !== id) }))
            return { success: true, message: "Product deleted" }
        },
        updateProduct: async (id, updatedProduct, accessToken) => {
            const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {})
                },
                body: JSON.stringify(updatedProduct)
            })
            const data = await res.json()
            if (!data.success) {
                return { success: false, message: "Failed to update product" }
            }
            set((state) => ({ products: state.products.map((product) => product._id === updatedProduct._id ? updatedProduct : product) }))
            return { success: true, message: "Product updated" } 
        }
    }
})