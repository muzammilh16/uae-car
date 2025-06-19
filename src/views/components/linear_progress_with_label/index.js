// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'



const LinearProgressWithImage = (props) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        mb: 8,
        mt:4
      }}
    >
      {/* Progress Bar */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 5,
          borderRadius: 5,
          overflow: "hidden",
          backgroundColor: "#e0e0df",
          fontSize:0.7,
        }}
      >
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            height: "100%"
          }}
        />
      </Box>

      {/* Image */}
      <Box
        sx={{
          position: "absolute",
          left: `${props.value}%`,
          top: -20,
          transform: "translateX(-50%)",
        }}
      >
        <img
          src="/images/slider_icon.png"
          alt="Progress"
          style={{ height: 25, width: 25, objectFit: 'contain' }}
        />
      </Box>

      {/* Percentage Label */}
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          left: `${props.value}%`,
          top: 5,
          transform: "translateX(-50%)",
          fontWeight: "bold"
        }}
      >
        {`${Math.round(props.value)}%`}
      </Typography>
    </Box>
  );
};

export default function ProcessLinearWithLabel({progress = 25}) {
  // ** State

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress(prevProgress => (prevProgress >= 100 ? 10 : prevProgress + 25))
  //   }, 800)

  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])

  return <LinearProgressWithImage value={progress} />
}
