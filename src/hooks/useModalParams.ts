import { useLoadContext } from "@/context/LoadContextProvider";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Unique {
	id: number;
}

export default function useModalParams<T extends Unique>(key: string, baseUrl: string, items: T[]) {
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

	useEffect(() => {
		const id = params.get(key);

		if (!id) {
			setIsOpen(false);
			return;
		}

		const item = items.find(val => val.id === Number(id));

		if (item === currentItem && isOpen) return;

		if (!item) {
			setIsOpen(false);
			return;
		}

		setCurrentItem(currentItem);
		setIsOpen(true);
	}, [params, items]);

	return {
		showModal,
		closeModal,
		currentItem,
		isOpen,
	};
}
