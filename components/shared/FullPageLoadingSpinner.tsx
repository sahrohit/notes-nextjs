import { Grid, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const availableColors = [
	"blue.500",
	"gray.500",
	"red.500",
	"orange.500",
	"yellow.500",
	"green.500",
	"teal.500",
	"cyan.500",
	"purple.500",
	"pink.500",
];

const FullPageLoadingSpinner = () => {
	const [color, setColor] = useState("blue.500");

	useEffect(() => {
		const interval = setInterval(() => {
			const randomIndex = Math.floor(Math.random() * availableColors.length);
			setColor(availableColors[randomIndex]);
		}, 800);
		return () => clearInterval(interval);
	}, []);

	return (
		<Grid h={"100vh"} placeItems={"center"}>
			<Spinner
				thickness="4px"
				speed="1.2s"
				emptyColor="gray.200"
				color={color}
				size="xl"
			/>
		</Grid>
	);
};

export default FullPageLoadingSpinner;
