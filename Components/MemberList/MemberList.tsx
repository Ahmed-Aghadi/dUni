import { ActionIcon, Group, Stack, Text, useMantineTheme } from '@mantine/core';
import { IconTrash } from '@tabler/icons';

// import * as Icon from 'tabler-icons-react';
import { Address } from '../Address/Address';
// import { Identicon } from '../Identicon';
import { List } from '../List/List';

export interface MemberListProps {
	label: string;
	members: string[];
	onRemove?: (member: string) => void;
	editable?: boolean;
}

export function MemberList(props: MemberListProps) {
	const theme = useMantineTheme();
	const color =
		theme.colorScheme === 'dark'
			? theme.colors.gray[2]
			: theme.colors.gray[3];

	const remove = (member: string) => {
		if (props.onRemove) props.onRemove(member);
	};

	return (
		<List>
			{props.members.map((mem: string, idx: number) => (
				<Group key={idx} noWrap>
					{/* <Identicon value={mem} /> */}
					<Stack spacing={0} style={{ flexGrow: 1 }}>
						<Address address={mem} />
						<Text color={color}>{props.label}</Text>
					</Stack>
					{props.editable && props.members.length > 0 && (
						<ActionIcon
							variant='transparent'
							onClick={() => remove(mem)}
						>
							<IconTrash color={color} />
						</ActionIcon>
					)}
				</Group>
			))}
		</List>
	);
}
