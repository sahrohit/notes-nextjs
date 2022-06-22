import {
	CheckIcon,
	CloseIcon,
	CopyIcon,
	EditIcon,
	QuestionOutlineIcon,
} from "@chakra-ui/icons";
import {
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
import { useIdentifier } from "@utils/localStorage";

const Options = () => {
	const { identifier, setIdentifier } = useIdentifier();
	const { hasCopied, onCopy } = useClipboard(identifier as string);

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
							label="Access your note anywhere with this unique identifier."
							aria-label="A tooltip"
							placement="top"
						>
							<QuestionOutlineIcon w={4} h={4} />
						</Tooltip>
						<EditablePreview />
						<Input as={EditableInput} />
						<EditableControls onCopy={onCopy} hasCopied={hasCopied} />
					</HStack>
				</Editable>
			) : (
				<Spinner />
			)}
		</>
	);
};

export default Options;

interface EditableControlsProps {
	onCopy: () => void;
	hasCopied: boolean;
}

const EditableControls = ({ onCopy, hasCopied }: EditableControlsProps) => {
	const {
		isEditing,
		getSubmitButtonProps,
		getCancelButtonProps,
		getEditButtonProps,
	} = useEditableControls();

	return isEditing ? (
		<ButtonGroup justifyContent="center" size="sm">
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
		</ButtonGroup>
	) : (
		<ButtonGroup justifyContent="center" size="sm">
			<IconButton
				aria-label="Edit"
				size="sm"
				icon={<EditIcon />}
				{...getEditButtonProps()}
			/>
			<IconButton
				size="sm"
				icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
				aria-label="Copy to Clipboard"
				onClick={onCopy}
			/>
		</ButtonGroup>
	);
};
