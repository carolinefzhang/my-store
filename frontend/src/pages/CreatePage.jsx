import { Toaster, toaster } from '../components/ui/toaster'
import React, { use } from 'react'
import { useState } from 'react'
import { Container, Box, VStack, Heading, Input, Button } from '@chakra-ui/react'
import { useColorMode } from '../components/ui/color-mode'
import { useProductStore } from '../store/product'
import { useAuth } from '../context/AuthContext'

const CreatePage = () => {
  const { isAuthenticated, idToken } = useAuth()
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: 0
  })

  const { createProduct } = useProductStore()
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct, idToken)
    if (success) {
      setNewProduct({
        name: "",
        description: "",
        image: "",
        price: 0
      }) 
      toaster.create({
        title: "Product created successfully",
        type: "success",
      })     
    } else {
      toaster.create({
        title: "Error creating product",
        type: "error",
      })
    }  
  }
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mt={8} mb={8}>Create a new product</Heading>
        <Box w={"100%"} bg={useColorMode("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
        <VStack spacing={4}>
          <Input
            placeholder='Product Name'
            name='name'
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
          />
          <Input
            placeholder='Image URL'
            name='image'
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
          />
          <Input
            placeholder='Product Description'
            name='description'
            value={newProduct.description}
            onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
          />
          <Input
            placeholder='Price'
            name='price'
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
          />
          <Button width={"full"} onClick={handleAddProduct}>Add Product</Button>
        </VStack>
        <Toaster />
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage