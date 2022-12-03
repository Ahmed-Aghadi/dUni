import {
	createStyles,
	Card,
	Image,
	Text,
	Group,
	RingProgress,
	Button,
	Center,
	Badge,
	ActionIcon,
} from '@mantine/core';
import { IconCurrencyEthereum, IconShoppingCartPlus } from '@tabler/icons';
import Link from 'next/link';
import { useContract } from '../../hooks/useContract';
import {useEffect, useState} from "react";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
	},

	footer: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: `${theme.spacing.sm}px ${theme.spacing.lg}px`,
		borderTop: `1px solid ${
			theme.colorScheme === 'dark'
				? theme.colors.dark[5]
				: theme.colors.gray[2]
		}`,
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		lineHeight: 1,
	},
}));

interface CardWithStatsProps {
	image: string;
	title: string;
	description: string;
	stats: {
		title: string;
		value: string;
	}[];
}

export function CourseCard(props: any) {
	const { classes } = useStyles()
	const {getCourse} = useContract()
	const [data, setData] = useState<any>([])
	useEffect(() => {
		const getCourseData = async () => {
			const course = await getCourse(props.id)
			const data = await fetch(`https://${course[1]}.ipfs.nftstorage.link`)
			const json = await data.json()
			setData(json)
		}
		getCourseData()
	}, [props])
	console.log("CourseCard", data)

	const mockData = {
		image: 'https://images.unsplash.com/photo-1581889470536-467bdbe30cd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
		title: 'Running challenge',
		description:
			'56 km this month • 17% improvement compared to last month • 443 place in global scoreboard',
		stats: [
			{
				title: 'Students Enrolled',
				value: '785',
			},
			{
				title: 'Total Hrs.',
				value: '56 hrs',
			},
			{
				title: 'Popularity',
				value: '8.8/10',
			},
		],
	};

	const etherIcon = (
		<ActionIcon size='xs' color='blue' radius='xl' variant='transparent'>
			<IconCurrencyEthereum color='green' />
		</ActionIcon>
	);

	return (
		<Card withBorder p='lg' className={classes.card} radius='lg'>
			<Card.Section>
				<Image src={`https://${data.image}.ipfs.nftstorage.link`} alt={data.name} height={200} />
			</Card.Section>

			<Group position='apart' mt='xl'>
				<Link href={`/view-course?id=${props.id}`}>
					<Text size='xl' weight={700} className={classes.title}>
						{data.name}
					</Text>
				</Link>
				<Group>
					<Badge size='lg' color='lime' leftSection={etherIcon}>
						Price : 1350
					</Badge>
				</Group>
			</Group>
			<Text mt='xl' mb='xl' color='dimmed' size='md'>
				{data.shortDescription}
			</Text>
			<Card.Section>
				<Center>
					<Button
						variant='subtle'
						color='indigo'
						size='md'
						mt={10}
						leftIcon={<IconShoppingCartPlus />}
						fullWidth
					>
						Enroll in the course
					</Button>
				</Center>
			</Card.Section>
		</Card>
	);
}
