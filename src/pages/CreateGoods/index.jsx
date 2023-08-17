import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
  Text,
  HStack,
  Textarea,
  Select,
} from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { pbData } from '../../server'

export const CreateGoods = () => {
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'avatar') {
        formData.append(key, value[0])
      } else {
        formData.append(key, value)
      }
    })
    try {
      await pbData.collection('goods').create(formData)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
      navigate('/')
    }
  }

  const category_goods = [
    {
      id: 1,
      name: 'Book',
      value: 'book'
    },
    {
      id: 2,
      name: 'Shoes',
      value: 'shoes'
    },
    {
      id: 3,
      name: 'Dresses',
      value: 'dresses'
    }
  ]

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} width={"880px"} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Create good
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <Box>
              <FormControl id='avatar' isRequired>
                <FormLabel>Avatar</FormLabel>
                <Input type='file' {
                  ...register('avatar', {
                    required: true
                  })
                } />
              </FormControl>
            </Box>
            <Box>
              <FormControl id='category' isRequired>
                <FormLabel>Category</FormLabel>
                <Select {
                  ...register('category', {
                    required: true
                  })
                } >
                  {category_goods.map(item => (
                    <option key={item.id} value={item.value}>{item.name}</option>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl id="name" isRequired>
                <FormLabel display="flex">Title</FormLabel>
                <Input {...register('title', {
                  required: 'Обязательное поле!',
                  maxLength: {
                    value: 100,
                    message: 'Максимум 100 символов'
                  }
                })} type="text" placeholder='Book' />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="price">
                <FormLabel>Price</FormLabel>
                <Input {...register('price', {
                  required: true,
                  maxLength: {
                    value: 7,
                    message: 'Максимум 7 цифр'
                  }
                })} type="number" placeholder='120$' />
              </FormControl>
            </Box>
            <FormControl id="password">
              <FormLabel>Amount</FormLabel>
              <InputGroup>
                <Input {...register('amount')} placeholder='0' type='number' />
              </InputGroup>
            </FormControl>
            <FormControl id="email">
              <FormLabel>More info about good</FormLabel>
              <Textarea {...register('info')} height={"200px"} placeholder='some info' />
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                onClick={handleSubmit(onSubmit)}
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Create
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack >
    </Flex >
  )
}