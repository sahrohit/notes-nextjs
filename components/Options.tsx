import {
	CheckIcon,
	CloseIcon,
	CopyIcon,
	EditIcon,
	LinkIcon,
	QuestionOutlineIcon,
} from "@chakra-ui/icons";
import {
	Alert,
	AlertIcon,
	ButtonGroup,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	HStack,
	IconButton,
	Input,
	Spinner,
	Tooltip,
	useClipboard,
	useEditableControls,
} from "@chakra-ui/react";
import { useLocalStorage } from "@utils/useLocalStorage";
import { useEffect, useState } from "react";

const Options = () => {
	const [identifier, setIdentifier] = useLocalStorage({
		key: "identifier",
		defaultValue: "",
	});

	const [isIdentiferNull, setIsIdentiferNull] = useState(false);

	const { hasCopied, onCopy } = useClipboard(identifier as string);
	const { hasCopied: hasCopiedLink, onCopy: onCopyLink } = useClipboard(
		`${window.location.origin}/notes/${identifier}`
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsIdentiferNull(true);
		}, 5000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{identifier ? (
				<Editable
					as={Flex}
					w={"full"}
					fontSize="2xl"
					defaultValue={identifier as string}
					isPreviewFocusable={false}
					onSubmit={(value) => setIdentifier(value as string)}
				>
					<HStack w={"full"} justifyContent={"flex-end"}>
						<Tooltip
							label="Access your note anywhere with this unique identifier, you can also edit if you already have a identifier."
							aria-label="A tooltip"
							placement="top"
						>
							<QuestionOutlineIcon w={4} h={4} />
						</Tooltip>
						<EditablePreview />
						<Input as={EditableInput} />
						<EditableControls
							onCopy={onCopy}
							hasCopied={hasCopied}
							onCopyLink={onCopyLink}
							hasCopiedLink={hasCopiedLink}
						/>
					</HStack>
				</Editable>
			) : (
				<HStack w={"full"} justifyContent={"flex-end"}>
					{!isIdentiferNull ? (
						<Spinner />
					) : (
						<Alert status="info">
							<AlertIcon />
							We`ll assign you a unique identifier after you create your first
							note.
						</Alert>
					)}
				</HStack>
			)}
		</>
	);
};

export default Options;

interface EditableControlsProps {
	onCopy: () => void;
	hasCopied: boolean;
	onCopyLink: () => void;
	hasCopiedLink: boolean;
}

const EditableControls = ({
	onCopy,
	hasCopied,
	onCopyLink,
	hasCopiedLink,
}: EditableControlsProps) => {
	const {
		isEditing,
		getSubmitButtonProps,
		getCancelButtonProps,
		getEditButtonProps,
	} = useEditableControls();

	return (
		<ButtonGroup justifyContent="center" size="sm">
			{isEditing ? (
				<>
					<IconButton
						aria-label="Cancel"
						icon={<CloseIcon />}
						{...getCancelButtonProps()}
					/>
					<IconButton
						aria-label="Save"
						icon={<CheckIcon />}
						{...getSubmitButtonProps()}
					/>
				</>
			) : (
				<>
					<Tooltip label="Edit Identifer">
						<IconButton
							aria-label="Edit"
							size="sm"
							icon={<EditIcon />}
							{...getEditButtonProps()}
						/>
					</Tooltip>
					<Tooltip label="Copy Identifer">
						<IconButton
							size="sm"
							icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
							aria-label="Copy to Clipboard"
							onClick={onCopy}
						/>
					</Tooltip>
				</>
			)}
			<Tooltip label="Copy Link to Share" placement={"left-end"}>
				<IconButton
					size="sm"
					icon={hasCopiedLink ? <CheckIcon /> : <LinkIcon />}
					aria-label="Share"
					onClick={onCopyLink}
				/>
			</Tooltip>
		</ButtonGroup>
	);
};
