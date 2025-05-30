import styles from "./loadingScreen.module.css";
import Mascot from "../mascot/mascot";
import Spinner from "../spinner/spinner";
import { useEffect, useMemo, useRef, useState } from "react";

interface Props {
	render: boolean;

	error?: Error;
	retryTime?: number;
}

export default function LoadingScreen({ render, error, retryTime }: Props) {
	const [hidden, setHidden] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement>(null);

	// This minimum loading time should help with images loading in the background (hopefully!)
	const [minTimeElapsed, setMinTimeElapsed] = useState<boolean>(false);

	/* skip everything if we don't have to render at all */
	useEffect(() => {
		if (!render) setHidden(true);
	}, []);

	useEffect(() => {
		setTimeout(() => setMinTimeElapsed(true), 1500);
	}, []);

	useEffect(() => {
		if (render || !minTimeElapsed) return;

		const container = ref.current;

		if (!container) return;

		container.classList.add("fading");

		setTimeout(() => {
			setHidden(true);
		}, 2000);
	}, [render, minTimeElapsed]);

	if (hidden) return;

	return (
		<div
			className={styles.container}
			ref={ref}
		>
			<svg
				className={styles.blobGreen}
				width="186"
				height="214"
				viewBox="0 0 186 214"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M166.918 50.7973C175.934 78.2087 165.45 106.787 167.966 131.671C170.482 156.555 186.208 177.551 185.998 201.463C185.788 225.569 169.853 252.592 146.999 258.618C124.355 264.645 94.7918 249.481 58.7287 241.511C22.456 233.54 -20.3165 232.762 -37.9288 213.905C-55.541 195.047 -47.7832 158.304 -32.058 130.893C-16.3328 103.287 7.35979 85.4018 30.8427 60.5177C54.3257 35.4392 77.599 3.16766 103.388 0.251553C129.178 -2.85896 157.693 23.386 166.918 50.7973Z"
					fill="#C2E0CB"
					fill-opacity="0.4"
				/>
			</svg>

			<svg
				className={styles.blobRed}
				width="134"
				height="146"
				viewBox="0 0 134 146"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M47.1714 43.4851C73.0462 56.0033 112.631 61.8586 127.113 82.0492C141.595 102.24 130.975 136.766 116.106 172.705C101.045 208.846 81.5423 246.401 56.6331 245.997C31.7238 245.391 1.7941 206.625 -28.3287 187.04C-58.4515 167.455 -88.7675 166.648 -114.256 149.284C-139.745 131.92 -160.599 97.7978 -153.647 70.9443C-146.696 44.0909 -111.746 24.506 -82.0091 12.5935C-52.2725 0.479174 -27.9425 -3.76085 -9.4054 3.70966C8.93862 11.3821 21.2967 30.7651 47.1714 43.4851Z"
					fill="#E30613"
					fill-opacity="0.4"
				/>
			</svg>

			<svg
				className={styles.blobBlue}
				width="204"
				height="173"
				viewBox="0 0 204 173"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M220.264 49.8032C224.306 78.0303 235.43 107.321 228.163 132.521C220.895 157.721 195.235 178.83 173.228 171.485C151.216 164.376 132.621 128.809 103.025 115.067C73.55 101.208 32.955 109.291 14.2307 96.4391C-4.37728 83.7072 -1.11836 50.2767 8.37367 19.1975C17.8695 -12.1182 33.4782 -40.9663 57.221 -53.2332C80.9599 -65.2635 112.833 -60.7126 141.6 -54.32C170.487 -48.0437 196.268 -39.9258 207.703 -22.58C219.134 -4.99762 216.218 21.8127 220.264 49.8032Z"
					fill="#CFEBFB"
					fill-opacity="0.4"
				/>
			</svg>

			<svg
				className={styles.blobPink}
				width="143"
				height="93"
				viewBox="0 0 143 93"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M155.945 -80.6969C176.795 -62.2542 207.503 -56.592 221.888 -38.6346C236.434 -20.8391 234.656 9.57513 220.595 31.7387C206.534 53.9022 180.351 67.9769 152.228 79.3014C124.106 90.464 94.0436 98.7147 73.8407 88.0374C53.4761 77.36 42.809 47.5929 28.7477 21.0614C14.5248 -5.63197 -3.09214 -29.2515 0.463583 -49.1502C3.85768 -69.0489 28.4245 -85.2266 50.7285 -103.346C73.1942 -121.627 93.3971 -141.687 108.913 -136.025C124.429 -130.524 135.258 -99.1395 155.945 -80.6969Z"
					fill="#F7C2DB"
					fill-opacity="0.4"
				/>
			</svg>

			<img
				className={styles.logo}
				src="/logo.png"
				alt=""
			/>

			<Spinner color={error ? "red" : undefined} />

			{error && (
				<p className={styles.error}>
					{error.message}{" "}
					{retryTime != undefined ? `Retrying in ${retryTime} seconds...` : ""}
				</p>
			)}

			<Mascot />
		</div>
	);
}
