import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "@config/theme";
import DarkModeSwitch from "@components/shared/DarkModeSwitch";

const client = new ApolloClient({
	uri: "/api/graphql",
	cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<ChakraProvider theme={theme}>
				<Component {...pageProps} />
				<Box position={"fixed"} bottom={6} right={6}>
					<DarkModeSwitch />
				</Box>
			</ChakraProvider>
		</ApolloProvider>
	);
}

export default MyApp;
