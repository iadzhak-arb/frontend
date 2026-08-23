import {getMetricaID} from "../model/getMetricaID.ts";
import {useEffect, useRef} from "react";


export function YandexMetrica({agree}: { agree: boolean | undefined }) {
    const metricaID = getMetricaID();
    const initialized = useRef(false);

    useEffect(() => {
        console.log('agree:', agree, 'metricaID:', metricaID, 'initialized:', initialized.current);
        if (agree !== true) return;
        if (!metricaID) return;
        if (initialized.current) return;
        initialized.current = true;

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `
            (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${metricaID}', 'ym');

            ym(${metricaID}, 'init', {
                defer: true,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
            });
        `
        document.head.appendChild(script);

        const noscript = document.createElement('noscript');
        noscript.innerHTML = `
            <div>
                <img src="https://mc.yandex.ru/watch/${metricaID}" style="position:absolute; left:-9999px;" alt="" />
            </div>
        `
        document.head.appendChild(noscript);

        return () => {
        };

    }, [metricaID, agree]);

    return null;
}