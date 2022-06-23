import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

const DarkModeSwitch = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<IconButton
			colorScheme={"blue"}
			borderRadius={"full"}
			aria-label="Change Theme"
			icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
			onClick={toggleColorMode}
		/>
	);
};

export default DarkModeSwitch;
