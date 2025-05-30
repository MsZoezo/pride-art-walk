import { useLoadContext } from "@/context/LoadContextProvider";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Unique {
	id: number;
	title: string;
}

export default function useModalParams<T extends Unique>(
	key: string,
	baseUrl: string,
	items: T[],
	onOpen?: (item: T) => void,
	onClose?: () => void,
) {
	const [currentItem, setCurrentItem] = useState<T | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { initialLoad } = useLoadContext()!;
	const params = useSearchParams();

	const showModal = (id: number) => {
		window.history.pushState(null, "", `${baseUrl}?${key}=${id}`);
	};

	const closeModal = () => {
		if (!initialLoad) window.history.back();
		else window.history.replaceState(null, "", baseUrl);
	};

	const close = () => {
		setIsOpen(false);
		onClose && onClose();

		document.title = "Pride Art Walk";
	};

	const open = (item: T) => {
		setCurrentItem(item);
		setIsOpen(true);
		onOpen && onOpen(item);

		document.title = `Pride Art Walk | ${item.title}`;
	};

	useEffect(() => {
		const id = params.get(key);

		if (!id) {
			close();
			return;
		}

		const item = items.find(val => val.id === Number(id));

		if (item === currentItem && isOpen) return;

		if (!item) {
			close();
			return;
		}

		open(item);
	}, [params, items]);

	return {
		showModal,
		closeModal,
		currentItem,
		isOpen,
	};
}
