import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getFromStorage = (key: string): string | undefined => {
	if (typeof window !== "undefined") {
		return (window as any).localStorage.getItem(key);
	}
	return undefined;
};

export const setToStorage = (
	key: string,
	value: string
): string | undefined => {
	if (typeof window !== "undefined") {
		return (window as any).localStorage.setItem(key, value);
	}
	return undefined;
};

export const useIdentifier = () => {
	const [identifier, setIdentifierState] = useState("");
	const toast = useToast();

	useEffect(() => {
		if (typeof window !== "undefined") {
			setIdentifierState(getFromStorage("identifier") || "");
		}
	});

	const setIdentifier = (identifer: string) => {
		if (typeof window !== "undefined") {
			setToStorage("identifier", identifer);
			setIdentifierState(getFromStorage("identifier") || "");
			toast({
				title: `Identifier set to ${identifer}`,
				status: "success",
				isClosable: true,
			});
		}
	};

	return { identifier, setIdentifier };
};
