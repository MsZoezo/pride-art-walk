import { useEffect, useRef } from "react";
import styles from "./mascot.module.css";

export default function Mascot() {
    const leftPupilRef = useRef<SVGEllipseElement>(null);
    const rightPupilRef = useRef<SVGEllipseElement>(null);
    const mascotRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const mascot = mascotRef.current!;
    const leftPupil = leftPupilRef.current!;
    const rightPupil = rightPupilRef.current!;
    
    const leftEye = { cx: 14.5, cy: 26.5 };
    const rightEye = { cx: 32.5, cy: 18.5 };
    const maxOffset = 2;

    const controller = new AbortController();

    window.addEventListener('mousemove', evt => {
        const rect = mascot.getBoundingClientRect();
        const mouseX = evt.clientX - rect.left;
        const mouseY = evt.clientY - rect.top;
  
        const movePupil = (eye: typeof leftEye, pupil: SVGEllipseElement) => {
            const dx = mouseX - eye.cx;
            const dy = mouseY - eye.cy;

            const angle = Math.atan2(dy, dx);

            const offsetX = Math.cos(angle) * maxOffset;
            const offsetY = Math.sin(angle) * maxOffset;
  
            pupil.setAttribute("cx", `${eye.cx + offsetX}`);
            pupil.setAttribute("cy", `${eye.cy + offsetY}`);
        };
  
        movePupil(leftEye, leftPupil);
        movePupil(rightEye, rightPupil);
    }, { signal: controller.signal });

    return () => controller.abort();
  }, []);

    return(
        <svg ref={mascotRef} className={styles.mascot} width="57" height="53" viewBox="0 0 57 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="34.5" cy="34.5" r="34.5" fill="#FFDE00"/>
            <ellipse cx="14.5" cy="26.5" rx="6.5" ry="10.5" fill="white"/>
            <ellipse ref={leftPupilRef} cx="12.5" cy="23.5" rx="3.5" ry="5.5" fill="black"/>
            <ellipse cx="32.5" cy="18.5" rx="6.5" ry="10.5" fill="white"/>
            <ellipse ref={rightPupilRef} cx="30.5" cy="15.5" rx="3.5" ry="5.5" fill="black"/>
        </svg>
    );
}