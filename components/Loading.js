import { CircularProgress, Flex } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex minHeight="100vh" alignItems="center" justifyContent="center">
      <CircularProgress isIndeterminate size='100px' thickness='4px' color="blue.300" />
    </Flex>
  )
}