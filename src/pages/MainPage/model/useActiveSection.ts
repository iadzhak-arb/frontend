import {useNavigate, useRouter} from "@tanstack/react-router";
import {useEffect, useState} from "react";

export function useActiveSection(sectionIds: string[]) {
    const router = useRouter();
    const [current, setCurrent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const activeEntry = entries.find((e) => e.isIntersecting);
                if (!activeEntry) return;

                const id = activeEntry.target.id;
                if (id && sectionIds.includes(id) && id != current) {
                    setCurrent(id);
                    navigate({to: '/', hash: id, hashScrollIntoView: false})
                }
            },
            {
                threshold: 0.8,
            }
        );
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [router, sectionIds])

    return {current: current}
}