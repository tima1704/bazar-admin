import React from 'react'
import { Module } from '../../api/modules';
import CardProduct from './CardGood';
import { Box, Flex } from '@chakra-ui/react';

export const AdminPage = () => {
  const [goods, setGoods] = React.useState([])
  React.useEffect(() => {
    try {
      Module.getGoods(setGoods)
    } catch (error) {
      console.log(error);
    }
  }, [])

  console.log(goods);

  return (
    <div>
      <Flex alignItems={"center"} justifyContent={"center"} flexWrap={"wrap"}>
        {
          goods.items?.map(item => (
            <CardProduct props={item} />
          ))
        }
      </Flex>
    </div>
  )
}
