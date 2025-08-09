import { Box } from '@mui/material'

import { Skeleton } from '@mui/material';
import React from 'react'

export default function SkeletonLoader() {
  return (
     <Box className="w-full">
      <Skeleton  animation="wave" sx={{height: 50}} />
      <Skeleton animation="wave" sx={{height: 50}} />
      <Skeleton  animation="wave" sx={{height: 50}} />
      <Skeleton  animation="wave" sx={{height: 50}} />
      <Skeleton  animation="wave" sx={{height: 50}} />
      <Skeleton  animation="wave" sx={{height: 50}} />

    </Box>
  )
}
