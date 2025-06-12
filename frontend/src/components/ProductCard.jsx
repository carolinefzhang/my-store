import { useColorModeValue } from "../components/ui/color-mode";
import {
  Box,
  Button,
  IconButton,
  Image,
  VStack,
  HStack,
  Heading,
  Text,
  CloseButton,
  Dialog,
  Portal,
  useDialog,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";
import { Toaster, toaster } from "../components/ui/toaster";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("gray.100", "gray.700");

  const { accessToken } = useAuth();

  const { updateProduct, deleteProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const dialog = useDialog();
  const handleDeleteProduct = async (id) => {
    const { success, message } = await deleteProduct(id, accessToken);
    if (!success) {
      toaster.create({
        title: "Error deleting product",
        status: "error",
      });
    } else {
      toaster.create({
        title: "Product deleted",
        type: "success",
      });
    }
  };
  const handleUpdateProduct = async (id, updatedProduct) => {
    console.log("AccessToken used for update:", accessToken);
    const { success, message } = await updateProduct(id, updatedProduct, accessToken);
    if (!success) {
      toaster.create({
        title: "Error updating product",
        status: "error",
      });
    } else {
      toaster.create({
        title: "Product updated successfully",
        type: "success",
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bgColor}
    >
      <Image
        src={product.image}
        alt={product.name}
        w={"full"}
        h={48}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" color={textColor} mb={4} fontSize="xl">
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <Dialog.RootProvider value={dialog}>
            <Dialog.Trigger asChild>
              <IconButton arial-lable="Edit Product">
                <MdOutlineEdit />
              </IconButton>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Edit</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <VStack spacing={4}>
                      <Input
                        placeholder="Product Name"
                        name="name"
                        value={updatedProduct.name}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            name: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Image URL"
                        name="image"
                        value={updatedProduct.image}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            image: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Product Description"
                        name="description"
                        value={updatedProduct.description}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            description: e.target.value,
                          })
                        }
                      />
                      <Input
                        placeholder="Price"
                        name="price"
                        value={updatedProduct.price}
                        onChange={(e) =>
                          setUpdatedProduct({
                            ...updatedProduct,
                            price: e.target.value,
                          })
                        }
                      />
                    </VStack>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <HStack spacing={2}>
                        <Button variant="outline">Cancel</Button>
                        <Button
                          onClick={() =>
                            handleUpdateProduct(product._id, updatedProduct)
                          }
                        >
                          Update Product
                        </Button>
                      </HStack>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.RootProvider>
          <IconButton
            arial-label="Delete Product"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <MdOutlineDeleteOutline />
          </IconButton>
        </HStack>
      </Box>
      <Toaster />
    </Box>
  );
};

export default ProductCard;
