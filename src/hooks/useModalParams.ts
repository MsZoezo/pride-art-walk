import { useLoadContext } from "@/context/LoadContextProvider";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Unique {
	id: number;
	title: string;
	slug: string;
}

/**
 * Hook to use url params for modal state management.
 *
 * @param key The url key
 * @param baseUrl The base url
 * @param items Array of all items of Type
 * @param onOpen Callback when modal opens
 * @param onClose Callback when modal closes
 * @returns callbacks & state
 */
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

	const showModal = (slug: string) => {
		window.history.pushState(null, "", `${baseUrl}?${key}=${slug}`);
	};

	const closeModal = () => {
		if (!initialLoad) window.history.back();
		else window.history.replaceState(null, "", baseUrl);
	};

	const close = () => {
		setIsOpen(false);
		if (onClose) onClose();

		document.title = "Pride Art Route";
	};

	const open = (item: T) => {
		setCurrentItem(item);
		setIsOpen(true);
		if (onOpen) onOpen(item);

		document.title = `Pride Art Route | ${item.title}`;
	};

	useEffect(() => {
		const slug = params.get(key);

		if (!slug) {
			close();
			return;
		}

		let item = items.find(val => val.slug === slug);

		// If the slug is an id, we will look for id instead.
		if(!item && !Number.isNaN(Number(slug))) item = items.find(val => val.id === Number(slug));

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
