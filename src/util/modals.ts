import { useLoadContext } from "@/context/LoadContextProvider";

export function ModalWindowState(key: string, baseUrl: string) {
	return {
		showModal: initShowModal(key, baseUrl),
		closeModal: initCloseModal(baseUrl),
	};
}

function initShowModal(key: string, baseUrl: string) {
	return (id: number) => {
		window.history.pushState(null, "", `${baseUrl}?${key}=${id}`);
	};
}

function initCloseModal(baseUrl: string) {
	const { initialLoad } = useLoadContext()!;

	return () => {
		if (!initialLoad) window.history.back();
		else window.history.replaceState(null, "", baseUrl);
	};
}
